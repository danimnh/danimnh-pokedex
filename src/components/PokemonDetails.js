import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useHistory } from "react-router-dom";
import axios from "axios";

import PokemonCatchModal from "./PokemonCatchModal";

const PokemonDetails = (props) => {
  let { pokemon, nickname } = props.match.params;
  console.log(props.match.params);
  const [pokemonData, setPokemonData] = useState({});
  const [modalContent, setModalContent] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCatch = () => {
    const max = 2;
    const rand = Math.floor(Math.random() * max);
    if (rand === 1) {
      console.log(rand);
      setModalContent(pokemonData);
      setIsModalVisible(true);
    } else {
      console.log("gagal");
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
    width: 300px;
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
      {nickname !== undefined && <p>{nickname}</p>}
      {pokemonData.name !== undefined && <p>{pokemonData.name}</p>}
      {nickname === undefined ? (
        <CatchButton onClick={handleCatch}>Catch</CatchButton>
      ) : (
        <ReleaseButton>Release</ReleaseButton>
      )}
      <PokemonCatchModal
        modalContent={modalContent}
        isModalVisible={isModalVisible}
        handleCloseModal={handleCloseModal}
      />
    </Container>
  );
};

export default PokemonDetails;
