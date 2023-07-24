import { useEffect, useState } from "react";
import api from "../../../services/api";
import { capitalizeName } from "..";
import Evolutions from "./Evolutions";

function SpeciesStats({ species, base_experience }: any) {
  const parts = species.split("v2/");
  const url = parts[1];
  const [atualPokemon, setAtualPokemon] = useState<any>();

  useEffect(() => {
    api
      .get(url)
      .then((response) => setAtualPokemon(response.data))
      .catch((err) => console.error(err));
  }, [url]);

  if (!atualPokemon) {
    return <p>Loading...</p>;
  }

  const {
    base_happiness,
    capture_rate,
    growth_rate,
    egg_groups,
    evolution_chain,
    is_legendary,
  } = atualPokemon;

  return (
    <div>
      <div>{is_legendary ? <div>Is Legendary Pokemon</div> : <div></div>}</div>
      <div>
        <h3>Accurate data</h3>
        <div>
          <h4>Catch Rate</h4>
          <p>{capture_rate}</p>
        </div>
        <div>
          <h4>Base happiness</h4>
          <p>{base_happiness}</p>
        </div>
        <div>
          <h4>Base Exp.</h4>
          <p>{base_experience}</p>
        </div>
        <div>
          <h4>Growth rate</h4>
          <p>{capitalizeName(growth_rate.name)}</p>
        </div>
        <div>
          <h4>Egg group</h4>
          <ul>
            {egg_groups.map((group: any, index: number) => {
              return <li key={index}>{capitalizeName(group.name)}</li>;
            })}
          </ul>
        </div>
      </div>
      <div>
        <Evolutions chain={evolution_chain.url} />
      </div>
    </div>
  );
}

export default SpeciesStats;
