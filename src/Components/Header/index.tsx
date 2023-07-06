import { Link } from "react-router-dom";
import style from "./Header.module.css";

function Header() {
  return (
    <header className={style.header}>
      <Link to={"/"} className={style.link}>
        <h1 className={style.name}>PokePokeDex</h1>
      </Link>
    </header>
  );
}

export default Header;
