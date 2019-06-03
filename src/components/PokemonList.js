import React from 'react'
import { useSubscription } from 'urql'
import Pokemon from './Pokemon'

const subscribeToPokemons = `
subscription {
  pokemons {
    id
    name
    image
    comments {
      id
      content
    }
  }
}
`

const PokemonList = () => {
  const handleSubscription = (pokemon, response) => {
    console.log({ pokemon, response })
    return response.pokemons
  }

  const [{ data: pokemons }] = useSubscription(
    { query: subscribeToPokemons },
    handleSubscription
  )

  if (!pokemons) return 'Loading...'

  return <ul>
    {
      pokemons.map(pokemon => <Pokemon key={`pokemon-${pokemon.id}`} pokemon={pokemon} />)
    }
  </ul>
}

export default PokemonList
