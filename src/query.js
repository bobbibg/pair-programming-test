import { gql } from '@apollo/client'

const POKEMON_DETAIL_FRAGMENT = gql`
  fragment PokemonData on pokemon_v2_pokemon {
    id
    name
    height
    weight
    pokemon_v2_pokemonspecy {
      pokemon_v2_pokemoncolor {
        name
      }
    }
    pokemon_v2_pokemonabilities {
      pokemon_v2_ability {
        name
      }
    }
    pokemon_v2_pokemonstats {
      base_stat
      pokemon_v2_stat {
        pokemon_v2_statnames(where: { language_id: { _eq: 9 } }) {
          name
        }
      }
    }
    pokemon_v2_pokemontypes {
      pokemon_v2_type {
        name
      }
    }
  }
`

export const GET_POKEMON = gql`
  ${POKEMON_DETAIL_FRAGMENT}
  query getPokemon($offset: Int!, $limit: Int!) {
    pokemon_v2_pokemon_aggregate(limit: $limit, offset: $offset) {
      nodes {
        ...PokemonData
      }
    }
  }
`

export const GET_POKEMON_BY_ID = gql`
  ${POKEMON_DETAIL_FRAGMENT}
  query GetPokemonById($id: Int!) {
    pokemon_v2_pokemon_by_pk(id: $id) {
      ...PokemonData
    }
  }
`
