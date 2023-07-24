import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import classNames from "classnames";
import Abilities from "./Abilities";
import MoveList from "./MoveList";
import Games from "./Games";
import TypesPokemon from "../../Components/TypesPokemon";
import StatsPokemon from "./StatsPokemon";
import Metrics from "./Metrics";
import NavPokemon from "./NavPokemon";
import style from "./PokemonPage.module.css";
import SpeciesStats from "./SpeciesStats";

export function capitalizeName(name: string) {
  if (typeof name !== "string" || name.length === 0) {
    return name; // Retorna o valor original se não for uma string válida
  }
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function PokemonPage() {
  const [pokemon, setPokemon] = useState<any>({});
  const { idPage } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("pokemon/" + idPage);
        setPokemon(response.data);
      } catch (error) {
        console.error("ocorreu um erro ao requisitar a api", error);
      }
    };

    fetchData();
  }, [idPage]);

  if (!pokemon) {
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

      <div className={style.info}>
        <div className={style.name__image}>
          <h2 className={classNames(style.nome)}>
            <span className={classNames(style.id__pokemon)}>{`#${id}`}</span>
            {nameCapitalized}
          </h2>
          <TypesPokemon types={types} />
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
        <SpeciesStats species={species.url} base_experience={base_experience} />
      )}

      {moveList && <MoveList moves={moveList} />}
      {game_indices && <Games game_indices={game_indices} />}
    </section>
  );
}

export default PokemonPage;
