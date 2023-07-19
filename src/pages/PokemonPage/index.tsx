import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import { useState, useEffect } from "react";
import classNames from "classnames";
import style from "./PokemonPage.module.css";
import Abilities from "./Abilities";
import MoveList from "./MoveList";
import Games from "./Games";
import TypesPokemon from "../../Components/TypesPokemon";

export function capitalizeName(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function PokemonPage() {
  const [pokemon, setPokemon] = useState<any>();
  const [nextPokemon, setNextPokemon] = useState<any>();
  const [prevPokemon, setPrevPokemon] = useState<any>();
  const { idPage } = useParams();
  const navigate = useNavigate();
  const next = Number(idPage) + 1;
  const prev = Number(idPage) - 1;

  useEffect(() => {
    api
      .get("pokemon/" + idPage)
      .then((response) => setPokemon(response.data))
      .catch((err) => {
        console.error("ocorreu um erro ao requisitar a api" + err);
      });
    api
      .get("pokemon/" + next)
      .then((response) => setNextPokemon(response.data))
      .catch((err) => {
        console.error("ocorreu um erro ao requisitar a api" + err);
      });
    api
      .get("pokemon/" + prev)
      .then((response) => setPrevPokemon(response.data))
      .catch((err) => {
        console.error("ocorreu um erro ao requisitar a api" + err);
      });
  }, [idPage, next, prev]);

  if (!pokemon && !nextPokemon && !prevPokemon) {
    return <p>Loading...</p>;
  }

  const {
    name,
    id,
    types,
    sprites,
    height,
    weight,
    game_indices,
    stats,
    abilities,
  } = pokemon;

  const nameCapitalized = capitalizeName(name);
  const nextCapitalized = nextPokemon ? capitalizeName(nextPokemon.name) : "";
  const prevCapitalized = prevPokemon ? capitalizeName(prevPokemon.name) : "";

  const handleNextClick = () => {
    if (nextPokemon) {
      navigate(`/pokemon/${nextPokemon.id}`);
    }
  };

  const handlePrevClick = () => {
    if (prevPokemon) {
      navigate(`/pokemon/${prevPokemon.id}`);
    }
  };

  const statsList = stats.map((stat: any) => ({
    name: capitalizeName(stat.stat.name),
    base_stat: stat.base_stat,
  }));

  const moveList = pokemon.moves;

  return (
    <div className={style.pokemon__page}>
      <div className={style.pokemon__nav}>
        <div className={style.nav__prev}>
          {prevPokemon && Number(id) !== 1 ? (
            <p className={style.nav__button} onClick={handlePrevClick}>
              {prevCapitalized} {`#${prevPokemon.id}`}
            </p>
          ) : (
            <div></div>
          )}
        </div>
        <div className={style.nav__next}>
          {nextPokemon ? (
            <p className={style.nav__button} onClick={handleNextClick}>
              {nextCapitalized} {`#${nextPokemon.id}`}
            </p>
          ) : (
            <div></div>
          )}
        </div>
      </div>

      <div className={style.info}>
        <h2 className={classNames(style.nome)}>
          {nameCapitalized}
          <span
            className={classNames(style.id__pokemon)}
          >{`#${pokemon.id}`}</span>
        </h2>
        <TypesPokemon types={types} />
        <img
          className={style.pokemon__image}
          src={sprites.front_default}
          alt={name}
        />

        <div className={style.data}>
          <div className={style.metrics}>
            <h3>Metrics</h3>
            <p>Height: {height}</p>
            <p>Weight: {weight}</p>
          </div>

          <Abilities abilities={abilities} />
          <Games game_indices={game_indices} />
        </div>

        <div className={style.statistics}>
          <div className={style.stats}>
            <h3 className={style.stats__title}>Stats:</h3>
            <ul className={style.stats__list}>
              {statsList.map(
                (stat: { name: string; base_stat: number }, index: number) => (
                  <li className={style.stats__item} key={index}>
                    {stat.name}: <span>{stat.base_stat}</span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        <MoveList moves={moveList} />
      </div>
    </div>
  );
}

export default PokemonPage;
