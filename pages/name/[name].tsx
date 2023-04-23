import { Layout } from "@/components/layout";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";
import { FC, useState } from "react";
import { Pokemon } from "@/interfaces/pokemon-full";
import pokemonApi from "../../api/pokemonApi";
import {
  Grid,
  Card,
  Text,
  Button,
  Container,
  Image,
  Row,
} from "@nextui-org/react";
import localFavorites from "@/utils/localFavorites";
import { PokemonListResponse } from "../../interfaces/pokemon-list";
import { getPokemonInfo } from "@/utils/getPokemonInfo";

interface Props {
  //  id: string;
  //  name: string;
  pokemon: Pokemon;
}

const PokemonPageName: FC<Props> = ({ pokemon }) => {
  const [isInFavorites, setIsInFavorites] = useState(
    localFavorites.existInFavorites(pokemon.id)
  );

  const handleFavoritesPokemon = () => {
    localFavorites.toggleFavorite(pokemon.id);
    setIsInFavorites(!isInFavorites);
  };

  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{ marginTop: "5px" }}>
        <Grid xs={12} sm={4}>
          <Card isHoverable css={{ padding: "30px" }}>
            <Card.Body>
              <Card.Image
                src={
                  pokemon.sprites.other?.dream_world.front_default ||
                  "no-image.png"
                }
              />
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header
              css={{ display: "flex", justifyContent: "space-between" }}
            >
              <Text h1 transform="capitalize">
                {pokemon.name}
              </Text>
              <Button
                color="gradient"
                ghost={!isInFavorites}
                onClick={handleFavoritesPokemon}
              >
                {isInFavorites ? "En Favoritos" : "Guardar en Favoritos"}
              </Button>
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites</Text>
              <Container direction="row" display="flex" gap={0}>
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const { data } = await pokemonApi.get<PokemonListResponse>(
    "/pokemon?limit=151"
  );

  const pokemonNames: string[] = data.results.map((pokemon) => pokemon.name);

  return {
    paths: pokemonNames.map((name) => ({
      params: { name },
    })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string };
  const pokemon = await getPokemonInfo(name);
  if(!pokemon){
    return {
      redirect:{
        destination:'/',
        permanent: false
      }
    }
  }
  return {
    props: {
      pokemon,
    },
    revalidate: 10,
    //24 horas serian 86400
  };
};


export default PokemonPageName;
