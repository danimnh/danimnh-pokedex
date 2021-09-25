// import "./App.css";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import Table from "./components/table";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const getAllPokemonList = async () => {
    const pokemonListResponse = await axios.get("pokemon?limit=1118");
    var pokemonList = pokemonListResponse.data.results;
    setPokemonList(pokemonList);
  };

  const Button = styled.button`
    position: fixed;
    bottom: 20px;
    right: 0px;
    color: white;
    background-color: blue;
    padding: 10px 20px 10px 20px;
    border-radius: 20px;
  `;
  const Layout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `;
  const Title = styled.h2`
    color: black;
  `;
  useEffect(() => {
    console.log("test");
    getAllPokemonList();
    console.log(pokemonList);
  }, []);

  return (
    // <div className="App">
    <Layout>
      <Title>Danimnh's Pokedex</Title>
      <Button
        onClick={() => {
          console.log(pokemonList);
        }}
      >
        Owned Pokemon
      </Button>
      <Table pokemonList={pokemonList} />
    </Layout>
    // </div>
  );
}

export default App;
