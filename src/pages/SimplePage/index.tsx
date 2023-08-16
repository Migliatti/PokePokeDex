import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePokemonContext } from "common/context/pokemons";
import Card from "pages/SimplePage/Card";
import style from "./SimplePage.module.css";
import PageNav from "./PageNav";

interface Pokemon {
  name: string;
  url: string;
}

// Preciso arrumar: Novo estilo de paginação, Valor Total de páginas
function SimplePage() {
  const navigate = useNavigate();

  const { currentsPokemons } = usePokemonContext();
  const [actualPokemons, setActualPokemons] = useState<Pokemon[]>();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [limit, setLimit] = useState<string>(() => {
    const storedLimit = localStorage.getItem("limit");
    return storedLimit ? storedLimit : "20";
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);

  const { page } = useParams();

  // testa pra ver se tem algo a mais escrito na url como "/page/2" e caso n estiver nada vai para a página 1.
  useEffect(() => {
    setLoading(true);

    if (page && /^\d+$/.test(page)) {
      const parsedPage = Number(page);
      const totalPages = Math.ceil(currentsPokemons?.length / Number(limit));
      if (parsedPage > totalPages && totalPages) {
        navigate("/not-found");
      }
      setCurrentPage(Number(page));
    } else {
      setCurrentPage(1);
    }
    // Verificar se ja leu o numero da página
    setLoaded(true);
  }, [limit, currentsPokemons?.length, navigate, page]);

  // Guarda o valor de limit no navegador do cliente.
  useEffect(() => {
    localStorage.setItem("limit", limit);
  }, [limit]);

  // Joga os pokemons atuais na página
  useEffect(() => {
    if (currentsPokemons?.length > 0 && loaded) {
      const total = Math.ceil(currentsPokemons?.length / Number(limit));
      setTotalPages(total);
      if (totalPages > 0) {
        const offset = (currentPage - 1) * Number(limit);
        const max = offset + Number(limit);
        const pokemons: Pokemon[] = [];
        for (let i = offset; i < max; i++) {
          if (currentsPokemons[i]) {
            pokemons.push(currentsPokemons[i]);
          }
        }
        setActualPokemons(pokemons);
        setLoading(false);
      }
    }
  }, [currentPage, limit, loaded, currentsPokemons, totalPages]);

  return (
    <div className={style.simple_page}>
      <div className={style.simple_page__header}>
        <h2 className={style.title}>Pokemon list</h2>

        <div className={style.limit}>
          <p className={style.limit__text}>Total Pokemon per page:</p>
          <select
            value={limit}
            onChange={(event) => {
              setLimit(event.target.value);
            }}
            className={style.limit__input}
          >
            <option value="20">20</option>
            <option value="40">40</option>
            <option value="60">60</option>
            <option value="80">80</option>
            <option value="100">100</option>
            <option value="100000000">Max</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className={style.loading}>Loading...</div>
      ) : (
        <>
          {actualPokemons?.length ? (
            <ul className={style.list__pokemon}>
              {actualPokemons?.map((pokemon: Pokemon, index: number) => {
                return <Card key={index} name={pokemon.name} />;
              })}
            </ul>
          ) : (
            <div className={style.container__pokemon_not_found}>
              <p className={style.pokemon_not_found}>pokemon not found</p>
            </div>
          )}

          {totalPages > 1 ? (
            <PageNav currentPage={currentPage} totalPages={totalPages} />
          ) : (
            <div></div>
          )}
        </>
      )}
    </div>
  );
}

export default SimplePage;
