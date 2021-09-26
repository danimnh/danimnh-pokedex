// import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled from "@emotion/styled";
import axios from "axios";
import PokemonList from "./components/PokemonList";
import PokemonDetails from "./components/PokemonDetails";
import PokemonBox from "./components/PokemonBox";

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
    background-color: rgba(34, 34, 36, 1);
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
    getAllPokemonList();
  }, []);

  return (
    // <div className="App">
    <Layout>
      <Title>Danimnh's Pokedex</Title>
      <Router>
        <Link
          to="/box"
          style={{
            textDecoration: "none",
            fontWeight: "bold",
            color: "white",
          }}
        >
          <Button>Owned Pokemon</Button>
        </Link>

        <Switch>
          <Route exact path="/">
            <PokemonList pokemonList={pokemonList} />
          </Route>
          <Route
            path="/details/:pokemon"
            render={(props) => <PokemonDetails {...props} />}
          />
          <Route
            path="/box/:pokemon/:nickname"
            render={(props) => <PokemonDetails {...props} />}
          />
          <Route path="/box" render={(props) => <PokemonBox {...props} />} />
        </Switch>
      </Router>
    </Layout>
    // </div>
  );
}

export default App;
