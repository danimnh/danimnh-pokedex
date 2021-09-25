import React from "react";
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import styled from "@emotion/styled";
import axios from "axios";

const PokemonList = (props) => {
  const { pokemonList } = props;
  const countPerPage = 8;
  const [value, setValue] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [collection, setCollection] = React.useState([]);
  const searchData = React.useRef(
    throttle((val) => {
      const query = val.toLowerCase();
      setCurrentPage(1);
      const data = cloneDeep(
        pokemonList
          .filter((item) => item.name.toLowerCase().indexOf(query) > -1)
          .slice(0, countPerPage)
      );
      setCollection(data);
    }, 400)
  );
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
    @media (max-width: 768px) {
      width: 30%;
    }
  `;

  const ImgContainer = styled.img`
    width: 100%;
  `;
  React.useEffect(() => {
    if (!value) {
      updatePage(1);
    } else {
      searchData.current(value);
    }
  }, [value]);

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

  return (
    <>
      <div>
        <div class="search">
          <input
            placeholder="Search Pokemon"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      </div>

      <button
        onClick={() => {
          console.log(collection[0]);
        }}
      >
        Debug
      </button>
      <Pagination
        pageSize={countPerPage}
        onChange={updatePage}
        current={currentPage}
        total={pokemonList.length}
      />
      <Container>
        {collection.map((value) => {
          return (
            <Card>
              <ImgContainer
                src={value.data.sprites.front_default}
                alt={value.name + " Image"}
              />
              <p>{value.name}</p>
            </Card>
          );
        })}
      </Container>
    </>
  );
};
export default PokemonList;
