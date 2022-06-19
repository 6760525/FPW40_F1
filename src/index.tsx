//import * as ReactDOM from "react-dom";
import * as React from "react";
import {createRoot} from "react-dom/client";
import App from "./components/App";
import "bootstrap/dist/css/bootstrap.min.css"

const container = document.getElementById("root");
const root = createRoot(container);

//ReactDOM.render(<App/>, document.getElementById("root"));
root.render(<App />);
