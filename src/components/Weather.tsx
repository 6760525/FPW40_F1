import * as React from "react";
import Table from "react-bootstrap/Table";
import "../styles/Weather.css";

function Weather(props) {

    const columns_m = 10;
    const columns_h = 6;
    const columns_d = 4;

    
    function timeConv(ts, format) {
        const dt = new Date(ts * 1000);
        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

        let day = weekday[dt.getDay()];
        let mon = dt.getMonth();
        let month = months[mon];
        let year = dt.getFullYear();
        let date = dt.getDate();
        let hour  = dt.getHours();
        let min = dt.getMinutes();
        let sec = dt.getSeconds();

        let ampm = hour < 12 ? "AM" : "PM";
        let hour0 = hour < 10 ? "0" + hour : hour;
        let min0 = min < 10 ? "0" + min : min;
        let sec0 = sec < 10 ? "0" + sec : sec;

        let res = "";

        switch(format) {
            case 'HHMM':
                res = hour + ":" + min0;
                break;
            case 'DDHH':
                res =  hour0 + ':' + min0;
                break;
            case 'DOW':
                res = mon + '/' + date + ' (' +  day + ')';
                break;
            default:
                res = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
          }

        return res;
    }

    function CorF(t, s) {
        if (s)
            return(t.toFixed(0) + "°C")
        else
            return((32.0 + 9.0 * t / 5.0).toFixed(0) + "°F");
    }
    
    function listToMatrix(list, elementsPerSubArray) {
        var matrix = [], i, k;
    
        for (i = 1, k = -1; i < list.length; i++) {
            if ((i-1) % elementsPerSubArray === 0) {
                k++;
                matrix[k] = [];
            }
    
            matrix[k].push(list[i]);
        }
    
        return matrix;
    }

    if (props.data[props.view] == undefined) return(<></>);
    if (props.data.length === 0) return(<></>);

    if (props.view === 'minutely'){
        return (
            <Table striped bordered hover className={"minutes"}>
                <thead><tr><th colSpan={columns_m}>The next hour precipitation volume, mm</th></tr></thead>
                <tbody>
                    {listToMatrix(props.data[props.view], columns_m).map((row, i) => (
                    <tr key={i}>
                        {row.map((col, j) => (
                          <td key={j}>
                            <span>{timeConv(col.dt, 'HHMM')}</span><br />
                            <span><b>{col.precipitation === 0 ? "-" : col.precipitation.toFixed(2)}</b></span>
                          </td>
                        ))}
                    </tr>
                    ))}
                </tbody>
            </Table>);
    }

    if (props.view === 'hourly'){
        return (
            <Table striped bordered hover className={"hours"}>
                <thead><tr><th colSpan={columns_h}>The next 48 hours weather forecast</th></tr></thead>
                <tbody>
                    {listToMatrix(props.data[props.view], columns_h).map((row, i) => (
                    <tr key={i}>
                        {row.map((col, j) => (
                          <td key={j}>
                            {timeConv(col.dt, 'DOW')}<br />
                            <b className="time">{timeConv(col.dt, 'DDHH')}</b><br />
                            Temp: <b>{CorF(col.temp, props.measure)}</b><br />
                            Pressure: {(0.7501*col.pressure).toFixed(0)} mmHg<br />
                            Humidity: {col.humidity}%<br />
                            Cloudiness: {col.clouds}%<br />
                            Wind: {parseInt(col.wind_speed)} m/s<br />
                            Precipitation: {(100*col.pop).toFixed(0)}%
                          </td>
                        ))}
                    </tr>
                    ))}
                </tbody>
            </Table>);
    }

    if (props.view === 'daily'){
        return (
            <Table striped bordered hover className={"days"}>
                <thead><tr><th colSpan={columns_d}>The next 7 days weather forecast</th></tr></thead>
                <tbody>
                    {listToMatrix(props.data[props.view], columns_d).map((row, i) => (
                    <tr key={i}>
                        {row.map((col, j) => (
                          <td key={j}>
                            <b>{timeConv(col.dt, 'DOW')}</b><br />
                            Sun: {timeConv(col.sunrise, 'HHMM')}-{timeConv(col.sunset, 'HHMM')}<br />
                            Moon({100*col.moon_phase}%): {timeConv(col.moonrise, 'HHMM')}-{timeConv(col.moonset, 'HHMM')}<br />
                            Temp Day: <b>{CorF(col.temp.day, props.measure)}</b> ({CorF(col.temp.min, props.measure)} - {CorF(col.temp.max, props.measure)})<br />
                            Temp Night: {CorF(col.temp.night, props.measure)}<br />
                            Pressure: {(0.7501*col.pressure).toFixed(0)} mmHg<br />
                            Humidity: {col.humidity}%<br />
                            Cloudiness: {col.clouds}%<br />
                            Wind: {parseInt(col.wind_speed)} m/s<br />
                            Precipitation: {(100*col.pop).toFixed(0)}%
                          </td>
                        ))}
                    </tr>
                    ))}
                </tbody>
            </Table>);
    }

    return(<></>);
}

export default Weather;


