import React from "react";
import "rc-pagination/assets/index.css";
import styled from "@emotion/styled";

import { FormatMove } from "../utils/FormatMove";

const tableHead = {
  name: "Moves Learnt",
};

const MoveLearnt = (props) => {
  const { moves } = props;
  const [pokemonMoves, setPokemonMoves] = React.useState([]);

  React.useEffect(() => {
    setPokemonMoves(moves);
  }, [moves]);

  const tableRows = (rowData) => {
    const { key, index } = rowData;
    const tableCell = Object.keys(tableHead);
    const columnData = tableCell.map((i) => {
      return <Td key={i}>{FormatMove(key.move.name)}</Td>;
    });

    return <Tr key={index}>{columnData}</Tr>;
  };

  const tableData = () => {
    if (pokemonMoves.length > 1) {
      return pokemonMoves.map((key, index) => tableRows({ key, index }));
    } else
      return (
        <Tr key={"none"}>
          <Td>Coming soon.</Td>
        </Tr>
      );
  };

  const headRow = () => {
    return Object.values(tableHead).map((title, index) => (
      <Td key={index}>{title}</Td>
    ));
  };

  const Table = styled.table`
    box-shadow: 0 1px 2px 0 #e0e0e0;
    width: 100%;
    padding: 1em;
    margin: 10px 0;
    border-collapse: collapse;
  `;

  const TableHead = styled.thead`
    background-color: #e0e0e0;
    font-size: 20px;
    font-weight: bold;
  `;

  const Td = styled.td`
    text-align: left;
    padding: 8px;
  `;
  const Tr = styled.tr`
    text-align: left;
    padding: 8px;
  `;

  return (
    <>
      {moves !== undefined && (
        <Table>
          <TableHead>
            <Tr>{headRow()}</Tr>
          </TableHead>
          <tbody className="trhover">{tableData()}</tbody>
        </Table>
      )}
    </>
  );
};
export default MoveLearnt;
