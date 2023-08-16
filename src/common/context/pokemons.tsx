import { searchSystem } from "common/functions/filters";
import { Pokemon } from "common/interface/Pokemon";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import api from "services/api";

type UserContextProps = {
  children: ReactNode;
};

type UserContextType = {
  mainPokemons: Pokemon[];
  setMainPokemons: (data: any) => void;
  secondsPokemons: Pokemon[];
  setSecondsPokemons: (data: any) => void;
  currentsPokemons: Pokemon[];
  setCurrentsPokemons: (data: any) => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
};

const initialValue = {
  mainPokemons: [],
  secondsPokemons: [],
  searchValue: "",
  currentsPokemons: [],
  setMainPokemons: () => {},
  setSecondsPokemons: () => [],
  setSearchValue: () => {},
  setCurrentsPokemons: () => {},
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
  const [searchValue, setSearchValue] = useState<string>(
    initialValue.searchValue
  );
  const [currentsPokemons, setCurrentsPokemons] = useState<Pokemon[]>(
    initialValue.currentsPokemons
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

  useEffect(() => {
    searchValue
      ? setCurrentsPokemons(searchSystem(mainPokemons, searchValue))
      : setCurrentsPokemons(mainPokemons);
  }, [mainPokemons, searchValue]);

  return (
    <PokemonContext.Provider
      value={{
        mainPokemons,
        setMainPokemons,
        secondsPokemons,
        setSecondsPokemons,
        searchValue,
        setSearchValue,
        currentsPokemons,
        setCurrentsPokemons,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemonContext = () => {
  const {
    mainPokemons,
    secondsPokemons,
    searchValue,
    setSearchValue,
    currentsPokemons,
  } = useContext(PokemonContext);

  return {
    mainPokemons,
    secondsPokemons,
    searchValue,
    setSearchValue,
    currentsPokemons,
  };
};
