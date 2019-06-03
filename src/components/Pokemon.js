import React from 'react'

import { useMutation } from 'urql'

const deletePokemonMutation = `
mutation DeletePokemon($id: Int!) {
  delete_pokemons(where: {id: {_eq: $id}}) {
    returning {
      name
    }
  }
}
`

const style = {
  width: '200px',
  margin: '10px',
  border: 'solid black 2px'
}

const imageStyle = {
  width: '100%'
}

const Pokemon = ({ pokemon }) => {
  const [, deletePokemon] = useMutation(deletePokemonMutation)
  return <div style={style}>
    <p>{pokemon.name}<button onClick={() => deletePokemon({ id: pokemon.id })}>X</button></p>
    <img style={imageStyle} src={pokemon.image} alt={pokemon.name} />
    <ul>
      {
        pokemon.comments.map(comment => <li key={`comment-${comment.id}`}>{comment.content}</li>)
      }
    </ul>
  </div>
}

export default Pokemon
