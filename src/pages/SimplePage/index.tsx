import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "Components/Card";
import style from "./SimplePage.module.css";
import { usePokemonContext } from "common/context/pokemons";

interface Pokemon {
  name: string;
  url: string;
}

// Preciso arrumar: Novo estilo de paginação, Valor Total de páginas
function SimplePage() {
  const navigate = useNavigate();

  const { mainPokemons } = usePokemonContext();
  const [currentsPokemons, setCurrentsPokemons] = useState<Pokemon[]>();

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
      setCurrentPage(Number(page));
    } else {
      setCurrentPage(1);
    }
    // Verificar se ja leu o numero da página
    setLoaded(true);
  }, [page]);

  // Guarda o valor de limit no navegador do cliente.
  useEffect(() => {
    localStorage.setItem("limit", limit);
  }, [limit]);

  // Joga os pokemons atuais na página
  useEffect(() => {
    if (mainPokemons.length > 0 && loaded) {
      const total = Math.ceil(mainPokemons.length / Number(limit));
      setTotalPages(total);
      if (totalPages > 0) {
        const offset = (currentPage - 1) * Number(limit);
        const max = offset + Number(limit);
        const pokemons: Pokemon[] = [];
        for (let i = offset; i < max; i++) {
          if (mainPokemons[i]) {
            pokemons.push(mainPokemons[i]);
          }
        }
        setCurrentsPokemons(pokemons);
        setLoading(false);
      }
    }
  }, [currentPage, limit, loaded, mainPokemons, totalPages]);

  return (
    <div className={style.simple__page}>
      <h2 className={style.title}>List of pokemon</h2>

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

      {loading ? (
        <div></div>
      ) : (
        <>
          <ul className={style.list__pokemon}>
            {currentsPokemons?.map((pokemon: Pokemon, index: number) => {
              return <Card key={index} name={pokemon.name} />;
            })}
          </ul>

          <div className={style.page__nav}>
            <p className={style.current__page}>
              Page {currentPage} of {totalPages}
            </p>
            <button
              className={style.button__page}
              disabled={currentPage === 1}
              onClick={() => {
                navigate(`/page/${currentPage - 1}`);
              }}
            >
              Previous Page
            </button>
            <button
              className={style.button__page}
              disabled={currentPage === totalPages}
              onClick={() => {
                navigate(`/page/${currentPage + 1}`);
              }}
            >
              Next Page
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default SimplePage;
