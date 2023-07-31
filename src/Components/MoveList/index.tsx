import { capitalizeName } from "pages/PokemonPage";
import MoveDetails from "./MoveDetails";
import style from "./MoveList.module.css";

function MoveList({ moves }: any) {
  return (
    <div className={style.moves}>
      <h3 className={style.moves__title}>Moves</h3>
      <div className={style.moves__total}>
        Total moves: <span>{moves.length}</span>
      </div>
      <ul className={style.moves__list}>
        {moves?.map((move: any, index: number) => {
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
    </div>
  );
}

export default MoveList;
