import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import Loader from "./components/Loader";
import Weather from "./components/Weather";

function App() {
  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState();
  const [temp, setTemp] = useState();

  let background = "";

  switch (weather?.weather[0].icon) {
    case "01d":
      background = "bg-[url('/images/bg6.jpg')]";
      break;
    case "02d":
      background = "bg-[url('/images/bg1.jpg')]";
      break;
    case "03d":
      background = "bg-[url('/images/bg1.jpg')]";
      break;
    case "04d":
      background = "bg-[url('/images/bg13.jpg')]";
      break;
    case "09d":
      background = "bg-[url('/images/bg5.jpg')]";
      break;
    case "10d":
      background = "bg-[url('/images/bg7.jpg')]";
      break;
    case "11d":
      background = "bg-[url('/images/bg8.jpg')]";
      break;
    case "13d":
      background = "bg-[url('/images/bg10.jpg')]";
      break;
    case "50d":
      background = "bg-[url('/images/bg12.jpg')]";
      break;
    case "01n":
      background = "bg-[url('/images/bg2.jpg')]";
      break;
    case "02n":
      background = "bg-[url('/images/bg2.jpg')]";
      break;
    case "03n":
      background = "bg-[url('/images/bg3.jpg')]";
      break;
    case "04n":
      background = "bg-[url('/images/bg3.jpg')]";
      break;
    case "09n":
      background = "bg-[url('/images/bg5.jpg')]";
      break;
    case "10n":
      background = "bg-[url('/images/bg1.jpg')]";
      break;
    case "11n":
      background = "bg-[url('/images/bg9.jpg')]";
      break;
    case "13n":
      background = "bg-[url('/images/bg11.jpg')]";
      break;
    case "50n":
      background = "bg-[url('/images/bg13.jpg')]";
      break;
    default:
      background = "";
  }

  const success = (pos) => {
    const currentCoords = {
      lat: pos.coords.latitude,
      lon: pos.coords.longitude,
    };
    setCoords(currentCoords);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  useEffect(() => {
    if (coords) {
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=712cf86ace9fb0d1723e216be6b91630`;

      axios
        .get(URL)
        .then((res) => {
          setWeather(res.data);
          const celsius = (res.data.main.temp - 273.15).toFixed(1);
          const fahrenheit = (celsius * (9 / 5) + 32).toFixed(1);
          const newTemps = {
            celsius,
            fahrenheit,
          };
          setTemp(newTemps);
        })
        .catch((err) => console.log(err));
    }
  }, [coords]);

  return (
    <div
      className={`App grid place-content-center min-h-screen ${background} bg-cover px-2`}
    >
      {weather ? <Weather weather={weather} temp={temp} /> : <Loader />}
    </div>
  );
}

export default App;
