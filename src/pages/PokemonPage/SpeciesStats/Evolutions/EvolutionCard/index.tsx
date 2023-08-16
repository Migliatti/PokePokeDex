import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { capitalizeName } from "../../..";
import api from "../../../../../services/api";
import style from "./EvolutionCard.module.css";
import { AiOutlineArrowRight } from "react-icons/ai";
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
      <div
        className={style.card__container}
        onClick={() => navigate(`/pokemon/${id}`)}
      >
        <div className={style.container__name}>
          <h3 className={style.name}>{capitalized}</h3>
          <AiOutlineArrowRight className={style.name__icon} />
        </div>
        <img
          className={style.container__image}
          src={sprites.front_default}
          alt={name}
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
