import { useEffect, useState } from "react";
import api from "../services/api";
import Card from "../Components/Card/Index";
import { useNavigate, useParams } from "react-router-dom";

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

  return (
    <div>
      <h2>List of pokemon</h2>

      {loading ? (
        <p>Loading...</p> // Renderiza uma mensagem de carregamento enquanto loading for true
      ) : (
        <ul>
          {pokemons.map((pokemon: Pokemon, index: number) => {
            return <Card key={index} name={pokemon.name} url={pokemon.url} />;
          })}
        </ul>
      )}

      <div>
        <p>
          Page {currentPage} of {totalPages}
        </p>
        <button disabled={currentPage === 1} onClick={handlePreviousPage}>
          Previous Page
        </button>
        <button disabled={currentPage === totalPages} onClick={handleNextPage}>
          Next Page
        </button>
      </div>
    </div>
  );
}

export default SimplePage;
