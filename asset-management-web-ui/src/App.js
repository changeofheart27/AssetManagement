import "./App.css";

import {BrowserRouter, Switch} from "react-router-dom";

import Login from './layout/header/Login';
import LoginFormPage from "./layout/header/LoginFormPage";
import Mainpage from "./components/Mainpage/Mainpage";
import React, {useState} from "react";
import {ToastContainer} from "react-toastify";
import {LinearProgress} from "@material-ui/core";

const App = () => {
    return (
        <BrowserRouter>
            <ToastContainer/>
            <Switch>
                {localStorage.getItem("username") === null ?
                    <Login/>
                    :
                    <Mainpage/>
                }}
            </Switch>
        </BrowserRouter>
    );
};

export default App;