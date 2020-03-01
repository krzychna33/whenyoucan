import "core-js";
import * as React from "react";
import * as ReactDOM from "react-dom";
import LandingPage from "./screens/LandingPage"
import "./styles/global.scss";

ReactDOM.render(
    <div>
        <LandingPage appName={"REACT - TYPESCRIPT - SCSS BOILERPLATE"}/>
    </div>,
    document.getElementById("app"),
);