import { Card, Grid } from '@nextui-org/react';
import { Layout } from 'components/layouts' 
import { NoFavorites } from 'components/ui'
import { NextPage } from 'next' 
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import { localFavorites } from 'utils';

const FavoritiesPage: NextPage = () => {
  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([])
  const router = useRouter()
  useEffect(() => { 
    setFavoritePokemons( localFavorites.pokemons() )
  }, [])
 
  
  return (
    <Layout title={'Favoritos'} >
      {
        favoritePokemons.length === 0 
          ? <NoFavorites />
          : (
            <Grid.Container gap={2} direction='row' justify='flex-start'>
              {
                favoritePokemons.map( id => {
                  const onClick = () => router.push(`/pokemon/${ id }`)                
                  return <Grid xs={6} sm={3} md={2} xl={1} key={id} onClick={onClick}>
                      <Card isHoverable isPressable css={{ padding: 20}}>
                        <Card.Image 
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
                        />
                      </Card>
                    </Grid>
                  }
                )
              }
            </Grid.Container>
          )
      }
    </Layout>

  )
}

export default FavoritiesPage