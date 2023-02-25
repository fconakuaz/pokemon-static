import { FC } from 'react'
import { Grid } from '@nextui-org/react'

import { FavoriteCardPokemon } from './FavoriteCardPokemon'

interface Props { list: number[] }

export const FavoritePokemons: FC<Props> = ({ list }) =>  
    <Grid.Container gap={2} direction='row' justify='flex-start'>
        {list.map( id => <FavoriteCardPokemon key={id} pokemonId={id} /> )}
    </Grid.Container>
    