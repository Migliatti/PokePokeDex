import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import { useState, useEffect } from "react";
import classNames from "classnames";
import style from "./PokemonPage.module.css";

function PokemonPage() {
  const [pokemon, setPokemon] = useState<any>();
  const [nextPokemon, setNextPokemon] = useState<any>();
  const [prevPokemon, setPrevPokemon] = useState<any>();
  const [evolutions, setEvolutions] = useState<any>();
  const { id } = useParams();
  const navigate = useNavigate();
  const next = Number(id) + 1;
  const prev = Number(id) - 1;

  useEffect(() => {
    api
      .get("pokemon/" + id)
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
    api
      .get("evolution-chain/")
      .then((response) => setEvolutions(response.data))
      .catch((err) =>
        console.error("ocorreu um erro ao requisitar a api" + err)
      );
  }, [id, next, prev]);

  if (!pokemon && !nextPokemon && !prevPokemon) {
    return <p>Loading...</p>;
  }

  console.log(pokemon);

  const capitalized = pokemon.name[0].toUpperCase() + pokemon.name.substr(1);
  let nextCapitalized = "";
  if (nextPokemon && nextPokemon.name) {
    nextCapitalized =
      nextPokemon.name[0].toUpperCase() + nextPokemon.name.substr(1);
  }
  let prevCapitalized = "";
  if (prevPokemon && prevPokemon.name) {
    prevCapitalized =
      prevPokemon.name[0].toUpperCase() + prevPokemon.name.substr(1);
  }

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

  return (
    <div className={style.pokemon__page}>
      <div className={style.pokemon__nav}>
        <div className={style.nav__prev}>
          {prevPokemon && Number(id) !== 1 ? (
            <p className={style.nav__button} onClick={handlePrevClick}>
              {prevCapitalized}
            </p>
          ) : (
            <div></div>
          )}
        </div>
        <div className={style.nav__next}>
          {nextPokemon ? (
            <p className={style.nav__button} onClick={handleNextClick}>
              {nextCapitalized}
            </p>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      {/* retirar dps */}
      <br />

      <div className={style.info}>
        <h2 className={classNames(style.nome)}>
          {capitalized}
          <span
            className={classNames(style.id__pokemon)}
          >{`#${pokemon.id}`}</span>
        </h2>
        <ul className={style.types}>
          {pokemon.types.map((currentType: any, index: number) => {
            const typeCapitalized =
              currentType.type.name[0].toUpperCase() +
              currentType.type.name.substr(1);
            return (
              <li
                className={classNames(
                  style.type,
                  style[`type__${currentType.type.name}`]
                )}
                key={index}
              >
                {typeCapitalized}
              </li>
            );
          })}
        </ul>
        <img
          className={style.pokemon__image}
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
        />

        <div className={style.data}>
          <div className={style.metrics}>
            <h3>Metrics</h3>
            <p>Height: {pokemon.height}</p>
            <p>Weight: {pokemon.weight}</p>
          </div>
          {/* retirar dps */}
          <br />
          <div></div>
        </div>

        <div className={style.abilities}>
          <h3>Abilities</h3>
          {pokemon.abilities.map((ability: any) => {
            const name =
              ability.ability.name[0].toUpperCase() +
              ability.ability.name.substr(1);
            return <div>{name}</div>;
          })}
        </div>
        {/* retirar dps */}
        <br />
      </div>

      <div className={style.statistics}>
        <div className={style.abilities}></div>

        <div className={style.stats}>
          <h3 className={style.stats__title}>Stats:</h3>
          <ul className={style.stats__list}>
            {pokemon.stats.map((status: any, index: number) => {
              return (
                <li className={style.stats__item} key={index}>
                  {status.stat.name}: <span>{status.base_stat}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PokemonPage;
