import * as React from "react";
import Form from 'react-bootstrap/Form'
import "../styles/Search.css";


function Search({ onChange, onTempChange }) {

    return (
        <>
            <table className="search">
                <tbody>
                    <tr>
                        <td width={"180px"} align={"left"}>Start typing city name:</td>
                        <td width={"200px"} align={"left"}><input type = 'search' placeholder = 'Search City' onChange = { onChange } /></td>
                        <td></td>
                        <td width={"2px"}>&deg;F</td>
                        <td width={"6px"}><Form.Check type="switch" id="temp-switch" onChange={ onTempChange } /></td>
                        <td width={"2px"}>&deg;C</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}

export default Search;
