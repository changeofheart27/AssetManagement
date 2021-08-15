import React from "react";
import "./App.css";
import Mainpage from "./components/Mainpage/Mainpage";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LoginFormPage from "./layout/header/LoginFormPage";

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path={"/login"}>
                    <LoginFormPage/>
                </Route>
                <Route path={"/"}>
                    <Mainpage/>
                </Route>
            </Switch>
        </BrowserRouter>
    );
};

export default App;