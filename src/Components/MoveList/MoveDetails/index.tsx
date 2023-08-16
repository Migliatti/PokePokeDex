import { capitalizeName } from "pages/PokemonPage";
import { Fragment, useEffect, useState } from "react";
import style from "./MoveDetails.module.css";

function MoveDetails({ details }: any) {
  const [phrase, setPhrase] = useState<any>("");
  const level = details.level_learned_at;
  const games = details.version_group.name
    .replace(/-\d+/g, "")
    .replace(/-/g, " ")
    .split(" ");

  useEffect(() => {
    const method = details.move_learn_method.name;

    if (method === "egg") {
      setPhrase(
        "Appears on a newly-hatched Pokémon, if the father had the same move."
      );
    } else if (method === "level-up") {
      if (level === 1) {
        setPhrase("The pokemon already comes with this ability.");
      } else {
        setPhrase(`Learned when a Pokemon reaches level ${level}.`);
      }
    } else if (method === "tutor") {
      setPhrase("Can be taught at any time by an NPC.");
    } else if (method === "machine") {
      setPhrase("Can be taught at any time by using a TM or HM.");
    } else if (method === "stadium-surfing-pikachu") {
      setPhrase(
        "Learned when a non-rental Pikachu helps beat Prime Cup Master Ball R-2. It must participate in every battle, and you must win with no continues."
      );
    } else if (method === "light-ball-egg") {
      setPhrase(
        "Appears on a Pichu whose mother was holding a Light Ball. The father cannot be Ditto."
      );
    } else if (method === "colosseum-purification") {
      setPhrase(
        "Appears on a Shadow Pokémon as it becomes increasingly purified."
      );
    } else if (method === "xd-shadow") {
      setPhrase("Appears on a Snatched Shadow Pokémon.");
    } else if (method === "xd-purification") {
      setPhrase(
        "Appears on a Shadow Pokémon as it becomes increasingly purified."
      );
    } else if (method === "form-change") {
      setPhrase(
        "Appears when Rotom or Cosplay Pikachu changes form. Disappears if the Pokémon becomes another form and this move can only be learned by form change."
      );
    } else {
      setPhrase(
        "Can be taught using the Zygarde Cube. Must find the corresponding Zygarde Core first in Sun/Moon. All moves are available immediately in Ultra Sun/Ultra Moon."
      );
    }
  }, [details.move_learn_method.name, level]);

  return (
    <div className={style.details}>
      <p className={style.details__phrase}>{phrase}</p>
      <div className={style.games}>
        <h5 className={style.games__phrase}>
          First Appearance in Game{games.length > 1 ? "s" : ""}:
        </h5>
        <ul className={style.games__list}>
          {games.map((game: string, index: number) => {
            const name = capitalizeName(game);
            return (
              <Fragment key={index}>
                <li className={style.games__item}>{name}</li>
              </Fragment>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default MoveDetails;
