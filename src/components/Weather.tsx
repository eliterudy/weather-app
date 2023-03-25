import { CitySearchForm, CityWeatherDetail } from "./index";
import React, { useState, useEffect } from "react";
const Weather = () => {
  const [input, setInput] = useState<string>("");
  const [weatherInfo, setWeatherInfo] = useState<null | any>(null);
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (input && input.length > 0) fetchFromApi(input);
  }, [input]);

  const fetchFromApi = async (input: string) => {
    await setError(null);
    await setIsLoading(true);
    setTimeout(async () => {
      try {
        var response = await fetch(
          `${
            import.meta.env.VITE_ASGN_5_API_URL
          }/data/2.5/weather?q=${input}&appid=${
            import.meta.env.VITE_ASGN_5_API_KEY
          }`
        );

        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        console.log(data);
        await setWeatherInfo(data);
      } catch (error: any) {
        await setError(
          `We faced an error while trying to fetching the weather data for city called "${input}".{BREAK}Reason: ` +
            error.message
        );
        await setWeatherInfo(null);
      }
      await setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="col col-12 pt-4 pt-sm-5   d-flex d-sm-block flex-column flex-grow-1 ">
      <h1 className="weather-title text-center">Weather App</h1>
      <div className="offset-0 offset-sm-2 offset-md-3 offset-lg-4 col-12 col-sm-8 col-md-6 col-lg-4 mt-2  ">
        <CitySearchForm
          callApi={(value: string) => {
            console.log("val", value);
            setInput(value);
          }}
        />
      </div>

      <div className="offset-0 offset-sm-2 offset-md-3 offset-lg-4 col-12 col-sm-8  col-md-6  col-lg-4 mt-2 flex-grow-1 d-flex d-sm-block py-4">
        <CityWeatherDetail
          loading={isLoading}
          data={weatherInfo}
          error={error}
          clearDataCallback={() => {
            setWeatherInfo(null);
            setIsLoading(false);
            setError(null);
            setInput("");
          }}
        />
      </div>
    </div>
  );
};

export default Weather;
