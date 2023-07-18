import { useEffect, useState } from "react";
import api from "../../services/api";
import Card from "../../Components/Card";
import { useNavigate, useParams } from "react-router-dom";
import style from "./SimplePage.module.css";

interface Pokemon {
  name: string;
  url: string;
}

function SimplePage() {
  const navigate = useNavigate();
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const { page } = useParams();

  useEffect(() => {
    if (page && /^\d+$/.test(page)) {
      setCurrentPage(Number(page));
    } else {
      setCurrentPage(1);
    }
  }, [page]);

  useEffect(() => {
    setLoading(true); // Define loading como true antes da chamada à API
    let isMounted = true; // Flag para verificar se o componente está montado

    const offset: number = (currentPage - 1) * 20;
    api
      .get(`pokemon?limit=20&offset=${offset}`)
      .then((response) => {
        if (isMounted) {
          setPokemons(response.data.results);
          const total: number = Math.ceil(response.data.count / 20);
          setTotalPages(total);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => {
        if (isMounted) {
          setLoading(false); // Define loading como false após a chamada à API ser concluída
        }
      });

    return () => {
      isMounted = false; // Define isMounted como false quando o componente é desmontado
    };
  }, [currentPage]);

  const handlePreviousPage = () => {
    const nextPage = currentPage - 1;
    navigate(`/page/${nextPage}`);
    setCurrentPage(nextPage);
  };

  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    navigate(`/page/${nextPage}`);
    setCurrentPage(nextPage);
  };

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      navigate("/not-found");
    }
  }, [currentPage, totalPages, navigate]);

  return (
    <div className={style.simple__page}>
      <h2 className={style.title}>List of pokemon</h2>

      {loading ? (
        <p className={style.loading}>Loading...</p> // Renderiza uma mensagem de carregamento enquanto loading for true
      ) : (
        <ul className={style.list__pokemon}>
          {pokemons.map((pokemon: Pokemon, index: number) => {
            return <Card key={index} name={pokemon.name} url={pokemon.url} />;
          })}
        </ul>
      )}

      <div className={style.page__nav}>
        <p className={style.current__page}>
          Page {currentPage} of {totalPages}
        </p>
        <button
          className={style.button__page}
          disabled={currentPage === 1}
          onClick={handlePreviousPage}
        >
          Previous Page
        </button>
        <button
          className={style.button__page}
          disabled={currentPage === totalPages}
          onClick={handleNextPage}
        >
          Next Page
        </button>
      </div>
    </div>
  );
}

export default SimplePage;
