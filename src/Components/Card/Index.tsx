import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import style from "./Card.module.css";
import TypesPokemon from "../TypesPokemon";
import { capitalizeName } from "../../pages/PokemonPage";

interface Props {
  name: string;
}

function Card({ name }: Props) {
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState<any>();

  useEffect(() => {
    api
      .get(`pokemon/${name}`)
      .then((response) => setPokemon(response.data))
      .catch((err) => console.error(err));
  }, [name]);

  const capitalized = capitalizeName(name);

  const handleCardClick = () => {
    if (pokemon) {
      navigate(`/pokemon/${pokemon.id}`);
    }
  };

  if (!pokemon) {
    return <p>Loading...</p>;
  }

  const { id, types } = pokemon;

  return (
    <div onClick={handleCardClick} className={style.card}>
      <h3 className={style.name}>
        {capitalized} {`#${id}`}
      </h3>
      <img
        className={style.img}
        src={pokemon.sprites.front_default}
        alt={name}
      />
      <div className={style.list}>
        <TypesPokemon types={types} />
      </div>
    </div>
  );
}

export default Card;
