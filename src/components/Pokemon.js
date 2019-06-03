import React from 'react'
import { useMutation } from 'urql'

import AddCommentForm from './AddCommentForm'

const deletePokemonMutation = `
mutation DeletePokemon($id: Int!) {
  delete_pokemons(where: {id: {_eq: $id}}) {
    returning {
      name
    }
  }
}
`

const likePokemonMutation = `
mutation LikePokemon($id: Int!) {
  update_pokemons(where: { id: { _eq: $id }}, _inc: {likes: 1}) {
    returning {
      id
      name
    }
  }
}
`

const deleteCommentMutation = `
mutation DeleteComment($id: Int!) {
  delete_comments(where: {id: {_eq: $id}}) {
    returning {
      id
    }
  }
}
`

const style = {
  width: '200px',
  margin: '10px',
  border: 'solid black 2px',
  borderRadius: '5px',
  padding: '10px'
}

const imageStyle = {
  width: '100%'
}

const Pokemon = ({ pokemon }) => {
  const [, deletePokemon] = useMutation(deletePokemonMutation)
  const [, deleteComment] = useMutation(deleteCommentMutation)
  const [, likePokemon] = useMutation(likePokemonMutation)

  return <div style={style}>
    <p>{pokemon.name}<button onClick={() => deletePokemon({ id: pokemon.id })}>X</button></p>
    <img style={imageStyle} src={pokemon.image} alt={pokemon.name} />
    <p>
      Likes: {pokemon.likes}
      <button onClick={() => likePokemon({ id: pokemon.id })}>LIKE!</button>
    </p>
    <ul>
      {
        pokemon.comments.map(comment =>
          <li
            key={`comment-${comment.id}`}
            onClick={() => deleteComment({ id: comment.id })}
          >
            {comment.content}
          </li>
        )
      }
      <AddCommentForm id={pokemon.id} />
    </ul>
  </div>
}

export default Pokemon
