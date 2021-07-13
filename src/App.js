import React from 'react'
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { PokemonList } from './components/pokemon-list'
import { PokemonDetail } from './components/pokemon-detail'
import { PokemonProvider } from './context'

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
