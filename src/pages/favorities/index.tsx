import { Layout } from 'components/layouts' 
import { FavoritePokemons } from 'components/pokemon';
import { NoFavorites } from 'components/ui'
import { NextPage } from 'next'  
import { useEffect, useState } from 'react'
import { localFavorites } from 'utils';

const FavoritiesPage: NextPage = () => {
  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([])
  
  useEffect(() => { 
    setFavoritePokemons( localFavorites.pokemons() )
  }, [])  

  return (
    <Layout title={'Favoritos'} >
      {
        favoritePokemons.length === 0 
          ? <NoFavorites />
          : <FavoritePokemons list={favoritePokemons}/>
      }
    </Layout>
  )
}

export default FavoritiesPage