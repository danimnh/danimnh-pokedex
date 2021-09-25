import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [pokemonData, setPokemonData] = useState([]);

  const getAllPokemonList = async () => {
    const pokemonList = await axios.get("pokemon?limit=1118");
    console.log(pokemonList);
    setPokemonData(pokemonList.data.results);
  };

  useEffect(() => {
    console.log("test");
    getAllPokemonList();
  }, []);

  return (
    <div>
      <div>Danimnh's Pokedex</div>
    </div>
  );
}

export default App;
