import { useParams } from "react-router-dom";
import api from "../../services/api";
import { useState, useEffect } from "react";

function PokemonPage() {
  const [pokemon, setPokemon] = useState<any>();
  const [evolutions, setEvolutions] = useState<any>();
  const { id } = useParams();

  useEffect(() => {
    api
      .get("pokemon/" + id)
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
  }, [id]);

  if (!pokemon) {
    return <p>Loading...</p>;
  }

  const capitalized = pokemon.name[0].toUpperCase() + pokemon.name.substr(1);
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
    </div>
  );
}

export default PokemonPage;
