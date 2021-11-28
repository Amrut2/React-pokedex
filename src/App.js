import React from 'react';
import "./App.css";
import { useState } from 'react';
import axios from 'axios';



function App() {

  const [pokemonName, setPokemonName] = useState("");

  //do we have even chosen any pokemon?

  const [pokemonChosen, setPokemonChosen] = useState(false);


  const [pokemon, setPokemon] = useState({
    name: "",
    species: "",
    img: "",
    hp: "",
    type:"",
  });
  //function for click event
  const searchPokemon = () => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((response) => {
        setPokemon({
          name: pokemonName,
          species: response.data.species.name,
          img: response.data.sprites.other.dream_world.front_default,
          hp: response.data.stats[0].base_stat,
          type : response.data.types[0].type.name,
        })
        setPokemonChosen(true)

      })
  }
  return (
    <div className="App">
      <div className="TitleSection">
        <h1> Pokedex </h1>

        {/* Grabbing everything written in the input box using event.target.value */}
        <input type="text" spellcheck="false" placeholder = "Enter Pokemon name ..."
          onChange={(event) => {
            setPokemonName(event.target.value);
          }} />
        {/* This above thing will always update pokemonName because of that two lines */}


        <button onClick={searchPokemon}>Search Pokemon</button>
      </div>
      <div className="DisplaySection">
        {!pokemonChosen ? (<h3>where's Pokemon</h3>) : (
        
        <>
        <h1> {pokemon.name}</h1>
        <img src={ pokemon.img }  />
        <h3>Species: <span>{pokemon.type} </span> </h3>
        {/* <h4>HP : {pokemon.hp }</h4> */}
        </>
        
        )}
      </div>
    </div>
  )
}

export default App
