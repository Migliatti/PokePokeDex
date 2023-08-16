import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import classNames from "classnames";
import Abilities from "../../Components/Abilities";
import TypesPokemon from "../../Components/TypesPokemon";
import StatsPokemon from "../../Components/StatsPokemon";
import SpeciesStats from "./SpeciesStats";
import Games from "Components/Games";
import Metrics from "Components/Metrics";
import MoveList from "Components/MoveList";
import NavPokemon from "Components/NavPokemon";
import style from "./PokemonPage.module.css";

export function capitalizeName(name: string) {
  if (typeof name !== "string" || name.length === 0) {
    return name; // Retorna o valor original se não for uma string válida
  }

  const cleanedName = name
    .replace(/[-0-9]+/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
  return cleanedName.charAt(0).toUpperCase() + cleanedName.slice(1);
}

function PokemonPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [pokemon, setPokemon] = useState<any>({});

  const { idPage } = useParams();

  useEffect(() => {
    api
      .get(`pokemon/${idPage}`)
      .then((response) => setPokemon(response.data))
      .catch((err) => console.error(err));
    setLoading(false);
  }, [idPage]);

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
    moves: moveList,
    species,
    base_experience,
  } = pokemon;

  const nameCapitalized = capitalizeName(name);

  const statsList = stats?.map((stat: any) => ({
    name: capitalizeName(stat.stat.name),
    base_stat: stat.base_stat,
  }));

  return (
    <section className={style.pokemon__page}>
      <NavPokemon id={idPage} />

      {loading ? (
        <div></div>
      ) : (
        <>
          <div className={style.info}>
            <div className={style.name__image}>
              <h2 className={classNames(style.nome)}>
                {nameCapitalized}
                <span
                  className={classNames(style.id__pokemon)}
                >{`#${id}`}</span>
              </h2>
              <div className={style.list__type}>
                <TypesPokemon types={types} />
              </div>
              <img
                className={style.pokemon__image}
                src={sprites?.front_default}
                alt={name}
              />
            </div>

            <div className={style.data}>
              {height && weight && <Metrics data={{ height, weight }} />}
              {abilities && <Abilities abilities={abilities} />}
              {statsList && <StatsPokemon stats={statsList} />}
            </div>
          </div>
          {species && (
            <SpeciesStats
              species={species.url}
              base_experience={base_experience}
            />
          )}
          <div className={style.game_data}>
            {moveList && <MoveList moves={moveList} />}

            {game_indices && game_indices.length > 0 ? (
              <Games game_indices={game_indices} />
            ) : (
              <div></div>
            )}
          </div>
        </>
      )}
    </section>
  );
}

export default PokemonPage;
