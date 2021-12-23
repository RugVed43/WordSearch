import { Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { Col, Container, FormControl, InputGroup, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Grid from "../components/Grid";

const Home = (props) => {
  const history = useHistory();
  const [gridData, setgridData] = useState(false);
  const [rowValue, setRowValue] = useState(0);
  const [columnsValue, setColumnsValue] = useState(0);

  function handleClick() {
    if (!isNaN(rowValue) && !isNaN(columnsValue)) {
      setgridData(true);
    }
  }

  return (
    <>
      <Container>
        <div
          style={{
            textAlign: "center",
          }}
        >
          <h1>Mobigic Test</h1>
        </div>
        <Row style={{ margin: 100 }}>
          <Col></Col>
          <Col xs={6}>
            <div>
              <InputGroup className="mb-3">
                <InputGroup.Text id="rowNumbers">
                  Enter no of rows
                </InputGroup.Text>
                <FormControl
                  placeholder=""
                  name="rows"
                  onChange={(e) => setRowValue(e.target.value)}
                  aria-label=""
                  aria-describedby="rowNumbers"
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text id="colNumbers">
                  Enter no of columns
                </InputGroup.Text>
                <FormControl
                  placeholder=""
                  name="columns"
                  onChange={(e) => {
                    if (!isNaN(e.target.value)) {
                      setColumnsValue(e.target.value);
                    } else {
                      alert("Only numbers Allowed");
                    }
                  }}
                  aria-label=""
                  aria-describedby="colNumbers"
                />
              </InputGroup>
              <Button onClick={handleClick}>Create Grid</Button>
            </div>
          </Col>
          <Col></Col>
        </Row>
        {gridData ? <Grid rows={rowValue} columns={columnsValue} /> : null}
      </Container>
    </>
  );
};

export default Home;
