import { useEffect, useState } from "react";
import Card from "Components/Card";
import { useNavigate, useParams } from "react-router-dom";
import style from "./SimplePage.module.css";
import api from "services/api";

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
    setLoading(true);
    let isMounted = true;

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
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [currentPage]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      navigate("/not-found");
    }
  }, [currentPage, totalPages, navigate]);

  return (
    <div className={style.simple__page}>
      <h2 className={style.title}>List of pokemon</h2>

      {loading ? (
        <p className={style.loading}>Loading...</p>
      ) : (
        <ul className={style.list__pokemon}>
          {pokemons.map((pokemon: Pokemon, index: number) => {
            return <Card key={index} name={pokemon.name} />;
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
          onClick={() => navigate(`/page/${currentPage - 1}`)}
        >
          Previous Page
        </button>
        <button
          className={style.button__page}
          disabled={currentPage === totalPages}
          onClick={() => navigate(`/page/${currentPage + 1}`)}
        >
          Next Page
        </button>
      </div>
    </div>
  );
}

export default SimplePage;
