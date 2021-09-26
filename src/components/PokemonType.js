import React from "react";
import styled from "@emotion/styled";

const PokemonType = (props) => {
  const { pokemonType } = props;

  const getColor = (type) => {
    const colours = {
      normal: "#A8A77A",
      fire: "#EE8130",
      water: "#6390F0",
      electric: "#F7D02C",
      grass: "#7AC74C",
      ice: "#96D9D6",
      fighting: "#C22E28",
      poison: "#A33EA1",
      ground: "#E2BF65",
      flying: "#A98FF3",
      psychic: "#F95587",
      bug: "#A6B91A",
      rock: "#B6A136",
      ghost: "#735797",
      dragon: "#6F35FC",
      dark: "#705746",
      steel: "#B7B7CE",
      fairy: "#D685AD",
    };
    // if type == colours type return colours type
    for (const key in colours) {
      if (type === key) {
        return colours[key];
      }
    }
    return colours.type;
  };
  const Container = styled.div`
    display: flex;
    justify-content: center;
  `;

  const Text = styled.div`
    margin: 10px;
    color: white;
    text-transform: capitalize;
  `;

  return (
    <Container>
      {pokemonType !== undefined &&
        pokemonType.map((value, i) => {
          let type = value.type.name;
          const TypeContainer = styled.div`
            background-color: ${getColor(type)};
            margin: 0px 5px 10px 5px;
            border-radius: 10px;
          `;
          return (
            <TypeContainer key={i}>
              <Text>{value.type.name}</Text>
            </TypeContainer>
          );
        })}
    </Container>
  );
};

export default PokemonType;
