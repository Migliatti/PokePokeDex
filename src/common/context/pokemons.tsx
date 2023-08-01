import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import api from "services/api";

interface Pokemon {
  url: string;
  name: string;
}

type UserContextProps = {
  children: ReactNode;
};

type UserContextType = {
  mainPokemons: Pokemon[];
  setMainPokemons: (data: any) => void;
  secondsPokemons: Pokemon[];
  setSecondsPokemons: (data: any) => void;
};

const initialValue = {
  mainPokemons: [],
  secondsPokemons: [],
  setMainPokemons: () => {},
  setSecondsPokemons: () => [],
};

export const PokemonContext = createContext<UserContextType>(initialValue);
PokemonContext.displayName = "Todos os pokemons";

export const PokemonProvider = ({ children }: UserContextProps) => {
  const [mainPokemons, setMainPokemons] = useState<Pokemon[]>(
    initialValue.mainPokemons
  );
  const [secondsPokemons, setSecondsPokemons] = useState<Pokemon[]>(
    initialValue.secondsPokemons
  );

  // Separa os pokemons que vai até o numero correto com os pokemons que ultrapassam o Id
  const filterPokemons = (data: Array<any>, count: number) => {
    const filteredPokemons: Pokemon[] = [];
    const unfilteredPokemons: Pokemon[] = [];
    for (let i = 0; i < count; i++) {
      const currentId = data[i].url.match(/\/(\d+)\//)[1];
      if (currentId < count) {
        filteredPokemons.push(data[i]);
      } else {
        unfilteredPokemons.push(data[i]);
      }
    }

    setMainPokemons(filteredPokemons);
    setSecondsPokemons(unfilteredPokemons);
  };

  useEffect(() => {
    api
      .get("pokemon?limit=100000&offset=0")
      .then((response) => {
        if (response && response.data) {
          filterPokemons(response.data.results, response.data.count);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <PokemonContext.Provider
      value={{
        mainPokemons,
        setMainPokemons,
        secondsPokemons,
        setSecondsPokemons,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemonContext = () => {
  const { mainPokemons, secondsPokemons } = useContext(PokemonContext);

  return {
    mainPokemons,
    secondsPokemons,
  };
};
