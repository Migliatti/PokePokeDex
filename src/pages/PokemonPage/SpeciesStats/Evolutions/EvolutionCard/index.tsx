import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { capitalizeName } from "../../..";
import api from "../../../../../services/api";
import style from "./EvolutionCard.module.css";
import classNames from "classnames";

function EvolutionCard({ urlId }: any) {
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState<any>();

  useEffect(() => {
    api
      .get(`pokemon/${urlId}`)
      .then((response) => setPokemon(response.data))
      .catch((err) => console.error(err));
  }, [urlId]);

  if (!pokemon) {
    return <p>Loading...</p>;
  }

  const { name, id, types, sprites } = pokemon;

  const capitalized = capitalizeName(name);

  return (
    <div className={style.card}>
      <div onClick={() => navigate(`/pokemon/${id}`)} className={style.click}>
        <h3 className={style.card__name}>{capitalized}</h3>
        <img
          src={sprites.front_default}
          alt={name}
          className={style.card__img}
        />
      </div>
      <ul className={style.card__list}>
        {types.map((type: any, index: number) => {
          const typeName = capitalizeName(type.type.name);

          return (
            <li
              key={index}
              className={classNames(
                style.type,
                style[`type__${type.type.name}`]
              )}
            >
              {typeName}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default EvolutionCard;
