import React from 'react'

import PokemonList from './components/PokemonList'
import AddPokemonForm from './components/AddPokemonForm'

import './App.css'

const App = () =>
  <div className='app ui container'>
    <br />
    <AddPokemonForm />
    <PokemonList />
  </div>

export default App
