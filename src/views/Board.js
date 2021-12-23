import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  FormControl,
  InputGroup,
  Row,
  Table,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Board = () => {
  const { location } = useHistory();
  const boardData = Object.values(location.state);
  const [word, setWordValue] = useState(0);
  const [wordPos, setwordPos] = useState([]);
  const boardPos = boardData[3];
  const [wordFound, setwordFound] = useState(false);
  const [highlight, sethighlight] = useState(false);

  //   console.log(boardData);
  const board = boardData[0];
  let R = boardData[1];
  let C = boardData[2];
  // Rows and columns in the given board

  // For searching in all 8 direction
  let x = [0, 1, 1];

  let y = [1, 0, 1];

  let len = word.length;
  // This function searches in all
  // 8-direction from point
  // (row, col) in board[][]
  function search2D(board, row, col, word) {
    // If first character of word
    // doesn't match with
    // given starting point in board.
    if (board[row][col] != word[0]) return false;

    // Search word in all 8 directions
    // starting from (row, col)
    for (let dir = 0; dir < 3; dir++) {
      // Initialize starting point
      // for current direction
      let k,
        rd = row + x[dir],
        cd = col + y[dir];

      // First character is already checked,
      // match remaining characters
      for (k = 1; k < len; k++) {
        // If out of bound break
        if (rd >= R || rd < 0 || cd >= C || cd < 0) break;

        // If not matched, break
        if (board[rd][cd] != word[k]) break;

        // Moving in particular direction
        rd += x[dir];
        cd += y[dir];
      }

      // If all character matched,
      // then value of must
      // be equal to length of word
      if (k == len) {
        let tx = x[dir],
          ty = y[dir],
          tlen = len - 1;
        if (tx == 1 && ty == 0) {
          console.log("Direction South");
          let tmp = [];
          for (let i = 0; i < word.length; i++) {
            tmp.push(`${+row + i},${col}`);
          }
          console.log(tmp, word.length, `${row},${+col + 1}`);
          setwordPos(tmp);
          // setwordPos(`${row + tlen},${col}`);
        }
        if (tx == 0 && ty == 1) {
          console.log("Direction East");
          let tmp = [];
          for (let i = 0; i < word.length; i++) {
            tmp.push(`${row},${+col + i}`);
          }
          // console.log(tmp, word.length, `${row},${+col + 1}`);
          setwordPos(tmp);
          // let word = board[row][col];
          // let word2 = board[row][+col + 1];
          // let word3 = board[row][+col + 2];
          console.log(wordPos);
          // setwordPos(`${row + tlen},${col}`);
        }
        if (tx == 1 && ty == 1) {
          console.log("Direction SouthEast");
          let tmp = [];
          for (let i = 0; i < word.length; i++) {
            tmp.push(`${+row + i},${+col + i}`);
          }
          console.log(tmp, word.length, `${row},${+col + 1}`);
          setwordPos(tmp);
          // setwordPos(`${row + tlen},${col}`);
        }
        return true;
      }
    }
    setwordFound(false);
    return false;
  }
  function searchword() {
    for (let row = 0; row < R; row++) {
      for (let col = 0; col < C; col++) {
        if (search2D(board, row, col, word)) {
          console.log("pattern found at " + row + ", " + col, board);
          setwordFound(true);
        }
      }
    }
  }

  return (
    <>
      <Container>
        <Row>
          <h1>Board</h1>
          <Table
            style={{ width: "auto", textAlign: "center", margin: "0 auto" }}
          >
            <tbody>
              {board.map((d, i) => {
                return (
                  <tr>
                    {d.map((dd, di) => {
                      return (
                        <td
                          style={{
                            width: "50px",
                            borderColor: "black",
                            borderStyle: "solid",
                            borderWidth: 1,
                            backgroundColor: wordPos.includes(`${i},${di}`)
                              ? "yellow"
                              : "white",
                          }}
                        >
                          {dd}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Row>
        <Row style={{ margin: "50px 0", textAlign: "center" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <input
              style={{ width: "-webkit-fill-available", marginBottom: 15 }}
              name="word"
              onChange={(e) => setWordValue(e.target.value.toUpperCase())}
            />
            <Button onClick={searchword}>Submit</Button>
            <h1>{wordFound ? "Word Found" : "Word Not Found"}</h1>
          </Col>
        </Row>
        <Row>
          <Link to="/">
            <Button>Reset Grid</Button>
          </Link>
        </Row>
      </Container>
    </>
  );
};

export default Board;
