import { FC } from 'react'
import { useRouter } from 'next/router';
import { Card, Grid } from '@nextui-org/react';

interface Props {
    pokemonId: number
}

export const FavoriteCardPokemon: FC<Props> = ({ pokemonId }) => {
    const router = useRouter()
    const onClick = () => router.push(`/pokemon/${ pokemonId }`)  
    return (
        <Grid xs={6} sm={3} md={2} xl={1} key={pokemonId} onClick={onClick}>
            <Card isHoverable isPressable css={{ padding: 20}}>
            <Card.Image 
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`}
            />
            </Card>
        </Grid>
    )
}
