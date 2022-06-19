import * as React from "react";
import Button from "react-bootstrap/Button";
import "../styles/City.css";

function conv(x: number, type: string) {
    let ax = Math.abs(x);
    let deg = Math.trunc(ax);
    let min = Math.floor(60 * (ax - deg));
    let sec = (3600  * (ax - deg) - 60 * min).toFixed(3);
    let typ = type === 'lat' ? x >= 0 ? 'N' : 'S' : x > 0 ? 'E' : 'W';

    return (`${typ} ${deg}° ${min}′ ${sec}″`);
}

function onClickLocal(func, id, type){
    func(id, type);
    return null;
}

function City({ id, name, geo, country, func }) {
    return (
        <tr>
            <td>{name}</td>
            <td>{conv(geo[0], 'lat')}<br />{conv(geo[1], 'lon')}</td>
            <td>{country}</td>
            <td>
            <Button variant="primary" onClick={() => onClickLocal(func, id, "minutely")}>Now</Button> &nbsp;
            <Button variant="success" onClick={() => onClickLocal(func, id, "hourly")}>Two days</Button> &nbsp;
            <Button variant="info" onClick={() => onClickLocal(func, id, "daily")}>Week</Button>
            </td>
        </tr>
    );
}

City.defaultProps = {
    capital: "Not Available"
}

export default City;
