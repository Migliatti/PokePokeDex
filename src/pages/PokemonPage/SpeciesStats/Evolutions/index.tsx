import { useEffect, useState } from "react";
import EvolutionCard from "./EvolutionCard";
import api from "../../../../services/api";
import style from "./Evolutions.module.css";
import React from "react";
import { AiOutlineDoubleRight } from "react-icons/ai";

interface EvolutionChain {
  species: {
    name: string;
    url: string;
  };
  evolves_to: EvolutionChain[];
}

function getPokemonNamesFromJson(data: any): string[] {
  const pokemonNames: string[] = [];

  function extractNames(chain: EvolutionChain) {
    if (chain.species && chain.species.name) {
      pokemonNames.push(chain.species.name);
    }
    if (chain.evolves_to && chain.evolves_to.length > 0) {
      chain.evolves_to.forEach((evolution) => extractNames(evolution));
    }
  }

  if (data && data.chain) {
    extractNames(data.chain);
  }

  return pokemonNames;
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

  const pokemonNames = getPokemonNamesFromJson(evolutionsPoke);

  return (
    <div className={style.evolution}>
      <h3 className={style.evolution__title}>Evolution chain</h3>
      <div className={style.list}>
        {pokemonNames.map((name: string, index: number) => {
          return (
            <React.Fragment key={index}>
              <EvolutionCard name={name} />
              <AiOutlineDoubleRight className={style.list__pointer} />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default Evolutions;
