import { GetStaticPaths, GetStaticProps, NextPage } from 'next'; 
import { Layout } from 'components/layouts'
import { pokeApi } from 'api';
import { Pokemon } from 'interfaces';
import { useState } from 'react';
import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';

import { localFavorites } from 'utils';

interface Props {
  pokemon: Pokemon
}

const PokemonPage: NextPage<Props> = ({ pokemon}) => {
  const [isInFavorites, setIsInFavorites] = 
    useState( localFavorites.existInFavorites(pokemon.id) )

  const onToggleFavorite = () => { 
    localFavorites.toggleFavorite(pokemon.id)
    setIsInFavorites(localFavorites.existInFavorites(pokemon.id))
  }

  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{ marginTop: '5px' }}>
        <Grid xs={12} sm={4}>
          <Card isHoverable={true} css={{padding:'30px', margin:'0 12px 12px 0' }}>
            <Card.Body>
              <Card.Image 
                src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
                alt={pokemon.name} 
                width="100"
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>
        {/* Resúmen */}
        <Grid xs={12} sm={8}>
          <Card css={{ paddingLeft: '25px', marginBottom: '12px' }}>
            <Card.Header css={{display:'flex', justifyContent:'space-between'}}>
              <Text h1 transform='capitalize' >
                { pokemon.name }
              </Text>
              <Button color="warning" flat={!isInFavorites} onClick={onToggleFavorite} >
                ★ {!isInFavorites ? 'Guardar' : 'Guardado'} en favoritos
              </Button>
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites</Text>
              <Container direction='row' display='flex' gap={0}>
                <Image src={pokemon.sprites.front_default} alt={pokemon.name} width={100} height={100} />
                <Image src={pokemon.sprites.back_default} alt={pokemon.name} width={100} height={100} />
                <Image src={pokemon.sprites.front_shiny} alt={pokemon.name} width={100} height={100} />
                <Image src={pokemon.sprites.back_shiny} alt={pokemon.name} width={100} height={100} />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  )
}
 
export const getStaticPaths: GetStaticPaths = async (ctx) => {  
  const pokemosn151 = [...Array(151)].map((value, index) => `${ index+1 }` )
  // Estos son los paths que se generarán en el buildtime
  // cantidad de paths es la cantidad de páginas que se generarán
  return {    
    paths: pokemosn151.map(id => ({ params: { id } })),
    fallback: false // Se agrega false para forzar a que no entre si no existe
    // fallback: "blocking"  deja mostrar la página aunque no exista en el path
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string }
  const {data} = await pokeApi.get<Pokemon>(`pokemon/${id}`)

  return {
    props: { 
        pokemon: data
    }
  }
}

export default PokemonPage