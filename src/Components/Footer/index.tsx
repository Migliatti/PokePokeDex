import style from "./Footer.module.css";

function Footer() {
  return (
    <footer className={style.footer}>
      <a href="https://portifolio-parizi2-0.vercel.app/" className={style.link}>
        Developed by Gabriel Migliatti
      </a>
      <p className={style.p}> - 2023</p>
    </footer>
  );
}

export default Footer;
