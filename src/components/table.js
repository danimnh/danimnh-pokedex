import React from "react";
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import styled from "@emotion/styled";

// import { allData } from "./constants";

const tableHead = {
  name: "Pokemon Name",
};

const Table = (props) => {
  const { pokemonList } = props;
  const countPerPage = 10;
  const [value, setValue] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [collection, setCollection] = React.useState(
    cloneDeep(pokemonList.slice(0, countPerPage))
  );
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

  const Card = styled.div`
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    margin: 10px;
    width: 200px;
  `;
  React.useEffect(() => {
    if (!value) {
      updatePage(1);
    } else {
      searchData.current(value);
    }
    console.log("value");
    console.log(value);
  }, [value]);

  const updatePage = (p) => {
    setCurrentPage(p);
    const to = countPerPage * p;
    const from = to - countPerPage;
    setCollection(cloneDeep(pokemonList.slice(from, to)));
  };

  const tableRows = (rowData) => {
    const { key, index } = rowData;
    const tableCell = Object.keys(tableHead);
    const columnData = tableCell.map((keyD, i) => {
      return <td key={i}>{key[keyD]}</td>;
    });

    return <tr key={index}>{columnData}</tr>;
  };

  const tableData = () => {
    return collection.map((key, index) => tableRows({ key, index }));
  };

  const headRow = () => {
    return Object.values(tableHead).map((title, index) => (
      <td key={index}>{title}</td>
    ));
  };

  return (
    <>
      <div class="search">
        <input
          placeholder="Search Pokemon"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <button
        onClick={() => {
          console.log(collection);
        }}
      >
        asd
      </button>
      <div
        className="container"
        style={{
          justifyContent: "center",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {collection.map((value) => {
          return (
            <Card>
              <p>{value.name}</p>
            </Card>
          );
        })}
      </div>

      {/* <table>
        <thead>
          <tr>{headRow()}</tr>
        </thead>
        <tbody className="trhover">{tableData()}</tbody>
      </table> */}
      <Pagination
        pageSize={countPerPage}
        onChange={updatePage}
        current={currentPage}
        total={pokemonList.length}
      />
    </>
  );
};
export default Table;
