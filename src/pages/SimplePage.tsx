import { useEffect, useState } from "react";
import api from "../services/api";
import Card from "../Components/Card/Index";

interface Pokemon {
  name: string;
  url: string;
}

function SimplePage() {
  const [pokemons, setPokemons] = useState<any[any]>([]);

  useEffect(() => {
    api
      .get("pokemon?limit=20&offset=0")
      .then((response) => setPokemons(response.data))
      .catch((err) => console.error(err));
  }, []);

  const arrayOfPokemons: Pokemon[] = pokemons.results;

  return (
    <div>
      <h2>List of pokemon</h2>

      <ul>
        {arrayOfPokemons?.map((pokemon: Pokemon, index: number) => {
          return <Card key={index} name={pokemon.name} url={pokemon.url} />;
        })}
      </ul>
    </div>
  );
}

export default SimplePage;
