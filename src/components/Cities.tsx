import * as React from "react";
import Table from "react-bootstrap/Table";
import City from "./City";
import "../styles/Cities.css";

function Cities(props) {

    return (
        <Table striped bordered hover className={"countries"}>
            <thead><tr><th>City</th><th>Geolocation</th><th>Country</th><th>Action</th></tr></thead>
            <tbody>
                {props.list.map(element => <City key={element.id}
                    id={element.id}
                    name={element.name}
                    geo={[element.coord.lat, element.coord.lon]}
                    country={element.country === "US" ? element.country + ", " + element.state : element.country}
                    func={props.func}
                 />)}
            </tbody>
        </Table>
    );
}

export default Cities;

/*
    type CurrencyType = {
        code: string,
        name: string,
        symbol: string
    }

    type CountryType = {
        name: string,
        capital: string,
        alpha3Code: string,
        currencies: Array<CurrencyType>
    }

    type ResType = {
        data: Array<object>
    }
type Coord = {
    lon: number,
    lat: number
}

type CityType = {
    "id": number,
    "name": string,
    "state": string,
    "country": string,
    "coord": Coord
*/


//import { string } from "prop-types";

//const [list, setList] = React.useState([])

    /*
    if(!countries.length){
        axios.get("https://restcountries.com/v2/all").then((res : ResType) => {
            console.log(res);
            setCountries(res.data);
        });
    }
    */

    //import axios from "axios";
