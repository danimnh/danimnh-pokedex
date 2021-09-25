import React, { useState, useEffect, useRef } from "react";
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import styled from "@emotion/styled";
import axios from "axios";
import PokemonDetails from "./PokemonDetails";

const PokemonList = (props) => {
  const { pokemonList } = props;
  const countPerPage = 8;
  const [value, setValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [collection, setCollection] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalContent, setModalContent] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleClose = () => {
    setIsModalVisible(false);
  };

  const searchData = useRef(
    throttle(async (val) => {
      const query = val.toLowerCase();
      setCurrentPage(1);
      const data = cloneDeep(
        pokemonList
          .filter((item) => item.name.toLowerCase().indexOf(query) > -1)
          .slice(0, countPerPage)
      );
      for (var i = 0; i < data.length; i++) {
        const pokemonData = await axios.get("pokemon/" + data[i].name);
        data[i].data = pokemonData.data;
      }
      setCollection(data);
    }, 400)
  );

  const updatePage = async (p) => {
    setCurrentPage(p);
    const to = countPerPage * p;
    const from = to - countPerPage;
    const collectionList = cloneDeep(pokemonList.slice(from, to));
    for (var i = 0; i < collectionList.length; i++) {
      const pokemonData = await axios.get("pokemon/" + collectionList[i].name);
      collectionList[i].data = pokemonData.data;
    }
    setCollection(collectionList);
  };
  const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 60px;
  `;
  const Card = styled.div`
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    margin: 10px;
    // width: 200px;
    width: 18%;
    padding: 12px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    text-transform: capitalize;
    @media (max-width: 768px) {
      width: 30%;
    }
  `;

  const SearchContainer = styled.div`
    height: 30px;
    padding: 10px;
    display: flex;
  `;

  const ImgContainer = styled.img`
    width: 100%;
  `;

  useEffect(() => {
    if (value === "") {
      setIsLoading(true);
      updatePage(1);
      setIsLoading(false);
    } else {
      setIsLoading(true);
      searchData.current(value);
      setIsLoading(false);
    }
  }, [value]);

  return (
    <>
      <div>
        <SearchContainer>
          <input
            placeholder="Search Pokemon"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </SearchContainer>
      </div>
      <Pagination
        pageSize={countPerPage}
        onChange={updatePage}
        current={currentPage}
        total={pokemonList.length}
      />
      {isLoading === false && (
        <Container>
          {collection.map((pokemon) => {
            return (
              <Card
                onClick={() => {
                  console.log("clicked " + pokemon.name);
                  setModalContent(pokemon);
                  setIsModalVisible(true);
                }}
              >
                {pokemon.data && (
                  <ImgContainer
                    src={pokemon.data.sprites.front_default}
                    alt={pokemon.name + " Image"}
                  />
                )}

                <p>{pokemon.name}</p>
              </Card>
            );
          })}
        </Container>
      )}
      <PokemonDetails
        modalContent={modalContent}
        isModalVisible={isModalVisible}
        handleClose={handleClose}
      />
    </>
  );
};
export default PokemonList;
