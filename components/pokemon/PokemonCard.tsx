import { SmallPokemon } from "interfaces"
import { FC } from "react"
import { Card, Grid, Row, Text } from "@nextui-org/react"

type Props = {
    data: SmallPokemon
}

export const PokemonCard: FC<Props> = ({ data }) => {
    const { id, img, name } = data
    return (
        <Grid xs={6} sm={3} xl={2} key={id}>
            <Card isPressable>
            <Card.Body css={{ p: 12, backgroundColor:'#131313' }}>
                <Card.Image
                src={img}
                objectFit="cover"
                height={140}
                alt={name}
                />
            </Card.Body>
            <Card.Footer css={{ justifyItems: "flex-start" }}>
                <Row wrap="wrap" justify="space-between" align="center">
                <Text transform="capitalize" b>{name}</Text>
                <Text css={{ color: "$accents7", fontWeight: "$semibold", fontSize: "$sm" }}>
                    #{id}
                </Text>
                </Row>
            </Card.Footer>
            </Card>
        </Grid>
    )
}
