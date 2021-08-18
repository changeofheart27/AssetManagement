import React from "react";
import "./App.css";
import Mainpage from "./components/Mainpage/Mainpage";
import {BrowserRouter, Route, Switch, useHistory} from "react-router-dom";
import LoginFormPage from "./layout/header/LoginFormPage";

const App = () => {
   let history = useHistory();
    console.log(localStorage.getItem("username")+'console.log');

    return (
        <BrowserRouter>
            <Switch>
            { localStorage.getItem("username")===null ?
                <LoginFormPage/>
                : <Mainpage/>
            }}
            </Switch>
        </BrowserRouter>
    );
};

export default App;