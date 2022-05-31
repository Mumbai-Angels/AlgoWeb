// @ts-nocheck
import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import "./App.css";
import { ALGO, MULTIFORM } from "components/questions.js";

function App() {
  let algo = ALGO;
  const uri = process.env.REACT_APP_WEBHOOK_URL;

  let question = (name, index, expected) => {
    return (
      <Form.Group className="mb-3" controlId={"formBasic" + name}>
        <Form.Label>{name}</Form.Label>
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

    weights = weights
      .concat(algo["layer1"]["weights"])
      .concat(algo["layer2"]["weights"])
      .concat(algo["layer3"]["weights"]);

    for (var i = 1; i <= data.length; i++) {
      questions.push(`q${i}`);
    }

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

    tmpdata["temp1"] = "";
    tmpdata["temp2"] = "";

    tmpdata["name"] = name;
    tmpdata["score"] = parseInt(ans);
    tmpdata["form"] = form;

    let text = new Date().toLocaleString();
    tmpdata["timestamp"] = text;
    console.log(tmpdata);
    if (!ans) {
      alert("Empty fields detected, please fill them in");
      return;
    }
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

  let sectors = [
    "Blockchain/Fintech",
    "Content/Gaming",
    "DeepTech",
    "EV - Charging",
    "Platform - B2B",
    "Product - B2C",
    "Platform - B2C",
    "Ed - Tech",
  ];

  const [data, setData] = useState(Array(temp.length).fill(""));
  const [score, setSubmit] = useState(false);
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [form, setForm] = useState("Platform - B2C");

  return (
    <>
      {pass !== "1234" ? (
        <Container style={{ maxWidth: "60rem", marginTop: "40vh" }}>
          <h4>Select Form</h4>
          <DropdownButton id="dropdown-basic-button" title={form}>
            {sectors.map((item) => {
              return (
                <Dropdown.Item
                  onClick={(evt) => {
                    setForm(evt.target.innerText);
                    algo["layer1"] = MULTIFORM[evt.target.innerText];
                    console.log(algo);
                    console.log(MULTIFORM);
                  }}
                >
                  {item}
                </Dropdown.Item>
              );
            })}
          </DropdownButton>

          <Row style={{ margin: 10 }}></Row>

          <h4>Enter Password</h4>

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
          <Row>
            <h1 style={{ textAlign: "center", margin: 50 }}>
              {form} Algo Site
            </h1>
            <Col>
              <Button
                onClick={() => {
                  setPass("");
                }}
              >
                Go back
              </Button>
            </Col>
          </Row>
          <div className="App">
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3" controlId={"formBasic Name"}>
                <Form.Label>Name of the Company</Form.Label>
                <Form.Control
                  placeholder=""
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
