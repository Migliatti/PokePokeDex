import { capitalizeName } from "pages/PokemonPage";
import style from "./Games.module.css";
import { useState } from "react";
import { BsArrowBarDown, BsArrowBarUp } from "react-icons/bs";

function Games({ game_indices }: any) {
  const [visible, setVisible] = useState<number>(5);

  const clickExpand = () => {
    if (visible === game_indices.length) {
      setVisible(5);
    } else {
      setVisible(game_indices.length);
    }
  };

  return (
    <div className={style.games}>
      <h3 className={style.games__title}>Games</h3>
      <ul className={style.games__list}>
        {game_indices.slice(0, visible).map((game: any, index: number) => {
          const name = capitalizeName(game.version.name);
          return (
            <li key={index} className={style.games__item}>
              <p className={style.item__name}>{name}</p>
              <p className={style.item__index}>
                {game.game_index}
                <span className={style.index__advert}>(index in game)</span>
              </p>
            </li>
          );
        })}
      </ul>
      <div onClick={clickExpand} className={style.seta__container}>
        {visible === game_indices.length ? (
          <BsArrowBarUp className={style.seta} />
        ) : (
          <BsArrowBarDown className={style.seta} />
        )}
      </div>
    </div>
  );
}

export default Games;
