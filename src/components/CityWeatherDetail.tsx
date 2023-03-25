import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { ArrowUp, X } from "react-bootstrap-icons";
import {
  rainCloud as rainCloudPng,
  sun as sunPng,
  humidity as humidPng,
  wind as windPng,
  snow as snowPng,
  rain as rainPng,
  cloud as cloudPng,
  cloudLightning as cloudLightningPng,
  windyWeather as windyWeatherPng,
  haze as hazePng,
  fog as fogPng,
  tornado as tornadoPng,
} from "../assets";

const convertKelToDegree = (value: number) => (value - 273.15).toFixed(0);
const convertKelToFeh = (value: number) =>
  ((value - 273.15) * (9 / 5) + 32).toFixed(0);

const WeatherAttributeCard = ({ title, imageUrl, value, unit }: any) => {
  return (
    <div className="col-12 p-2 border-2 border-white  bg-white bg-opacity-25 rounded weather-attribute-card">
      <div className="d-flex flex-column align-items-center">
        <img src={imageUrl} alt={title.toLowerCase()} className="my-3" />
        <span className="px-2 text-white fw-semibold m-0 _value_span">
          {value}
          {unit}
        </span>
      </div>
      <p className="text-center w-100 m-0 fw-semibold text-black-50 _title_p">
        {title}
      </p>
    </div>
  );
};

const InfoCard = ({
  data,
  clearDataCallback,
}: {
  data: any;
  clearDataCallback: Function;
}) => {
  const [tempIndex, setTempIndex] = useState(0);
  const { name: cityName, sys, main, weather, wind } = data || {};
  const { country } = sys || {};
  const { main: weatherStatus } = weather[0];
  var { feels_like, humidity, pressure, temp, temp_max, temp_min } = main;
  const { speed, deg } = wind;
  const tempUnits = [
    {
      term: "℉",
      curr_temp: convertKelToFeh(temp),
      feel_temp: convertKelToFeh(feels_like),
      units: {
        humidity: "%",
        wind: "m/hr",
      },
    },
    {
      term: "℃",
      curr_temp: convertKelToDegree(temp),
      feel_temp: convertKelToDegree(feels_like),
      units: {
        humidity: "%",
        wind: "m/s",
      },
    },
    {
      term: "K",
      curr_temp: temp.toFixed(0),
      feel_temp: feels_like.toFixed(0),
      units: {
        humidity: "%",
        wind: "m/s",
      },
    },
  ];

  var icon = "";
  switch (weatherStatus.toLowerCase()) {
    case "rain":
      icon = rainPng;
      break;
    case "snow":
      icon = snowPng;
      break;
    case "clear":
      icon = sunPng;
      break;
    case "clouds":
      icon = cloudPng;
      break;
    case "thunderstorm":
      icon = cloudLightningPng;
      break;
    case "drizzle":
      icon = rainCloudPng;
      break;
    case "mist":
      icon = fogPng;
      break;
    case "haze":
      icon = hazePng;
      break;
    case "fog":
      icon = fogPng;
      break;
    case "tornado":
      icon = tornadoPng;
      break;

    default:
      icon = cloudPng;
  }
  return (
    <div className="position-relative d-flex flex-grow-1 info-card">
      <div className="d-flex flex-grow-1 flex-column justify-content-center align-items-center mt-5 ">
        <span className="text-white _title">{`${tempUnits[tempIndex].curr_temp}${tempUnits[tempIndex].term}`}</span>
        <p className="text-white-50 m-0">{weatherStatus}</p>
        <div className="p-2">
          <img src={icon} alt={weatherStatus} />
        </div>
        <p className="px-2 text-white m-0 h5">{cityName}</p>
        <p className="text-white-50">{`Feels like ${tempUnits[tempIndex].feel_temp}${tempUnits[tempIndex].term}`}</p>
        <div className="col-12 row ">
          <div className="col-12 p-2 col-sm-6 ">
            <WeatherAttributeCard
              title={"HUMIDITY"}
              imageUrl={humidPng}
              value={humidity}
              unit={tempUnits[tempIndex].units.humidity}
            />
          </div>
          <div className="col-12 p-2 col-sm-6 ">
            <WeatherAttributeCard
              title={"WIND SPEED"}
              imageUrl={windPng}
              value={speed}
              unit={tempUnits[tempIndex].units.wind}
            />
          </div>
        </div>
      </div>
      <Button
        className=" position-absolute  top-0 start-0 border-0 fs-6 p-1 px-2 d-flex align-items-center"
        onClick={() => {
          setTempIndex(tempIndex >= 2 ? 0 : tempIndex + 1);
        }}
      >
        <span>{"Change Unit"}</span>
      </Button>
      <Button
        className=" position-absolute btn-danger rounded-circle p-1  cancel-button top-0 end-0 border-0 fs-6  d-flex align-items-center"
        onClick={() => {
          clearDataCallback();
        }}
      >
        <X
          className=""
          size={20}
          color="rgba(255,255,255,0.8)"
          // onClick={() => setSearchValue("")}
        />
      </Button>
    </div>
  );
};

const Loader = () => {
  return (
    <div className="d-flex flex-grow-1 justify-content-center align-items-center  gap-2">
      <div className="spinner-grow text-primary" role="status"></div>
      <div className="spinner-grow text-secondary" role="status"></div>
      <div className="spinner-grow text-success" role="status"></div>
      <div className="spinner-grow text-danger" role="status"></div>
      <div className="spinner-grow text-warning" role="status"></div>
    </div>
  );
};

const Error = ({ message }: { message: string }) => {
  const [errorMessage, error] = message.split("{BREAK}");
  return (
    <div className="d-flex flex-column flex-grow-1 justify-content-center align-items-center bg-white bg-opacity-50  gap-2">
      <p className="text-center text-black bg-opacity-50 px-2 px-md-4 ">
        {errorMessage}
      </p>
      <p className="text-center text-danger bg-opacity-50 fw-bold  px-2 px-md-4">
        {error}
      </p>
    </div>
  );
};

const Intro = () => {
  return (
    <div className="d-flex flex-column flex-grow-1 justify-content-center align-items-center">
      <div className="introIconContainer d-flex justify-content-center align-items-center">
        <ArrowUp size={44} color="rgba(255,255,255,0.8)" />
      </div>
      <p className="text-center px-2 px-md-4">
        Get weather information of any city. But first type in the city name in
        the search bar above
      </p>
    </div>
  );
};

const CityWeatherDetail = ({
  loading,
  data,
  error,
  clearDataCallback,
}: {
  loading: boolean;
  data: any;
  error: null | string;
  clearDataCallback: Function;
}) => {
  return (
    <div className="col col-12 d-flex flex-1 ">
      <Card className="col-12 bg-transparent border-0 flex-1">
        <Card.Body className={"city-detail-card d-flex flex-column"}>
          {loading && <Loader />}
          {!loading && error && <Error message={error} />}
          {!loading && data && !error && (
            <InfoCard
              data={data}
              clearDataCallback={() => clearDataCallback()}
            />
          )}
          {!loading && !error && !data && <Intro />}
        </Card.Body>
      </Card>
    </div>
  );
};

export default CityWeatherDetail;
