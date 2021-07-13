import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_POKEMON } from './query'

export const PokemonContext = React.createContext({})
export const PokemonProvider = ({ children }) => {
  const limit = 30
  const [currentOffset, setCurrentOffset] = useState(0)
  const { data, loading, error, fetchMore } = useQuery(GET_POKEMON, {
    variables: {
      limit,
      offset: currentOffset,
    },
  })

  return (
    <PokemonContext.Provider
      value={{
        data,
        loading,
        error,
        getNextPage: () => {
          const nextOffset = currentOffset + limit
          fetchMore({
            variables: {
              offset: nextOffset,
            },
          })
          setCurrentOffset(nextOffset)
        },
      }}
    >
      {children}
    </PokemonContext.Provider>
  )
}
