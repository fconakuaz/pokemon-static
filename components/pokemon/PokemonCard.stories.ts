import type { Meta, StoryObj } from "@storybook/react";

import { PokemonCard } from ".";
import { expect, userEvent, within } from "@storybook/test";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Pokemones/Card",
  component: PokemonCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "This is a Pokémon card that displays basic information such as the name, image, and Pokémon ID.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    id: {
      control: "number",
      description:
        "Pokemon Id, can be used in a URL for example: http://localhost:3000/name/25",
    },
    img: { control: "text" },
    name: { control: "text" },
    url: { control: "text" },
    color: { control: "color" },
    background: { control: "color" },
  },
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);

    await step("1. Verify pokemon information", async () => {
      await expect(canvas.getByText(args.name)).toBeInTheDocument();
      await expect(canvas.getByText(`#${args.id}`)).toBeInTheDocument();
    });

    await step("2. Verify Pokemon image is loaded", async () => {
      const image = canvas.getByRole("img");
      await expect(image).toBeInTheDocument();
      await expect(image).toHaveAttribute(
        "src",
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${args.id}.svg`
      );
    });

    await step("3. Verify Onclick function", async () => {
      await userEvent.click(canvas.getByRole("button"));
    });
  },
} satisfies Meta<typeof PokemonCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Pikachu: Story = {
  args: {
    id: 25,
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg",
    name: "pikachu",
    url: "http://localhost:3000/name/25",
  },
};

export const Charmander: Story = {
  args: {
    id: 4,
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/4.svg",
    name: "charmander",
    url: "http://localhost:3000/name/4",
  },
};

export const Bulbasaur: Story = {
  args: {
    id: 1,
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg",
    name: "bulbasaur",
    url: "http://localhost:3000/name/1",
  },
};

export const Squirtle: Story = {
  args: {
    id: 7,
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/7.svg",
    name: "squirtle",
    url: "http://localhost:3000/name/7",
  },
};
