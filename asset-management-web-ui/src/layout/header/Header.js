import React, { useState } from "react";
import { Link, Route, Router, Switch } from "react-router-dom";
import "./Header.css";
import {useHistory} from 'react-router-dom'
import { Button } from "bootstrap";
import Popup from "reactjs-popup";
import LoginFormPage from "./LoginFormPage";
const Header = ({currentPage}) => {
  const history = useHistory();
  const onClick = () => {
  } 
  return (
    <>
      <header className="main-header">
        <div className="container">
         
            <div className = "content-info">
              <p>{currentPage}</p>
            </div>
            <div className = "login-page">
              <a href = "/login"><p>Login</p></a>
            </div>
        </div>
      </header>
    </>
  );
};

export default Header;
