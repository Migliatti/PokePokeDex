import style from "./Footer.module.css";

function Footer() {
  return (
    <footer className={style.footer}>
      <a
        className={style.link__container}
        href="https://portifolio-parizi2-0.vercel.app/"
      >
        <p className={style.p}>Developed by Gabriel Migliatti - 2023</p>
      </a>
    </footer>
  );
}

export default Footer;
