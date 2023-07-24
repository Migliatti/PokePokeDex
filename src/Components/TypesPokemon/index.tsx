import classNames from "classnames";
import style from "./TypesPokemon.module.css";
import { capitalizeName } from "../../pages/PokemonPage";

function TypesPokemon({ types }: any) {
  if (!types) {
    return null; // ou algum outro valor ou mensagem de fallback
  }
  return (
    <ul className={style.types}>
      {types.map((type: any, index: number) => {
        const typeName = capitalizeName(type.type.name);
        return (
          <li
            className={classNames(style.type, style[`type__${type.type.name}`])}
            key={index}
          >
            {typeName}
          </li>
        );
      })}
    </ul>
  );
}

export default TypesPokemon;
