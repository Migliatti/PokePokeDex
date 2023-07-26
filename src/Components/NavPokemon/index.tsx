import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import classNames from "classnames";
import style from "./NavPokemon.module.css";
import { capitalizeName } from "pages/PokemonPage";
import api from "services/api";

function NavPokemon({ id }: any) {
  const navigate = useNavigate();
  const [nextPokemon, setNextPokemon] = useState<any>();
  const [prevPokemon, setPrevPokemon] = useState<any>();
  const next = Number(id) + 1;
  const prev = Number(id) - 1;

  useEffect(() => {
    const fetchNextPokemon = async () => {
      try {
        const response = await api.get("pokemon/" + next);
        setNextPokemon(response.data);
      } catch (error) {
        console.error("ocorreu um erro ao requisitar a api", error);
      }
    };

    const fetchPrevPokemon = async () => {
      if (prev >= 1) {
        try {
          const response = await api.get("pokemon/" + prev);
          setPrevPokemon(response.data);
        } catch (error) {
          console.error("ocorreu um erro ao requisitar a api", error);
        }
      } else {
        setPrevPokemon(true);
      }
    };

    fetchNextPokemon();
    fetchPrevPokemon();
  }, [next, prev]);

  const nextCapitalized = nextPokemon ? capitalizeName(nextPokemon.name) : "";
  const prevCapitalized = prevPokemon ? capitalizeName(prevPokemon.name) : "";

  const handleNextClick = () => {
    if (nextPokemon) {
      navigate(`/pokemon/${nextPokemon.id}`);
    }
  };

  const handlePrevClick = () => {
    if (prevPokemon) {
      navigate(`/pokemon/${prevPokemon.id}`);
    }
  };

  if (!nextPokemon || !prevPokemon) {
    return <p>Loading...</p>;
  }

  return (
    <div className={style.pokemon__nav}>
      {prevPokemon && Number(id) !== 1 ? (
        <div className={classNames(style.nav__button, style.nav__prev)}>
          <AiOutlineLeft />
          <p className={style.name} onClick={handlePrevClick}>
            {prevCapitalized}
          </p>
        </div>
      ) : (
        <div></div>
      )}
      {nextPokemon ? (
        <div className={classNames(style.nav__button, style.nav__next)}>
          <p className={style.name} onClick={handleNextClick}>
            {nextCapitalized}
          </p>
          <AiOutlineRight />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default NavPokemon;
