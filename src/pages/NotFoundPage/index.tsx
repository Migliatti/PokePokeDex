import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { usePokemonContext } from "common/context/pokemons";
import style from "./NotFoundPage.module.css";

function NotFoundPage() {
  const { setSearchValue } = usePokemonContext();

  return (
    <div className={style.not_found}>
      <Link
        to="/"
        onClick={() => setSearchValue("")}
        className={style.return_button}
      >
        <AiOutlineArrowLeft className={style.return_button__icon} />
        <p className={style.return_button__text}>Return to initial page</p>
      </Link>
      <div className={style.container__message}>
        <h2 className={style.message}>
          <span className={style.message__error}>404.</span> Page Not Found
        </h2>
        <p className={style.phrase}>Could not find the requested page</p>
      </div>
    </div>
  );
}

export default NotFoundPage;
