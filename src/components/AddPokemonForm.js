import React, { useState } from 'react'
import { useMutation } from 'urql'

const addTodoMutation = `
mutation AddPokemon($name: String!, $image: String!) {
  insert_pokemons(objects: { name: $name, image: $image }) {
    returning {
      id
      name
      image
    }
  }
}
`

const AddPokemonForm = () => {
  const [pokemonInput, setPokemonInput] = useState({ name: '', image: '' })

  const [, addPokemon] = useMutation(addTodoMutation)

  const handleChange = e => {
    setPokemonInput({...pokemonInput, [e.target.name]: e.target.value})
  }

  const handleSubmit = e => {
    e.preventDefault()
    addPokemon(pokemonInput).then(console.log)
  }

  return <form onSubmit={handleSubmit}>
    <input onChange={handleChange} name='name' placeholder='name' />
    <input onChange={handleChange} name='image' placeholder='image' />
    <button>ADD POKEMON</button>
  </form>
}

export default AddPokemonForm
