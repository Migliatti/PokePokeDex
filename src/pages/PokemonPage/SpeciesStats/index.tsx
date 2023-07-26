import { useEffect, useState } from "react";
import api from "../../../services/api";
import { capitalizeName } from "..";
import Evolutions from "./Evolutions";
import style from "./SpeciesStats.module.css";
import classNames from "classnames";

function SpeciesStats({ species, base_experience }: any) {
  const parts = species.split("v2/");
  const url = parts[1];
  const [atualPokemon, setAtualPokemon] = useState<any>();

  useEffect(() => {
    api
      .get(url)
      .then((response) => setAtualPokemon(response.data))
      .catch((err) => console.error(err));
  }, [url]);

  if (!atualPokemon) {
    return <p>Loading...</p>;
  }

  const {
    base_happiness,
    capture_rate,
    growth_rate,
    egg_groups,
    evolution_chain,
  } = atualPokemon;

  return (
    <div className={style.species}>
      <div className={style.accurate}>
        <div className={classNames(style.base, style.accurate__div)}>
          <h3 className={style.accurate__title}>Basic features</h3>
          <ul className={style.accurate__list}>
            <li className={style.accurate__item}>
              <h4 className={style.item__name}>Catch Rate:</h4>
              <p className={style.item__data}>{capture_rate}</p>
            </li>
            <li className={style.accurate__item}>
              <h4 className={style.item__name}>Base happiness:</h4>
              <p className={style.item__data}>{base_happiness}</p>
            </li>
            <li className={style.accurate__item}>
              <h4 className={style.item__name}>Base Exp.:</h4>
              <p className={style.item__data}>{base_experience}</p>
            </li>
          </ul>
        </div>

        <div className={classNames(style.growth_info, style.accurate__div)}>
          <h3 className={style.accurate__title}>Growth information</h3>
          <ul className={style.accurate__list}>
            <li className={style.accurate__item}>
              <h4 className={style.item__name}>Growth rate:</h4>
              <p className={style.item__data}>
                {capitalizeName(growth_rate.name)}
              </p>
            </li>
            <li className={style.accurate__item}>
              <h4 className={style.item__name}>Egg group:</h4>
              <ul className={style.egg__list}>
                {egg_groups.map((group: any, index: number) => {
                  return (
                    <li key={index} className={style.egg__item}>
                      {capitalizeName(group.name)}
                    </li>
                  );
                })}
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <Evolutions chain={evolution_chain.url} />
    </div>
  );
}

export default SpeciesStats;
