import { useState } from "react";
import styled from "@emotion/styled";
import { useHistory } from "react-router-dom";

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 50px;
`;

const Modal = styled.div`
  background: #fff;
  border-radius: 5px;
  max-width: 500px;
  //   min-height: 300px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
const PokemonCatchModal = (props) => {
  let history = useHistory();

  const { modalContent, isModalVisible, handleCloseModal } = props;
  const [nickname, setNickname] = useState("");

  if (isModalVisible === false) {
    return null;
  }
  const Capitalize = (string) => {
    const str = string;
    const str2 = str.charAt(0).toUpperCase() + str.slice(1);
    return str2;
  };

  const handleSendBox = (modalContent, nickname) => {
    modalContent.nickname = nickname;
    let savedPokemon = localStorage.getItem("myPokemon");
    if (savedPokemon === null) {
      savedPokemon = [];
      savedPokemon.push(modalContent);
      localStorage.setItem("myPokemon", JSON.stringify(savedPokemon));
    } else {
      savedPokemon = JSON.parse(savedPokemon);
      savedPokemon.push(modalContent);
      localStorage.setItem("myPokemon", JSON.stringify(savedPokemon));
    }

    history.push("/box");
  };
  return (
    <Backdrop>
      <Modal>
        {modalContent.name === undefined ? (
          <p>Oh no! The Pokemon broke free!</p>
        ) : (
          <>
            <p>Gotcha! {Capitalize(modalContent.name)} was caught!</p>
            <input
              placeholder="Give a nickname!"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <button onClick={() => handleSendBox(modalContent, nickname)}>
              Send to BOX
            </button>
          </>
        )}

        <button onClick={handleCloseModal}>Close</button>
      </Modal>
    </Backdrop>
  );
};

export default PokemonCatchModal;
