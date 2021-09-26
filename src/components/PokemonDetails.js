import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useHistory } from "react-router-dom";
import axios from "axios";

const PokemonDetails = (props) => {
  let { pokemon } = props.match.params;
  const [pokemonData, setPokemonData] = useState({});

  let history = useHistory();

  const Container = styled.div`
    display: flex;
    flex-direction: column;
  `;
  const CatchButton = styled.button`
    padding: 10px;
    background-color: green;
    color: white;
    margin-bottom: 10px;
  `;

  // const CloseButton = styled.span`
  //   display: flex;
  //   justify-content: flex-end;
  //   font-size: 30px;
  //   color: black;
  // `;
  const ImgContainer = styled.img`
    width: 70%;
    margin: 0 auto;
  `;

  useEffect(() => {
    const getPokemonData = async () => {
      const res = await axios.get("pokemon/" + pokemon);
      return res.data;
    };
    getPokemonData().then((res) => {
      setPokemonData(res);
    });
  }, [pokemon]);
  return (
    <Container>
      <button
        onClick={() => {
          history.goBack();
        }}
      >
        &laquo; Back to Home
      </button>

      {pokemonData.sprites !== undefined && (
        <>
          <button
            onClick={() => {
              console.log(pokemonData);
            }}
          >
            Debug
          </button>
          <ImgContainer src={pokemonData.sprites.front_default} />
        </>
      )}
      <CatchButton>Catch</CatchButton>
    </Container>
  );
};

export default PokemonDetails;
