import React, { useContext } from 'react'
import { PokemonContext } from '../context'
import { PokemonItem } from './pokemon-item'

export const PokemonList = () => {
  const { data, loading, error, getNextPage } = useContext(PokemonContext)

  return (
    <div
      style={{
        backgroundImage: 'url(/pokeball-bg.png)',
        backgroundPosition: '100% 40%',
        backgroundAttachment: 'fixed',
        backgroundSize: '60%',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <header
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '30px 20px 10px',
        }}
      >
        <img src="/pokemon-logo.svg" alt="Pokemon logo" />
      </header>
      <div style={{ padding: '20px 10px' }}>
        {loading && <div>Loading...</div>}
        {!loading && error && <div>Error fetching Pokemon</div>}
        {!loading && !data?.pokemon_v2_pokemon_aggregate.nodes.length && (
          <div>No Pokemon Found!</div>
        )}
        {!!data?.pokemon_v2_pokemon_aggregate.nodes.length && (
          <>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                flexWrap: 'wrap',
                gridGap: 10,
              }}
            >
              {data.pokemon_v2_pokemon_aggregate.nodes.map((pokemon) => (
                <PokemonItem pokemon={pokemon} />
              ))}
            </ul>
            <button
              onClick={getNextPage}
              style={{
                display: 'block',
                textAlign: 'center',
                marginTop: 20,
                padding: '10px 20px',
                backgroundColor: 'rgba(0,0,0,0.1)',
                width: '100%',
                fontSize: '0.8rem',
                borderRadius: 20,
                cursor: 'pointer',
              }}
            >
              Next Page
            </button>
          </>
        )}
      </div>
    </div>
  )
}
