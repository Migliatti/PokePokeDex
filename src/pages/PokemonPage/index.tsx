import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import { useState, useEffect } from "react";
import classNames from "classnames";
import style from "./PokemonPage.module.css";
import Abilities from "./Abilities";

function capitalizeName(name: string) {
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

  const { name, id, types, sprites, height, weight, game_indices, stats } =
    pokemon;

  const nameCapitalized = capitalizeName(pokemon.name);
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

  const typeList = types.map((currentType: any, index: number) => {
    const typeCapitalized = capitalizeName(currentType.type.name);
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
  });

  const statsList = stats.map((stat: any) => ({
    name: capitalizeName(stat.stat.name),
    base_stat: stat.base_stat,
  }));

  const movesList = pokemon.moves.map((move: any) =>
    capitalizeName(move.move.name)
  );

  console.log(movesList)

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
      {/* retirar dps */}
      <br />

      <div className={style.info}>
        <h2 className={classNames(style.nome)}>
          {nameCapitalized}
          <span
            className={classNames(style.id__pokemon)}
          >{`#${pokemon.id}`}</span>
        </h2>
        <ul className={style.types}>
          {/* Utilizando a variável typeList aqui */}
          {typeList.map((type: string, index: number) => (
            <li
              className={classNames(
                style.type,
                style[`type__${type}`] // Certifique-se que as classes existam em seu CSS
              )}
              key={index}
            >
              {type}
            </li>
          ))}
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

          <Abilities abilities={pokemon.abilities} />

          {/* retirar dps */}
          <br />

          <div className={style.games}>
            <h3>Games</h3>
            {pokemon.game_indices.map((game: any, index: number) => {
              const name =
                game.version.name[0].toUpperCase() +
                game.version.name.substr(1);
              return <div key={index}>{name}</div>;
            })}
          </div>

          {/* retirar dps */}
          <br />
        </div>
      </div>

      <div className={style.statistics}>
        <div className={style.stats}>
          <h3 className={style.stats__title}>Stats:</h3>
          <ul className={style.stats__list}>
            {/* Utilizando a variável statsList aqui */}
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
      <div className={style.moves}>
        <h3>Moves</h3>
        <ul>
          {/* Utilizando a variável movesList aqui */}
          {movesList.map((move: string, index: number) => (
            <li key={index}>{move}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PokemonPage;
