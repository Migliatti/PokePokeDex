import { useEffect, useState } from "react";
import EvolutionCard from "./EvolutionCard";
import api from "../../../../services/api";
import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { SlGraph } from "react-icons/sl";
import style from "./Evolutions.module.css";

interface EvolutionChain {
  species: {
    name: string;
    url: string;
  };
  evolves_to: EvolutionChain[];
}

function getPokemonIdsFromJson(data: any): number[] {
  const pokemonIds: number[] = [];

  function extractIds(chain: EvolutionChain) {
    if (chain.species && chain.species.url) {
      const idMatch = chain.species.url.match(/\/(\d+)\/$/);
      if (idMatch && idMatch[1]) {
        pokemonIds.push(Number(idMatch[1]));
      }
    }
    if (chain.evolves_to && chain.evolves_to.length > 0) {
      chain.evolves_to.forEach((evolution) => extractIds(evolution));
    }
  }

  if (data && data.chain) {
    extractIds(data.chain);
  }

  return pokemonIds;
}

function Evolutions({ chain }: any) {
  const parts = chain.split("v2/");
  const url = parts[1];
  const [evolutionsPoke, setEvolutionsPoke] = useState<any>();

  useEffect(() => {
    api
      .get(url)
      .then((response) => setEvolutionsPoke(response.data))
      .catch((err) => console.error(err));
  }, [url]);

  if (!evolutionsPoke) {
    return <p>Loading...</p>;
  }

  const pokemonIds = getPokemonIdsFromJson(evolutionsPoke);

  if (pokemonIds.length <= 1) {
    return <div></div>;
  }

  return (
    <div className={style.evolution}>
      <div className={style.evolution__container}>
        <SlGraph className={style.evolution__icon} />
        <h3 className={style.evolution__title}>Evolution chain</h3>
      </div>
      <div className={style.list}>
        {pokemonIds.map((id: number, index: number) => {
          return (
            <React.Fragment key={index}>
              <EvolutionCard urlId={id} />
              <BsArrowRight className={style.list__pointer} />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default Evolutions;
