import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useHistory } from "react-router-dom";
import axios from "axios";

import PokemonCatchModal from "./PokemonCatchModal";
import MoveLearnt from "./MoveLearnt";

const PokemonDetails = (props) => {
  let { pokemon, nickname } = props.match.params;
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
    background-color: green;
    color: white;
    margin-bottom: 10px;
  `;
  const ReleaseButton = styled.button`
    padding: 10px;
    background-color: red;
    color: white;
    margin-bottom: 10px;
  `;

  const ImgContainer = styled.img`
    width: 200px;
    // heigth: 300px;
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
      {nickname !== undefined && <Text>{nickname}</Text>}
      {pokemonData.name !== undefined && <Text>{pokemonData.name}</Text>}
      {nickname === undefined ? (
        <CatchButton onClick={handleCatch}>Catch</CatchButton>
      ) : (
        <ReleaseButton>Release</ReleaseButton>
      )}
      <button
        onClick={() => {
          console.log(pokemonData);
        }}
      >
        debug
      </button>
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
