import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Layout } from "components/layouts";
import { PokemonSprites } from "components/pokemon/PokemonSprites";
import { pokeApi } from "api";
import { Pokemon, PokemonListResponse } from "interfaces";
import { useEffect, useState } from "react";
import { Button, Card, Grid, Text } from "@nextui-org/react";
import confetti from "canvas-confetti";

import { localFavorites } from "utils";

interface Props {
  pokemon: Pokemon;
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {
  const [isInFavorites, setIsInFavorites] = useState(false);

  // Se ejecuta una vez que el componente es creado, si se pone arriba dónde se declara mandaría error
  // next-dev.js?3515:20 Warning: Text content did not match. Server: "Guardar" Client: "Guardado"
  useEffect(() => {
    setIsInFavorites(localFavorites.existInFavorites(pokemon.id));
  }, []);

  const onToggleFavorite = () => {
    localFavorites.toggleFavorite(pokemon.id);
    setIsInFavorites(localFavorites.existInFavorites(pokemon.id));

    if (isInFavorites) return;

    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: { x: 1, y: 0 },
    });
  };

  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{ marginTop: "5px" }}>
        <Grid xs={12} sm={4}>
          <Card
            isHoverable={true}
            css={{ padding: "30px", margin: "0 12px 12px 0" }}
          >
            <Card.Body>
              <Card.Image
                src={
                  pokemon.sprites.other?.dream_world.front_default ||
                  "/no-image.png"
                }
                alt={pokemon.name}
                width="100"
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>
        {/* Resúmen */}
        <Grid xs={12} sm={8}>
          <Card css={{ paddingLeft: "25px", marginBottom: "12px" }}>
            <Card.Header
              css={{ display: "flex", justifyContent: "space-between" }}
            >
              <Text h1 transform="capitalize">
                {pokemon.name}
              </Text>
              {/* Botón favoritos */}
              <Button
                color="warning"
                flat={!isInFavorites}
                onClick={onToggleFavorite}
              >
                ★ {isInFavorites === false ? "Guardar" : "Guardado"} en
                favoritos
              </Button>
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites</Text>
              <PokemonSprites pokemon={pokemon} />
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>(`pokemon?limit=151`);
  const paths = data.results.map(({ name }) => ({ params: { name } }));
  return {
    paths,
    fallback: false, // Se agrega false para forzar a que no entre si no existe
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string };
  const { data } = await pokeApi.get<Pokemon>(`pokemon/${name}`);
  return {
    props: {
      pokemon: data,
    },
  };
};

export default PokemonByNamePage;
