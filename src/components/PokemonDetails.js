import styled from "@emotion/styled";

const PokemonDetails = (props) => {
  const { modalContent, isModalVisible, handleClose } = props;
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
    min-height: 300px;
    margin: 0 auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    text-transform: capitalize;
  `;

  const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
  `;
  const CatchButton = styled.button`
    padding: 10px;
    background-color: green;
    color: white;
    margin-bottom: 10px;
  `;

  const CloseButton = styled.span`
    display: flex;
    justify-content: flex-end;
    font-size: 30px;
    color: black;
  `;
  const ImgContainer = styled.img`
    width: 70%;
    margin: 0 auto;
  `;
  if (isModalVisible === false) {
    return null;
  }
  return (
    <Backdrop>
      <Modal>
        <CloseButton onClick={handleClose}>&times;</CloseButton>
        <ButtonContainer>
          <ImgContainer src={modalContent.data.sprites.front_default} />
          <p>{modalContent.name}</p>

          <CatchButton
            onClick={() => {
              console.log("catch");
            }}
          >
            Catch
          </CatchButton>
        </ButtonContainer>
      </Modal>
    </Backdrop>
  );
};

export default PokemonDetails;
