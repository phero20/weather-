import { useEffect, useState } from "react";
import "./App.css";
import dayImage from "./assets/after_noon.webp";
import nightImage from "./assets/night.png";
import Display from "./components/Display";
import React, { createContext } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import Nav from "./components/Nav";
export const BoxInfo = createContext();

function App() {
  const [weatherData, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchValue = (value) => {
    setSearchValue(value);
  };

  const getCoordinates = async () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        reject(new Error("Geolocation is not supported by this browser."));
      }
    });
  };
  function capitalizeFirstLetter(word) {
    if (!word || typeof word !== "string") {
      return word;
    }
    const firstLetter = word.charAt(0);
    if (firstLetter === firstLetter.toUpperCase()) {
      return word;
    }
    return firstLetter.toUpperCase() + word.slice(1);
  }

  const fetchapi = async (loc) => {
    try {
      setLoading(true);
      const api = import.meta.env.VITE_REACT_APP_NEWS_API;
      const url = `https://api.weatherapi.com/v1/forecast.json?key=${api}&q=${capitalizeFirstLetter(
        loc
      )}&aqi=yes&days=8`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await response.json();
      setWeather(data);

      const isDay = data.current.is_day;
      const backgroundImage = isDay ? dayImage : nightImage;
      const style = document.createElement("style");
      style.innerHTML = `
      body::before {
        content: "";
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url(${backgroundImage}) center/cover no-repeat;
        z-index: -1;
      }
    `;
      document.head.appendChild(style);
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchWeather = async () => {
      let loc;
      try {
        if (searchValue.trim() === "") {
          const coords = await getCoordinates();
          loc = `${coords.latitude},${coords.longitude}`;
        } else {
          loc = searchValue;
        }
        await fetchapi(loc);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      } finally {
      }
    };

    fetchWeather();
  }, [searchValue]);

  function isDayOrNight() {
    const currentHour = new Date().getHours();
    return currentHour >= 6 && currentHour <= 18 ? dayImage : nightImage;
  }

  if (loading) {
    return (
      <div
        className="w-screen h-screen"
        style={{
          backgroundImage: `url(${isDayOrNight()})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "brightness(.9)",
          transform: "scale(1.1)",
        }}
      >
        <div className="preloader" style={{ opacity: 1 }}>
          <svg
            version="1.1"
            id="sun"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            width="10px"
            height="10px"
            viewBox="0 0 10 10"
            enableBackground="new 0 0 10 10"
            xmlSpace="preserve"
            style={{ opacity: 1, marginLeft: 0, marginTop: 0 }}
          >
            <g>
              <path
                fill="none"
                d="M6.942,3.876c-0.4-0.692-1.146-1.123-1.946-1.123c-0.392,0-0.779,0.104-1.121,0.301
            c-1.072,0.619-1.44,1.994-0.821,3.067C3.454,6.815,4.2,7.245,5,7.245c0.392,0,0.779-0.104,1.121-0.301
            C6.64,6.644,7.013,6.159,7.167,5.581C7.321,5,7.243,4.396,6.942,3.876z M6.88,5.505C6.745,6.007,6.423,6.427,5.973,6.688
            C5.676,6.858,5.34,6.948,5,6.948c-0.695,0-1.343-0.373-1.69-0.975C2.774,5.043,3.093,3.849,4.024,3.312
            C4.32,3.14,4.656,3.05,4.996,3.05c0.695,0,1.342,0.374,1.69,0.975C6.946,4.476,7.015,5,6.88,5.505z"
              />
              <path
                fill="none"
                d="M8.759,2.828C8.718,2.757,8.626,2.732,8.556,2.774L7.345,3.473c-0.07,0.041-0.094,0.132-0.053,0.202
            C7.319,3.723,7.368,3.75,7.419,3.75c0.025,0,0.053-0.007,0.074-0.02l1.211-0.699C8.774,2.989,8.8,2.899,8.759,2.828z"
              />
              <path
                fill="none"
                d="M1.238,7.171c0.027,0.047,0.077,0.074,0.128,0.074c0.025,0,0.051-0.008,0.074-0.02l1.211-0.699
            c0.071-0.041,0.095-0.133,0.054-0.203S2.574,6.228,2.503,6.269l-1.21,0.699C1.221,7.009,1.197,7.101,1.238,7.171z"
              />
              <path
                fill="none"
                d="M6.396,2.726c0.052,0,0.102-0.026,0.13-0.075l0.349-0.605C6.915,1.976,6.89,1.885,6.819,1.844
            c-0.07-0.042-0.162-0.017-0.202,0.054L6.269,2.503C6.228,2.574,6.251,2.666,6.322,2.706C6.346,2.719,6.371,2.726,6.396,2.726z"
              />
              <path
                fill="none"
                d="M3.472,7.347L3.123,7.952c-0.041,0.07-0.017,0.162,0.054,0.203C3.2,8.169,3.226,8.175,3.25,8.175
            c0.052,0,0.102-0.027,0.129-0.074l0.349-0.605c0.041-0.07,0.017-0.16-0.054-0.203C3.603,7.251,3.513,7.276,3.472,7.347z"
              />
            </g>
          </svg>

          <svg
            version="1.1"
            id="cloud"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            width="10px"
            height="10px"
            viewBox="0 0 10 10"
            enableBackground="new 0 0 10 10"
            xmlSpace="preserve"
          >
            <path
              fill="none"
              d="M8.528,5.624H8.247c-0.085,0-0.156-0.068-0.156-0.154c0-0.694-0.563-1.257-1.257-1.257
          c-0.098,0-0.197,0.013-0.3,0.038C6.493,4.259,6.45,4.252,6.415,4.229C6.38,4.208,6.356,4.172,6.348,4.131
          C6.117,3.032,5.135,2.235,4.01,2.235c-1.252,0-2.297,0.979-2.379,2.23c-0.004,0.056-0.039,0.108-0.093,0.13
          C1.076,4.793,0.776,5.249,0.776,5.752c0,0.693,0.564,1.257,1.257,1.257h6.495c0.383,0,0.695-0.31,0.695-0.692
          S8.911,5.624,8.528,5.624z"
            />
          </svg>

          <div className="rain">
            {Array.from({ length: 10 }).map((_, index) => (
              <span key={index} className="drop"></span>
            ))}
          </div>

          {/* <div className="text">LOOKING OUTSIDE FOR YOU... ONE SEC</div> */}
        </div>
      </div>
    );
  }

  const country = weatherData.location.country;

  const presentT = weatherData.location.localtime;
  const tempC = `${Math.ceil(weatherData.current.temp_c)} °C`;
  const condition = weatherData.current.condition.text;
  const conditionImage = weatherData.current.condition.icon;
  const city = weatherData.location.name;
  
  const state = weatherData.location.region;
  const dateObj = new Date(weatherData.location.localtime);
  const day = dateObj.toLocaleString("en-US", { weekday: "short" });
  const date = dateObj.getDate(); // e.g., 11
  const month = dateObj.toLocaleString("en-US", { month: "short" });
  const formattedDate = `${day}, ${date} ${month}`;
  const isDay = weatherData.current.is_day;
  const rainChances = `${weatherData.forecast.forecastday[0].day.daily_chance_of_rain}%`;
  const rainChancesImg = weatherData.forecast.forecastday[0].day.condition.icon;
  const rainChancestext =
    weatherData.forecast.forecastday[0].day.condition.text;
  const windSpeed = `${Math.ceil(weatherData.current.wind_kph)} kph`;
  const humidity = `${weatherData.current.humidity}%`;
  const air_quality = `${weatherData.current.air_quality["us-epa-index"]}`;
  const uv = `${weatherData.current.uv}`;
  const precip = `${weatherData.current.precip_mm}%`;
  const hourly = weatherData.forecast.forecastday[0].hour;
  const forcast = weatherData.forecast.forecastday;
  const backgroundImage = isDay ? dayImage : nightImage;
  const contextValue = {
    tempC,
    condition,
    conditionImage,
    city,
    formattedDate,
    isDay,
    rainChances,
    rainChancesImg,
    rainChancestext,
    windSpeed,
    humidity,
    air_quality,
    uv,
    precip,
    hourly,
    forcast,
    backgroundImage,
    state,
    presentT,
    country,
  };

  return (
    <BoxInfo.Provider value={contextValue}>
      <div className="relative w-full min-h-screen">
        <Nav onSearchChange={handleSearchValue} />
        <Display />
      </div>
    </BoxInfo.Provider>
  );
}

export default App;
