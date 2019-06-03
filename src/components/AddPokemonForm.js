import React, { useState } from 'react'
import { useMutation } from 'urql'

const addPokemonMutation = `
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

  const [, addPokemon] = useMutation(addPokemonMutation)

  const handleChange = e => {
    setPokemonInput({...pokemonInput, [e.target.name]: e.target.value})
  }

  const handleSubmit = e => {
    e.preventDefault()
    addPokemon(pokemonInput).then(console.log)
  }

  return <form className='ui form' onSubmit={handleSubmit}>
    <h4 class="ui dividing header">Add a new pokemon!</h4>
      <div className='three fields'>
      <div className='field'>
        <input onChange={handleChange} name='name' placeholder='name' />
      </div>
      <div className='field'>
        <input onChange={handleChange} name='image' placeholder='image' />
      </div>
      <div className='field'>
        <button className='ui button'>ADD POKEMON</button>
      </div>
    </div>
  </form>
}

export default AddPokemonForm
