import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";

interface Props {
  name: string;
  url: string;
}

function Card({ url, name }: Props) {
  const [pokemon, setPokemon] = useState<any>();
  const cut = url.split("/");
  cut.splice(0, 5);
  const tg = cut.join("/");

  useEffect(() => {
    api
      .get(`${tg}`)
      .then((response) => setPokemon(response.data))
      .catch((err) => console.error(err));
  }, [tg]);

  const capitalized = name[0].toUpperCase() + name.substr(1);

  if (!pokemon) {
    return <p>Loading...</p>;
  }

  return (
    <Link to={`pokemon/${pokemon.id}`}>
      <h3>{capitalized}</h3>
      <img src={pokemon.sprites.front_default} alt={name} />
    </Link>
  );
}

export default Card;
