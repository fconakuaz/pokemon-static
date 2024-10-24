export interface PokemonListResponse {
  count: number;
  next?: string;
  previous?: string;
  results: SmallPokemon[];
}

export interface SmallPokemon {
  /** Pokemon Name */
  name: string;
  url?: string;
  id: number;
  img: string;
  color?: string;
  background?: string;
}
