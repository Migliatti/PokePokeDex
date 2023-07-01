import api from "../services/api";
import { useState, useEffect } from "react";

function PokemonPage() {
  const [pokemon, setPokemon] = useState<any>();
  const [evolutions, setEvolutions] = useState<any>();

  useEffect(() => {
    api
      .get("pokemon/92")
      .then((response) => setPokemon(response.data))
      .catch((err) => {
        console.error("ocorreu um erro ao requisitar a api" + err);
      });
    api
      .get("evolution-chain/")
      .then((response) => setEvolutions(response.data))
      .catch((err) =>
        console.error("ocorreu um erro ao requisitar a api" + err)
      );
  }, []);

  if (!pokemon) {
    return <p>Loading...</p>;
  }

  const capitalized = pokemon.name[0].toUpperCase() + pokemon.name.substr(1);

  console.log(evolutions);
  return (
    <div>
      <div>
        <h2>
          {capitalized} {`#${pokemon.order}`}
        </h2>
        <ul>
          {pokemon.types.map((tipo: any, index: number) => {
            return <li key={index}>{tipo.type.name}</li>;
          })}
        </ul>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      </div>

      <div>
        <h3>stats:</h3>
        <ul>
          {pokemon.stats.map((status: any, index: number) => {
            return (
              <li key={index}>
                {status.stat.name}: <span>{status.base_stat}</span>
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        <h3>
          evolves for:
          <img src="" alt="" />
        </h3>
      </div>
    </div>
  );
}

export default PokemonPage;
