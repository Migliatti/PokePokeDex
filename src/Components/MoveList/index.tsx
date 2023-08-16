import { capitalizeName } from "pages/PokemonPage";
import MoveDetails from "./MoveDetails";
import style from "./MoveList.module.css";
import { useState } from "react";
import { BsArrowBarUp, BsArrowBarDown } from "react-icons/bs";

function MoveList({ moves }: any) {
  const [visible, setVisible] = useState<number>(5);

  const clickExpand = () => {
    if (visible === moves.length) {
      setVisible(5);
    } else {
      setVisible(moves.length);
    }
  };

  return (
    <div className={style.moves}>
      <div className={style.moves__container}>
        <h3 className={style.moves__title}>Moves</h3>
        <div className={style.moves__total}>
          Total moves: <span>{moves.length}</span>
        </div>
      </div>
      <ul className={style.moves__list}>
        {moves?.slice(0, visible).map((move: any, index: number) => {
          const name = capitalizeName(move.move.name);
          const details = move.version_group_details[0];

          return (
            <li key={index} className={style.moves__item}>
              <h4 className={style.item__name}>{name}</h4>
              <div className={style.borda_vertical}></div>
              <MoveDetails details={details} />
            </li>
          );
        })}
      </ul>
      <div onClick={clickExpand} className={style.seta__container}>
        {visible === moves.length ? (
          <BsArrowBarUp className={style.seta} />
        ) : (
          <BsArrowBarDown className={style.seta} />
        )}
      </div>
    </div>
  );
}

export default MoveList;
