import React, { useState } from 'react'
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

const Pokemon = ({ pokemon }) => {
  const [showComments, setShowComments] = useState(false)
  const [, deletePokemon] = useMutation(deletePokemonMutation)
  const [, deleteComment] = useMutation(deleteCommentMutation)
  const [, likePokemon] = useMutation(likePokemonMutation)

  const toggleComments = () => setShowComments(!showComments)

  return <div className="ui card">
    <div className="content">
      <div className="right floated meta"><i onClick={() => deletePokemon({ id: pokemon.id })} className='delete icon'></i></div>
      <img className="ui avatar image" src='https://i.pinimg.com/236x/64/2c/2a/642c2aad1cdbc6e3179d3e22330768b3--pokeball-tattoo-pokemon-images.jpg' /> {pokemon.name}
    </div>
    <div className="image">
      <img src={pokemon.image} alt={pokemon.name} />
    </div>
    <div className="content">
      <a className='right floated'>
        <i onClick={() => likePokemon({ id: pokemon.id })} className="like icon"></i>
        {pokemon.likes} {pokemon.likes === 1 ? 'Like' : 'Likes'}
      </a>
      <a onClick={toggleComments}>
        <i className={`comment ${showComments ? '' : 'outline'} icon`}></i>
        {pokemon.comments.length} comments
      </a>
    </div>
    {
      showComments &&
        <div className='content'>
          <div class="ui divided list">
            {
              pokemon.comments.map(comment => <div key={`comment-${comment.id}`} className="item">
                <i className='comment outline icon'></i>
                <div className="content">
                  <div className="header">{comment.content}</div>
                  <i onClick={() => deleteComment({ id: comment.id })} className="trash red icon right floated"></i>
                </div>
              </div>)
            }
          </div>
        </div>
    }
    <div className="extra content">
      <AddCommentForm id={pokemon.id} />      
    </div>
  </div>
}

export default Pokemon
