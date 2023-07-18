import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import classNames from "classnames";
import style from "./Card.module.css";

interface Props {
  name: string;
  url: string;
}

function Card({ url, name }: Props) {
  const navigate = useNavigate();
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

  const handleCardClick = () => {
    if (pokemon) {
      navigate(`/pokemon/${pokemon.id}`);
    }
  };

  if (!pokemon) {
    return <p>Loading...</p>;
  }

  return (
    <div onClick={handleCardClick} className={style.card}>
      <h3 className={style.name}>
        {capitalized} {`#${pokemon.order}`}
      </h3>
      <img
        className={style.img}
        src={pokemon.sprites.front_default}
        alt={name}
      />
      <ul className={style.list}>
        {pokemon.types.map((currentType: any, index: number) => {
          const typeCapitalized =
            currentType.type.name[0].toUpperCase() +
            currentType.type.name.substr(1);
          return (
            <li
              className={classNames(style.type, {
                [style[`type__${currentType.type.name}`]]: true,
              })}
              key={index}
            >
              {typeCapitalized}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Card;
