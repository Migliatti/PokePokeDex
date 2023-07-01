import { useEffect, useState } from "react";
import api from "../services/api";

interface Pokemon {
  name: string;
  url: string;
}

function SimplePage() {
  const [pokemons, setPokemons] = useState<any[any]>([]);

  useEffect(() => {
    api
      .get("pokemon")
      .then((response) => setPokemons(response.data))
      .catch((err) => console.error(err));
  }, []);

  const arrayOfPokemons: Pokemon[] = pokemons.results;

  return (
    <div>
      <h2>List of pokemon</h2>

      <ul>
        {arrayOfPokemons?.map((pokemon: Pokemon, index: number) => {
          return (
            <li key={index}>
              <p>{pokemon.name}</p>
              <p>{pokemon.url}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SimplePage;
