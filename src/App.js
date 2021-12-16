// @ts-nocheck
import React, { useState } from "react";
import { Form, Button, Container, Row } from "react-bootstrap";
import "./App.css";
import ALGO from "components/questions.js";

function App() {
  let algo = ALGO;
  const uri = "https://hook.integromat.com/7vj6pukiguliam4bmjmwp3bwor1ncbzj";

  let question = (name, index, expected) => {
    return (
      <Form.Group className="mb-3" controlId={"formBasic" + name}>
        <Form.Label>{name}</Form.Label>
        {expected === "1" ? (
          <Form>
            <div key="inline-radio" className="mb-3">
              <Form.Check inline type="radio" id={`Yes`} label={`Yes`} />
              <Form.Check inline type="radio" label={`No`} id={`No`} />
            </div>
          </Form>
        ) : (
          <Form.Control
            placeholder=""
            value={data[index]}
            onChange={(event) => {
              return setData([
                ...data.slice(0, index),
                event.target.value,
                ...data.slice(index + 1),
              ]);
            }}
          />
        )}
      </Form.Group>
    );
  };

  function formgen(layer) {
    let name = algo[layer]["questions"];
    let expected = algo[layer]["expected"];
    const offset = layer === "layer1" ? 0 : layer === "layer2" ? 5 : 9;
    return name.map((elem, index) => {
      return question(elem, offset + index, expected[index]);
    });
  }

  let onSubmit = (event) => {
    event.preventDefault();
    let expected = temp;

    let weights = [];
    let questions = [];
    questions = questions
      .concat(algo["layer1"]["questions"])
      .concat(algo["layer2"]["questions"])
      .concat(algo["layer3"]["questions"]);
    weights = weights
      .concat(algo["layer1"]["weights"])
      .concat(algo["layer2"]["weights"])
      .concat(algo["layer3"]["weights"]);

    let ans = data
      .map((elem, index) => {
        return (
          Math.min(
            parseFloat(elem.replace(/[^\d\.]*/g, "")) /
              parseFloat(expected[index]),
            1
          ) * parseInt(weights[index])
        );
      })
      .reduce((a, b) => a + b, 0);

    setSubmit(parseInt(ans));

    let tmpdata = {};

    questions.forEach((elem, index) => {
      tmpdata[elem] = data[index].replace(/[^\d\.]*/g, "");
    });
    tmpdata["name"] = name;
    tmpdata["score"] = parseInt(ans);

    fetch(uri, {
      body: JSON.stringify(tmpdata),
      credentials: "same-origin",
      headers: {
        "content-type": "application/json",
        "Access-Control-Request-Headers": "*",
        "api-key": "61b838eb08357b3a666a7834",
        "Access-Control-Allow-Origin": "*",
      },
      method: "POST",
      mode: "no-cors",
      redirect: "follow",
      referrer: "no-referrer",
    }).catch((err) => {
      console.log(err);
    });
  };

  let temp = [];

  temp = temp
    .concat(algo["layer1"]["expected"])
    .concat(algo["layer2"]["expected"])
    .concat(algo["layer3"]["expected"]);

  const [data, setData] = useState(Array(temp.length).fill(""));
  const [score, setSubmit] = useState(false);
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");

  return (
    <>
      {pass !== "1234" ? (
        <Container style={{ maxWidth: "60rem", marginTop: "40vh" }}>
          <Form.Label>Enter Password</Form.Label>
          <Form.Control
            placeholder=""
            value={pass}
            onChange={(event) => {
              return setPass(event.target.value);
            }}
          />
        </Container>
      ) : (
        <Container>
          <h1 style={{ textAlign: "center", margin: 50 }}>
            B2C Product Algo Site
          </h1>
          <div className="App">
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3" controlId={"formBasic Name"}>
                <Form.Label>Name of the Company</Form.Label>
                <Form.Control
                  placeholder="Name"
                  value={name}
                  onChange={(event) => {
                    return setName(event.target.value);
                  }}
                />
              </Form.Group>
              {formgen("layer1")}
              {formgen("layer2")}
              {formgen("layer3")}

              <Button variant="primary" type="submit">
                Submit
              </Button>
              <div className="mt-3">
                <h3>Score: {!score ? "" : score}</h3>
              </div>
            </Form>
          </div>
        </Container>
      )}
    </>
  );
}

export default App;
