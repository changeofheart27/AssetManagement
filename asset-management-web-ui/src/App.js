import "./App.css";

import {BrowserRouter, Switch} from "react-router-dom";

import Login from './layout/header/Login';
import LoginFormPage from "./layout/header/LoginFormPage";
import Mainpage from "./components/Mainpage/Mainpage";
import React from "react";
import { ToastContainer } from "react-toastify";

const App = () => {
    console.log(localStorage.getItem("username") + 'console.log');
    return (
        <BrowserRouter>
            <ToastContainer/>
            <Switch>
                {localStorage.getItem("username") === null ?
                    <LoginFormPage/>
                    :
                    <Mainpage/>
                }}
            </Switch>
        </BrowserRouter>
    );
};

export default App;