import { Layout } from "components/layouts"
import { NextPage } from "next"
 
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
export default HomePage