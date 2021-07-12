import React from 'react'
import { useHistory } from 'react-router-dom'
import { PokemonTag } from './pokemon-tag'

export const PokemonItem = ({ pokemon }) => {
  const history = useHistory()
  return (
    <li
      style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-between',
        gridGap: 10,
        maxWidth: '100%',
        height: 75,
        overflow: 'hidden',
        padding: 20,
        borderRadius: 20,
        border:
          pokemon.pokemon_v2_pokemonspecy.pokemon_v2_pokemoncolor.name ===
          'white'
            ? '1px solid black'
            : undefined,
        backgroundColor:
          pokemon.pokemon_v2_pokemonspecy.pokemon_v2_pokemoncolor.name,
        filter: 'saturate(50%)',
        cursor: 'pointer',
      }}
      onClick={() => history.push(`/${pokemon.id}`)}
    >
      <div
        style={{
          color: 'white',
          mixBlendMode:
            pokemon.pokemon_v2_pokemonspecy.pokemon_v2_pokemoncolor.name ===
            'gray'
              ? undefined
              : 'difference',
        }}
      >
        <div
          style={{
            fontWeight: 'bold',
            textTransform: 'capitalize',
            marginBottom: 10,
          }}
        >
          {pokemon.name}
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gridGap: 5,
          }}
        >
          {pokemon.pokemon_v2_pokemontypes.map((type, index) => (
            <PokemonTag tag={type.pokemon_v2_type.name} key={index} />
          ))}
        </div>
      </div>

      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
        alt={pokemon.name}
        style={{
          maxWidth: 50,
          maxHeight: 50,
          position: 'absolute',
          bottom: 20,
          right: 20,
        }}
      />
    </li>
  )
}
