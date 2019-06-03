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

const Pokemon = ({ pokemon }) => {
  const [, deletePokemon] = useMutation(deletePokemonMutation)
  const [, deleteComment] = useMutation(deleteCommentMutation)
  const [, likePokemon] = useMutation(likePokemonMutation)


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
      <i className="comment icon"></i>
      {pokemon.comments.length} comments
    </div>
    <div class="ui celled list">
      {
        pokemon.comments.map(comment => <div key={`comment-${comment.id}`} className="item">
          <div className="content">
            <div className="header">{comment.content}</div>
          </div>
        </div>)
      }
    </div>
    <div className="extra content">
      <AddCommentForm id={pokemon.id} />      
    </div>
  </div>

  return <div className="ui card yellow">
    <div className="image">
      <img src={pokemon.image} alt={pokemon.name} />
    </div>
    <div className="content">
      <a className="header">{pokemon.name.toUpperCase()}</a>
      <div className="meta">
        <span className="date">Gotta catch 'em all</span>
      </div>
    </div>
    <AddCommentForm id={pokemon.id} />
    <div className="ui middle aligned animated list">
      {
        pokemon.comments.map(comment => <div key={`comment-${comment.id}`} className="item">
          <img className="ui avatar image" src="https://i.pinimg.com/236x/64/2c/2a/642c2aad1cdbc6e3179d3e22330768b3--pokeball-tattoo-pokemon-images.jpg" />
          <div className="content">
            <div className="header">{comment.content}</div>
          </div>
        </div>)
      }
    </div>
    <div className="extra content">
      <a>
        <i onClick={() => likePokemon({ id: pokemon.id })} className="like icon"></i>
        {pokemon.likes} {pokemon.likes === 1 ? 'Like' : 'Likes'}
      </a>
      <a className='right'>
        <i onClick={() => likePokemon({ id: pokemon.id })} className="delete icon"></i>
      </a>
    </div>
  </div>

  // return <div className='ui card'>
  //   <p>{pokemon.name}<button onClick={() => deletePokemon({ id: pokemon.id })}>X</button></p>
  //   <img style={imageStyle} src={pokemon.image} alt={pokemon.name} />
  //   <p>
  //     Likes: {pokemon.likes}
  //     <button onClick={() => likePokemon({ id: pokemon.id })}>LIKE!</button>
  //   </p>
  //   <ul>
  //     {
  //       pokemon.comments.map(comment =>
  //         <li
  //           key={`comment-${comment.id}`}
  //           onClick={() => deleteComment({ id: comment.id })}
  //         >
  //           {comment.content}
  //         </li>
  //       )
  //     }
      
  //   </ul>
  // </div>
}

export default Pokemon
