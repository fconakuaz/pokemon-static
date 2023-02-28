import { Collapse, Text, Grid, Badge } from "@nextui-org/react";
import { Pokemon } from "interfaces";
import { FC } from "react";

interface Props {
  pokemon: Pokemon;
}

const PokemonSpecs: FC<Props> = ({ pokemon }) => {
  const { moves, abilities, types, stats } = pokemon;
  console.log("🚩🚩🚩 pokemon 🚩🚩🚩");
  console.log(stats);
  return (
    <Grid.Container gap={2}>
      <Grid>
        <Collapse.Group splitted>
          <Collapse title="Propiedades ">
            {stats?.map(({ stat, base_stat }) => (
              <Badge
                style={{ margin: "4px 2px" }}
                key={stat.name}
                color="primary"
                variant="bordered"
              >
                <Text
                  transform="capitalize"
                  style={{ fontSize: "14px", padding: "0px 3px" }}
                >
                  {stat.name} {base_stat}
                </Text>
              </Badge>
            ))}
          </Collapse>
          <Collapse title="Tipos ">
            {types?.map(({ type }) => (
              <Badge
                style={{ margin: "4px 2px" }}
                key={type.name}
                color="secondary"
                variant="bordered"
              >
                <Text
                  transform="capitalize"
                  style={{ fontSize: "14px", padding: "0px 3px" }}
                >
                  {type.name}
                </Text>
              </Badge>
            ))}
          </Collapse>
          <Collapse title="Habilidades ">
            {abilities?.map(({ ability }) => (
              <Badge
                style={{ margin: "4px 2px" }}
                key={ability.name}
                color="warning"
                variant="bordered"
              >
                <Text
                  transform="capitalize"
                  style={{ fontSize: "14px", padding: "0px 3px" }}
                >
                  {ability.name}
                </Text>
              </Badge>
            ))}
          </Collapse>
        </Collapse.Group>
        <Collapse.Group splitted>
          <Collapse title="Ataques ">
            {moves?.map(({ move }) => (
              <Badge
                style={{ margin: "4px 2px" }}
                key={move.name}
                color="success"
                variant="bordered"
              >
                <Text
                  transform="capitalize"
                  style={{ fontSize: "14px", padding: "0px 3px" }}
                >
                  {move.name}
                </Text>
              </Badge>
            ))}
          </Collapse>
        </Collapse.Group>
      </Grid>
    </Grid.Container>
  );
};

export default PokemonSpecs;
