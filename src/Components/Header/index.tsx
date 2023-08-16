import { Link } from "react-router-dom";
import style from "./Header.module.css";
import { BsSearch } from "react-icons/bs";
import { usePokemonContext } from "common/context/pokemons";

function Header() {
  const { searchValue, setSearchValue } = usePokemonContext();

  return (
    <header className={style.header}>
      <div className={style.nav}>
        <Link
          to={"/"}
          className={style.link}
          onClick={() => setSearchValue("")}
        >
          PokePokeDex
        </Link>

        <form className={style.container__search}>
          <input
            type="search"
            className={style.search__input}
            placeholder="pokemon name"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
          />
          <BsSearch className={style.search__icon} />
        </form>
      </div>
    </header>
  );
}

export default Header;
