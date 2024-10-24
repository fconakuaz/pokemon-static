import { SmallPokemon } from "interfaces";
import { FC } from "react";
import { Card, Grid, Row, Text } from "@nextui-org/react";
import { useRouter } from "next/router";

export const PokemonCard: FC<SmallPokemon> = ({
  id,
  img,
  name,
  color,
  background,
}) => {
  const router = useRouter();

  const onClick = () => {
    router.push(`/name/${name}`);
  };

  return (
    <Grid
      xs={6}
      sm={3}
      xl={2}
      key={id}
      style={{ minWidth: "250px" }}
      onClick={onClick}
    >
      <Card isPressable>
        <Card.Body css={{ p: 12, backgroundColor: "#131313" }}>
          <Card.Image src={img} objectFit="cover" height={140} alt={name} />
        </Card.Body>
        <Card.Footer
          css={{
            justifyItems: "flex-start",
            background: background || undefined,
          }}
        >
          <Row wrap="wrap" justify="space-between" align="center">
            <Text
              transform="capitalize"
              b
              css={{
                color: color || undefined,
              }}
            >
              {name}
            </Text>
            <Text
              css={{
                color: color || "$accents7",
                fontWeight: "$semibold",
                fontSize: "$sm",
              }}
            >
              #{id}
            </Text>
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
  );
};
