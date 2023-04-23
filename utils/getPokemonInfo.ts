import { Pokemon } from "@/interfaces/pokemon-full";
import pokemonApi from "../api/pokemonApi";

export const getPokemonInfo = async (nameOrId: string) => {
  try {
    const { data } = await pokemonApi.get<Pokemon>(`/pokemon/${nameOrId}`);
    return {
      id: data.id,
      name: data.name,
      sprites: data.sprites,
    };
  } catch (error) {
    return null;
  }
};
