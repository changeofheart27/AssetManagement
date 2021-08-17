import React from "react";
import "./App.css";
import Mainpage from "./components/Mainpage/Mainpage";
import {BrowserRouter, Switch} from "react-router-dom";
import LoginFormPage from "./layout/header/LoginFormPage";
import { ToastContainer} from "react-toastify";

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