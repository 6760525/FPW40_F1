import React from "react";

import Search from "./Search";
import Cities from "./Cities";
import Weather from "./Weather";
import geoData from "../../data/city_list.json";

import "../styles/App.css";
//import { getHooks } from "html-webpack-plugin";

function App() {
    const [cityList, setCityList] = React.useState([]);
    const [wData, setWeatherData] = React.useState([]);
    const [weatherType, setWeatherType] = React.useState("");
    const [cityId, setCityId] = React.useState("");
    const [tempMeasure, setTemp] = React.useState(false);

    //const API_KEY = '3b089ec2b2c54f2bdd718fcef052b7df';
    const API_KEY = '4a51b76ea653415bb41003f2381a167a';
        
    function GetWeather(coord) {

        let minutes = {};
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&units=metric&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => setWeatherData(data))
        .catch(err => console.log(`Unable to use API: ${err}`));
    }

    function onChange(event) {
        let list = (geoData as Array<any>).filter(city => city.name.toLowerCase().startsWith(event.target.value.toLowerCase()));

        if (list.length === 0)
            list = (geoData as Array<any>).filter(city => city.name.toLowerCase().includes(event.target.value.toLowerCase()));
        
        list = list.slice(0, Math.min(25, list.length));

        setWeatherData([]);
        setCityList(list);
    }

    function onClick(id, type) {
        let list = (geoData as Array<any>).filter(city => city.id === id);

        setCityList(list);
        GetWeather(list[0].coord);

        setCityId(id);
        setWeatherType(type);
    }

    function onTempChange() {
        setTemp(!tempMeasure);
    }

    return (
        <>
            <header>Weather ({tempMeasure ? "Celsius" : "Fahrenheit"})</header>
            <Search onChange = {onChange} onTempChange = {onTempChange} />
            <Cities list={cityList} func={onClick} />
            <Weather data={wData} view={weatherType} measure={tempMeasure} />
        </>
    );
}

export default App;


/*    type Coord = {
        lon: number,
        lat: number
    }
    
    type CityType = {
        "id": number,
        "name": string,
        "state": string,
        "country": string,
        "coord": Coord
    }
*/