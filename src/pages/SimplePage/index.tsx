import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "services/api";
import Card from "Components/Card";
import style from "./SimplePage.module.css";

interface Pokemon {
  name: string;
  url: string;
}

// Preciso arrumar: Renderização duas vezes dos pokemons(um verificação e Loading ajudaria), Valor Total de páginas
function SimplePage() {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [limit, setLimit] = useState<string>(() => {
    const storedLimit = localStorage.getItem("limit");
    return storedLimit ? storedLimit : "20";
  });

  const [pokeData, setPokeData] = useState<any>();
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>();

  const [loading, setLoading] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);

  const { page } = useParams();

  // pega os pokemons que estão sendo renderizados no momento e verifica se o id deles são maiores que o número total de pokemons, no caso tem pokemons com id de número 10001, que não é pra ser renderizado.
  const filterPokemons = (pokemons: any, length: number, count: number) => {
    let filteredPokemons = [];

    for (let i = 0; i < length; i++) {
      const currentId = pokemons[i].url.match(/\/(\d+)\//)[1];
      if (currentId < count) {
        filteredPokemons.push(pokemons[i]);
      }
    }

    setFilteredPokemons(filteredPokemons);
  };

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

  // Fetch dos pokemons que é para ser renderizado, **Necessito colocar o numero limite de página perante as pokemons que passaram dna filtragem, no caso, o totalPages está reconhecendo os pokemons não filtrados como pokemons de id maior que a contagem total de pokemons existentes**.
  useEffect(() => {
    if (loaded) {
      const offset: number = (currentPage - 1) * Number(limit);
      api
        .get(`pokemon?limit=${limit}&offset=${offset}`)
        .then((response) => {
          setPokeData(response.data);
        })
        .catch((err) => console.error(err))
        .finally(() => {
          setLoading(false);
        });
    }
  }, [currentPage, limit, loaded]);

  // chamada para filtrar os pokemons atuais;
  useEffect(() => {
    if (pokeData) {
      filterPokemons(pokeData.results, pokeData.results.length, pokeData.count);
      const pages = Math.ceil(pokeData.count / Number(limit));
      setTotalPages(pages);
    }
  }, [limit, pokeData]);

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
          <option value="100000000">max</option>
        </select>
      </div>

      {loading ? (
        <div></div>
      ) : (
        <ul className={style.list__pokemon}>
          {filteredPokemons?.map((pokemon: Pokemon, index: number) => {
            return <Card key={index} name={pokemon.name} />;
          })}
        </ul>
      )}

      {loading ? (
        <div></div>
      ) : (
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
      )}
    </div>
  );
}

export default SimplePage;
