
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button, Form, Row, Col } from "react-bootstrap";
import React, { useState } from "react";
import { setWeatherData } from "./store";
import { useSelector, useDispatch } from "react-redux";
import "./App.css"

export default function App() {
  const dispatch = useDispatch();
  const [city, setCity] = useState("");
  // const [data, setData] = useState(null);

  const data = useSelector((state) => state.reducer.weatherdata || null);

  const apiKey = "24a7bd87cc236bbb758b9e81dac1ae3c";
  const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  const getWeatherData = () => {
    fetch(api)
      .then((json) => json.json())
      .then((res) => {
        console.log(res);
        dispatch(setWeatherData(res));
      })
      .catch((error) => {
        console.log("error=>", error);
        dispatch(setWeatherData(null));
      });
  };
  return (
    <div className="App " >
      <Card className="text-center mt-5 p-3 ">
        <h2>Weather App </h2>
        <Form className="text-center mt-4">
          <Row className="align-items-center ms-4">
            <Col xs="auto" className="lanel">
              <Form.Label htmlFor="inlineFormInput">City</Form.Label>
              <Form.Control
                className="mb-2"
                id="inlineFormInput"
                placeholder="Enter City"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              />
            </Col>
            <Col xs="auto">
              <Button type="button" className="mt-3" onClick={getWeatherData}>
                Search
              </Button>
            </Col>
          </Row>
        </Form>
        {data?.cod === 200 ? (
          <Card.Body>
            <Card.Text>Weather Details of City : {data.name}</Card.Text>
            <Card.Text>
              <p>Current Temperature : {data.main.temp} °C</p>
            </Card.Text>
            <Card.Text>
              <p>
                Temperature Range : {data.main.temp_min} °C to{" "}
                {data.main.temp_max} °C
              </p>
            </Card.Text>
            <Card.Text>
              <p>Humidity : {data.main.humidity}</p>
            </Card.Text>
          </Card.Body>
        ) : (
          <h3>{data ? data.message : null}</h3>
        )}
      </Card>
    </div>
  );
}
