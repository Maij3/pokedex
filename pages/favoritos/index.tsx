import { Layout } from "@/components/layout";
import { FavoritePokemons } from "@/components/pokemon/FavoritePokemons";
import { NoFavorites } from "@/components/ui";
import localFavorites from "@/utils/localFavorites";
import { Container, Text, Image, Grid, Card } from "@nextui-org/react";
import { useEffect, useState } from "react";

const FavoritesPage = () => {
  const [favoritePokemons, setfavoritePokemons] = useState<number[]>([]);

  useEffect(() => {
    setfavoritePokemons(localFavorites.pokemon());
  }, []);

  return (
    <Layout title="Pokemon Favoritos">
      {favoritePokemons.length === 0 ? (
        <NoFavorites />
      ) : (
        <FavoritePokemons pokemons={favoritePokemons} />
      )}
    </Layout>
  );
};

export default FavoritesPage;
