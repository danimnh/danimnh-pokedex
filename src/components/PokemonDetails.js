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
      {nickname !== undefined && <p>{nickname}</p>}
      {pokemonData.name !== undefined && <p>{pokemonData.name}</p>}
      {nickname === undefined && (
        <CatchButton onClick={handleCatch}>Catch</CatchButton>
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
