import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router'
import { Layout } from 'components/layouts'


interface Props {
  id: string
  name: string
}

const PokemonPage: NextPage<Props> = ({ id, name }) => {

  const router = useRouter()  
  console.log('🟢🟢🟢 router 🟢🟢🟢')
  console.log(router.query?.id)

  return (
    <Layout title='Algún Pokemon'>
        <h1>{id} - {name}</h1>
    </Layout>
  )
}
 
export const getStaticPaths: GetStaticPaths = async (ctx) => {
  
  return {
    // Estos son los paths que se generarán en el buildtime
    // cantidad de paths es la cantidad de páginas que se generarán
    paths: [
      { params: { id: '1' } },
      { params: { id: '2' } },
      { params: { id: '3' } }
    ],
    fallback: false // Se agrega false para forzar a que no entre si no existe
    // fallback: "blocking"  deja mostrar la página aunque no exista en el path
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  //   const {data} = await pokeApi.get<PokemonListResponse>('pokemon?limit=151')  
  //   const pokemons: SmallPokemon[] = data?.results?.map(pokemon => {
  //     const idPokemon = pokemon?.url.split('/')[6] || 0 
  //     return {
  //       ...pokemon,
  //       id:   Number(idPokemon),
  //       img:  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${idPokemon}.svg`
  //     }
  //   })  
    return {
      props: { 
          id: 1, 
          name: 'Bulbasaur' 
      }
    }
  }

export default PokemonPage