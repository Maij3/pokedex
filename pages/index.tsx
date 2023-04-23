import { GetStaticProps, NextPage } from "next";
import { Layout } from "../components/layout/Layout";
import pokemonApi from "../api/pokemonApi";
import { PokemonListResponse, SmallPokemon } from "../interfaces/pokemon-list";
import { Grid, Card, Text , Row } from "@nextui-org/react";
import { PokemonCard } from "@/components/pokemon";

interface Props {
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
  return (
    <Layout title="Listado Pokemon">
      <Grid.Container>
        {pokemons.map((pokemon , index) => (
          <PokemonCard key={index} pokemon={pokemon}  />
        ))}
      </Grid.Container>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokemonApi<PokemonListResponse>("/pokemon?limit=151");

  //Devuelve un Arreglo con los parametros image y id
  const pokemons: SmallPokemon[] = data.results.map((pokemon, key) => ({
    ...pokemon,
    id: key + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
      key + 1
    }.svg`,
  }));
  return {
    props: {
      pokemons,
    },
  };
};

export default HomePage;
