import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { PokemonContext } from '../App'
import { PokemonTag } from './pokemon-tag'

const PokemonStat = ({ title, value, showBar }) => {
  return (
    <li
      style={{
        display: 'grid',
        gridGap: 20,
        gridTemplateColumns: '120px auto',
        alignItems: 'center',
        fontSize: '0.9rem',
        textTransform: 'capitalize',
      }}
    >
      <div style={{ opacity: 0.3, fontWeight: 'bold' }}>{title}</div>
      {showBar && (
        <div style={{ display: 'flex', alignItems: 'center', gridGap: 10 }}>
          {value}
          <div
            style={{
              height: 4,
              width: '100%',
              background: '#f1f1f1',
              borderRadius: 3,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: 4,
                width: `${value}%`,
                backgroundColor: '#4caf50',
              }}
            />
          </div>
        </div>
      )}
      {!showBar && <div>{value}</div>}
    </li>
  )
}

export const PokemonDetail = () => {
  const params = useParams()
  const history = useHistory()
  const [pokemon, setPokemon] = useState()
  const { data, loading } = useContext(PokemonContext)

  useEffect(() => {
    if (data) {
      const found = data.pokemon_v2_pokemon_aggregate.nodes.find(
        (p) => p.id === parseInt(params.pokemonId, 10)
      )

      if (found) {
        setPokemon(found)
      }
    }
  }, [data, params.pokemonId])

  if (loading) return <div>Loading...</div>
  if (!pokemon) return <div>Pokemon not found</div>

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
        filter: 'saturate(60%)',
        backgroundColor:
          pokemon.pokemon_v2_pokemonspecy.pokemon_v2_pokemoncolor.name,
      }}
    >
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          height: '40%',
          padding: '40px 20px',
          color: 'white',
          mixBlendMode:
            pokemon.pokemon_v2_pokemonspecy.pokemon_v2_pokemoncolor.name ===
            'gray'
              ? undefined
              : 'difference',
        }}
      >
        <button
          style={{ fontSize: 20, cursor: 'pointer' }}
          onClick={() => history.push('/')}
        >
          &#8592;
        </button>
        <h2 style={{ textTransform: 'capitalize', marginBottom: 10 }}>
          {pokemon.name}
        </h2>
        <div
          style={{
            display: 'flex',
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
          maxWidth: 180,
          maxHeight: 200,
          position: 'absolute',
          zIndex: 1,
          top: 30,
          right: 20,
        }}
      />
      <div
        style={{
          flexGrow: 1,
          backgroundColor: '#fff',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          boxShadow: '0px 0px 10px rgba(0,0,0,0.5)',
          padding: '50px 20px',
        }}
      >
        <ul
          style={{
            display: 'flex',
            flexDirection: 'column',
            gridGap: 15,
            listStyle: 'none',
            padding: 0,
            margin: 0,
          }}
        >
          <PokemonStat title="Species" value="Seed" />
          <PokemonStat title="Height" value={pokemon.height} />
          <PokemonStat title="Weight" value={pokemon.weight} />
          <PokemonStat
            title="Abilities"
            value={pokemon.pokemon_v2_pokemonabilities
              .map((a) => a.pokemon_v2_ability.name)
              .join(', ')}
          />

          <hr
            style={{
              height: 0,
              borderWidth: 1,
              borderColor: 'rgba(0,0,0,0.1)',
              width: '100%',
              margin: '10px 0',
            }}
          />
          <h3 style={{ margin: 0 }}>Stats</h3>
          {pokemon.pokemon_v2_pokemonstats.map((stat) => (
            <PokemonStat
              title={stat.pokemon_v2_stat.pokemon_v2_statnames[0].name}
              value={stat.base_stat}
              showBar
            />
          ))}
        </ul>
      </div>
    </div>
  )
}
