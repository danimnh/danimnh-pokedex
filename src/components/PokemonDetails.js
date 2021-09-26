import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useHistory } from "react-router-dom";
import axios from "axios";

import PokemonCatchModal from "./PokemonCatchModal";
import MoveLearnt from "./MoveLearnt";
import PokemonType from "./PokemonType";

const PokemonDetails = (props) => {
  let { pokemon, nickname, id } = props.match.params;
  const [pokemonData, setPokemonData] = useState({});
  const [modalContent, setModalContent] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCatch = () => {
    const max = 2;
    const rand = Math.floor(Math.random() * max);
    if (rand === 1) {
      setModalContent(pokemonData);
      setIsModalVisible(true);
    } else {
      setIsModalVisible(true);
    }
  };

  const handleRelease = (id) => {
    let savedPokemon = localStorage.getItem("myPokemon");
    savedPokemon = JSON.parse(savedPokemon);
    var removeIndex = savedPokemon.findIndex(function (o) {
      return o.owned_id === parseInt(id);
    });
    savedPokemon.splice(removeIndex, 1);
    localStorage.setItem("myPokemon", JSON.stringify(savedPokemon));
    history.replace("/box");
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setModalContent({});
  };

  let history = useHistory();

  const Container = styled.div`
    display: flex;
    flex-direction: column;
  `;

  const BackButton = styled.button`
    height: 30px;
    width: 30px;
  `;

  const CatchButton = styled.button`
    padding: 10px;
    background: linear-gradient(
      180deg,
      rgba(250, 174, 174, 1) 14%,
      rgba(210, 210, 214, 1) 33%,
      rgba(210, 210, 214, 1) 61%,
      rgba(255, 255, 255, 1) 87%
    );
    color: black;
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 10px;
    border-radius: 10px;
    border-width: 2px;
  `;
  const ReleaseButton = styled.button`
    padding: 10px;
    background-color: red;
    color: white;
    border-radius: 10px;
    margin-bottom: 10px;
    font-weight: bold;
    font-size: 16px;
  `;

  const ImgContainer = styled.img`
    width: 200px;
    margin: 0 auto;
  `;

  const Text = styled.h4`
    margin: 0 auto;
    margin-bottom: 10px;
    text-transform: capitalize;
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
      <BackButton
        onClick={() => {
          history.goBack();
        }}
      >
        &laquo;
      </BackButton>

      {pokemonData.sprites !== undefined && (
        <>
          <ImgContainer src={pokemonData.sprites.front_default} />
        </>
      )}
      {nickname !== undefined && <Text>"{nickname}"</Text>}
      {pokemonData.name !== undefined && <Text>{pokemonData.name}</Text>}
      <PokemonType pokemonType={pokemonData.types} />
      {nickname === undefined ? (
        <CatchButton onClick={handleCatch}>Catch</CatchButton>
      ) : (
        <ReleaseButton
          onClick={() => {
            handleRelease(id);
          }}
        >
          Release
        </ReleaseButton>
      )}
      <MoveLearnt moves={pokemonData.moves} />
      <PokemonCatchModal
        modalContent={modalContent}
        isModalVisible={isModalVisible}
        handleCloseModal={handleCloseModal}
      />
    </Container>
  );
};

export default PokemonDetails;
