import React, { useState } from 'react'
import {
  ApolloClient,
  ApolloProvider,
  useQuery,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { GET_POKEMON } from './query'
import { PokemonList } from './components/pokemon-list'
import { PokemonDetail } from './components/pokemon-detail'

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

const App = () => {
  return (
    <Router>
      <ApolloProvider
        client={
          new ApolloClient({
            link: createHttpLink({
              uri: 'https://beta.pokeapi.co/graphql/v1beta',
            }),
            cache: new InMemoryCache(),
          })
        }
      >
        <PokemonProvider>
          <Switch>
            <Route path="/:pokemonId" component={PokemonDetail} />
            <Route path="/" component={PokemonList} />
          </Switch>
        </PokemonProvider>
      </ApolloProvider>
    </Router>
  )
}

export default App
