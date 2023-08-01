import { capitalizeName } from "pages/PokemonPage";
import style from "./Games.module.css";

function Games({ game_indices }: any) {
  return (
    <div className={style.games}>
      <h3 className={style.games__title}>Games</h3>
      <ul className={style.games__list}>
        {game_indices.map((game: any, index: number) => {
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
    </div>
  );
}

export default Games;
