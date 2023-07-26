import style from "./StatsPokemon.module.css";

function StatsPokemon({ stats }: any) {
  return (
    <div className={style.stats}>
      <h3 className={style.stats__title}>Stats</h3>
      <ul className={style.stats__list}>
        {stats.map((stat: any, index: number) => (
          <li className={style.stats__item} key={index}>
            {stat.name}:
            <span className={style.stats__base}>{stat.base_stat}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StatsPokemon;
