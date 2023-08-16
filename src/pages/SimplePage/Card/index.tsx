import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { capitalizeName } from "pages/PokemonPage";
import api from "../../../services/api";
import TypesPokemon from "Components/TypesPokemon";
import style from "./Card.module.css";
import { AiOutlineArrowRight } from "react-icons/ai";
import { usePokemonContext } from "common/context/pokemons";

interface Props {
  name: string;
}

function Card({ name }: Props) {
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState<any>();
  const { setSearchValue } = usePokemonContext();

  useEffect(() => {
    api
      .get(`pokemon/${name}`)
      .then((response) => setPokemon(response.data))
      .catch((err) => console.error(err));
  }, [name]);

  const capitalized = capitalizeName(name);

  if (!pokemon) {
    return <p></p>;
  }

  const { id, types } = pokemon;

  return (
    <div className={style.card}>
      <img
        onClick={() => {
          navigate(`/pokemon/${id}`);
          setSearchValue("");
        }}
        className={style.img}
        src={pokemon.sprites.front_default}
        alt={name}
      />
      <div className={style.info}>
        <div
          className={style.info__click}
          onClick={() => {
            navigate(`/pokemon/${id}`);
            setSearchValue("");
          }}
        >
          <h3 className={style.name}>
            {capitalized} <span className={style.id}>{`#${id}`}</span>{" "}
          </h3>
          <AiOutlineArrowRight className={style.seta} />
        </div>
        <div className={style.list}>
          <TypesPokemon types={types} />
        </div>
      </div>
    </div>
  );
}

export default Card;
