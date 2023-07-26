import style from "./Metrics.module.css";

function Metrics({ data }: any) {
  const { height, weight } = data;

  function adicionarPonto(num: number): string {
    const numStr = num.toString();
    const tamanho = numStr.length;

    if (tamanho === 1) {
      return `0.${numStr}`;
    } else {
      const parteInteira = numStr.slice(0, tamanho - 1);
      const parteDecial = numStr.slice(tamanho - 1);
      return `${parteInteira}.${parteDecial}`;
    }
  }

  return (
    <div className={style.metrics}>
      <h3 className={style.title}>Metrics</h3>
      <ul className={style.data__list}>
        <li className={style.list__item}>
          <h4 className={style.item__name}>Height:</h4>
          <p className={style.item__data}>{adicionarPonto(height)}m</p>
        </li>
        <li className={style.list__item}>
          <h4 className={style.item__name}>Weight:</h4>
          <p className={style.item__data}>{adicionarPonto(weight)}kg</p>
        </li>
      </ul>
    </div>
  );
}

export default Metrics;
