import { pokeApi } from "api"
import { Layout } from "components/layouts"
import { NextPage, GetStaticProps } from "next"
 
const HomePage: NextPage = (props) => {
  console.log('props')
  console.log(props)
  return (
    <Layout title={'Pokedex'} >
      <ul>
        <li>Pokemón</li>
        <li>Pokemón</li>
        <li>Pokemón</li>
        <li>Pokemón</li>
        <li>Pokemón</li>
      </ul>
    </Layout>
  )
}
 
// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
 
export const getStaticProps: GetStaticProps = async (ctx) => {
  // const { data } = await  // your fetch function here 
  //  https://pokeapi.co/api/v2/pokemon?limit=151
  
  const {data} = await pokeApi.get('pokemon?limit=151')
  console.log('✅✅✅ Holaaaa getStaticProps ✅✅✅',data)
  
  return {
    props: {
      pokemons: data?.results
    }
  }
}

export default HomePage