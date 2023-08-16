import { Pokemon } from "common/interface/Pokemon";

export const searchSystem = (data: Pokemon[], query: string) => {
  return data?.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );
};
