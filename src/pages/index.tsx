import { Grid } from "@nextui-org/react"
import { pokeApi } from "api"
import { Layout } from "components/layouts"
import { PokemonCard } from "components/pokemon"
import { PokemonListResponse, SmallPokemon } from "interfaces"
import { NextPage, GetStaticProps } from "next"
 
interface Props {
  pokemons: SmallPokemon[]
}

const HomePage: NextPage<Props> = ({ pokemons }) => { 
  return (
    <Layout title={'Pokedex'} >
        <Grid.Container gap={2} justify='flex-start'>
          {pokemons?.map((p, i) =>  <PokemonCard key={i} data={p} />)}
        </Grid.Container> 
    </Layout>
  )
}

// Lo ejecutado en getStaticProps se ejecuta sólo y únicamente cuando se corre el build
// Para el caso de pruebas con yarn dev se realiza cada que se refresca la pantalla del navegador
export const getStaticProps: GetStaticProps = async (ctx) => {
  const {data} = await pokeApi.get<PokemonListResponse>('pokemon?limit=151')  
  const pokemons: SmallPokemon[] = data?.results?.map(pokemon => {
    const idPokemon = pokemon?.url.split('/')[6] || 0 
    return {
      ...pokemon,
      id:   Number(idPokemon),
      img:  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${idPokemon}.svg`
    }
  })  
  return {
    props: { pokemons }
  }
}

export default HomePage