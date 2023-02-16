import { Card, Grid, Row, Text } from "@nextui-org/react"
import { pokeApi } from "api"
import { Layout } from "components/layouts"
import { PokemonListResponse, SmallPokemon } from "interfaces"
import { NextPage, GetStaticProps } from "next"
 
interface Props {
  pokemons: SmallPokemon[]
}

const HomePage: NextPage<Props> = ({ pokemons }) => { 
  return (
    <Layout title={'Pokedex'} >
        <Grid.Container gap={2} justify='flex-start'>
          {pokemons?.map(p =>  
            <Grid xs={6} sm={3} xl={2} key={p.id}>
              <Card isPressable>
                <Card.Body css={{ p: 12, backgroundColor:'#131313' }}>
                  <Card.Image
                    src={p.img}
                    objectFit="cover"
                    height={140}
                    alt={p.name}
                  />
                </Card.Body>
                <Card.Footer css={{ justifyItems: "flex-start" }}>
                  <Row wrap="wrap" justify="space-between" align="center">
                    <Text transform="capitalize" b>{p.name}</Text>
                    <Text css={{ color: "$accents7", fontWeight: "$semibold", fontSize: "$sm" }}>
                      #{p.id}
                    </Text>
                  </Row>
                </Card.Footer>
              </Card>
            </Grid>
        )}
        </Grid.Container> 
    </Layout>
  )
}
 
// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance. 
export const getStaticProps: GetStaticProps = async (ctx) => {
  const {data} = await pokeApi.get<PokemonListResponse>('pokemon?limit=649')  
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