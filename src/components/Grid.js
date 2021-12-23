import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Col,
  Container,
  FormControl,
  InputGroup,
  Row,
  Table,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default function Grid({ rows, columns }) {
  const history = useHistory();
  // Table
  const [tableCellsData, setTableCellsData] = useState();
  const [tableArrayData, setTableArrayData] = useState([[]]);
  const [tableArrayPosition, setTableArrayPosition] = useState([[]]);
  const ref = useRef(null);

  const getUniqueKeyFromArrayIndex = (rowNum, columnNum) => {
    return `${rowNum}-${columnNum}`;
  };

  useEffect(() => {
    // console.log(tableArrayData);
  }, [tableCellsData]);

  const onChangeHandler = (e) => {
    setTableCellsData({
      ...tableCellsData,
      [e.target.name]: e.target.value,
    });
    let [row, col] = e.target.name.split("-");

    row = parseInt(row);
    col = parseInt(col);
    if (!tableArrayData[row]) {
      tableArrayData[row] = [];
      tableArrayData[row].push([]);
    }
    if (!tableArrayPosition[row]) {
      tableArrayPosition[row] = [];
      tableArrayPosition[row].push([]);
    }

    tableArrayData[row][col] = e.target.value.toUpperCase();
    tableArrayPosition[row][col] = `${row},${col}`;
  };

  const generateTable = () => {
    let table = [];
    // Outer loop to create parent
    for (let i = 0; i < rows; i++) {
      let children = [];
      //Inner loop to create children
      for (let j = 0; j < columns; j++) {
        children.push(
          <td>
            <input
              maxLength="1"
              style={{ width: "50px" }}
              name={getUniqueKeyFromArrayIndex(i, j)}
              onChange={onChangeHandler}
            />
          </td>
        );
      }
      table.push(<tr key={i}>{children}</tr>);
    }
    return table;
  };
  function submitGrid() {
    // console.log(tableArrayPosition);
    history.push({
      pathname: "/board",
      state: {
        board: tableArrayData,
        row: rows,
        col: columns,
        boardPos: tableArrayPosition,
      },
    });
  }
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h5>Enter Grid</h5>
        <div className={"TableContainer"}>
          <Container>
            <Table
              aria-label="simple table"
              style={{ width: "auto", margin: "15px auto" }}
            >
              <tbody ref={ref}>{generateTable()}</tbody>
            </Table>
            <Button onClick={submitGrid}>Submit</Button>
          </Container>
        </div>
      </div>
    </>
  );
}
