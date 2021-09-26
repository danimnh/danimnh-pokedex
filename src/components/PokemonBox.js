import React, { useState, useEffect, useRef } from "react";
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import styled from "@emotion/styled";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

const PokemonBox = () => {
  let history = useHistory();

  const countPerPage = 8;
  const [value, setValue] = useState("");
  const [savedPokemon] = useState(
    JSON.parse(localStorage.getItem("myPokemon"))
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [collection, setCollection] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchData = useRef(
    throttle(async (val) => {
      const query = val.toLowerCase();
      setCurrentPage(1);
      const data = cloneDeep(
        savedPokemon
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
    const savedPokemonList = cloneDeep(savedPokemon.slice(from, to));
    for (var i = 0; i < savedPokemonList.length; i++) {
      const pokemonData = await axios.get(
        "pokemon/" + savedPokemonList[i].name
      );
      savedPokemonList[i].data = pokemonData.data;
    }
    setCollection(savedPokemonList);
  };

  const CardContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 900px;
    @media (max-width: 768px) {
      width: 375px;
    }
    margin-bottom: 60px;
  `;
  const Card = styled.div`
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    margin: 10px;
    width: 20%;
    padding: 12px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    text-transform: capitalize;
    flex-shrink: 1;
    @media (max-width: 768px) {
      width: 30%;
    }
  `;

  const BackButton = styled.button`
    height: 30px;
    width: 30px;
    margin-right: 10px;
    margin-bottom: 10px;
  `;
  const ImgContainer = styled.img`
    width: 100%;
  `;

  useEffect(() => {
    if (savedPokemon !== null) {
      if (value === "") {
        setIsLoading(true);
        updatePage(1);
        setIsLoading(false);
      } else {
        setIsLoading(true);
        searchData.current(value);
        setIsLoading(false);
      }
    }

    //eslint-disable-next-line
  }, [value]);

  return (
    <>
      {/* have to do manual style because it set focus off on input */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <BackButton
          onClick={() => {
            history.replace("/");
          }}
        >
          &laquo;
        </BackButton>
        {/* have to do manual style because it set focus off on input */}
        <div style={{ height: "30px", display: "flex" }}>
          <input
            placeholder="Search on BOX"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      </div>
      {savedPokemon === null ? (
        <p>You don't own a Pokemon yet.</p>
      ) : (
        <Pagination
          pageSize={countPerPage}
          onChange={updatePage}
          current={currentPage}
          total={savedPokemon.length}
        />
      )}

      {isLoading === false && (
        <CardContainer>
          {collection.map((pokemon, i) => {
            return (
              <Card key={i}>
                <Link
                  to={
                    "box/" +
                    pokemon.name +
                    "/" +
                    pokemon.nickname +
                    "/" +
                    pokemon.owned_id
                  }
                  style={{ textDecoration: "none", color: "#000000" }}
                >
                  {pokemon.data && (
                    <ImgContainer
                      src={pokemon.data.sprites.front_default}
                      alt={pokemon.name + " Image"}
                    />
                  )}
                  {pokemon.nickname === "" ? (
                    <p>{pokemon.name}</p>
                  ) : (
                    <p>{pokemon.nickname}</p>
                  )}
                </Link>
              </Card>
            );
          })}
        </CardContainer>
      )}
    </>
  );
};
export default PokemonBox;
