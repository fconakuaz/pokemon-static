import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Layout } from "components/layouts";
import { PokemonSprites } from "components/pokemon/PokemonSprites";
import { Pokemon } from "interfaces";
import { useEffect, useState } from "react";
import { Button, Card, Grid, Text } from "@nextui-org/react";
import confetti from "canvas-confetti";

import { getPokemonInfo, localFavorites } from "utils";

interface Props {
  pokemon: Pokemon;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
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
              <Text h3 transform="capitalize">
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

// Los paths le van a decir a Next en Build time cuales serán todos los paths, siempre necesita al getStaticProps
export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const pokemosn151 = [...Array(151)].map((value, index) => `${index + 1}`);
  // Estos son los paths que se generarán en el buildtime
  // cantidad de paths es la cantidad de páginas que se generarán
  return {
    paths: pokemosn151.map((id) => ({ params: { id } })),
    // fallback: false, // Se agrega false para forzar a que no entre si no existe
    fallback: "blocking", // Se brinca al getStaticProps incluso si no se ha generado estáticamente
    // fallback: "blocking"  deja mostrar la página aunque no exista en el path
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };
  const pokemon = await getPokemonInfo(id);

  if (!pokemon) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      // No se agrega Try / Catch ya que se ejecuta en build time
      // lo cual hace que se detenga el proceso automáticamente
      pokemon,
    },
    revalidate: 86400, // Se regenera cada 24 hrs (se mide en segundos) cáculo:  60 * 60 * 24 , agregar número entero no calcular
  };
};

export default PokemonPage;
