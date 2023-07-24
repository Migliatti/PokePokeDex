import { capitalizeName } from "..";
import style from "./Abilities.module.css";

function Abilities({ abilities }: any) {
  return (
    <div className={style.abilities}>
      {abilities && abilities.length > 1 ? (
        <h3 className={style.abilities__title}>Abilities</h3>
      ) : (
        <h3 className={style.abilities__title}>Ability</h3>
      )}
      <ul className={style.list}>
        {abilities &&
          abilities.map((ability: any, index: number) => {
            if (!ability || !ability.ability || !ability.ability.name) {
              return null;
            }
            const name = capitalizeName(ability.ability.name);
            return (
              <li key={index} className={style.list__item}>
                <p>{name}</p>
                {ability.is_hidden ? (
                  <p className={style.is_hidden}>(hidden ability)</p>
                ) : null}
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default Abilities;
