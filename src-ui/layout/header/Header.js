import React, { useState } from "react";
import { Link } from "react-router-dom";
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
          <div className = "header-content">
            <p>{currentPage}</p>
          </div>
          <div className = "info">
          <Popup contentStyle={{
                            width: "25%", border: "1px solid black", borderRadius: 10,
                            overflow: 'hidden', padding: "20px"}} 
                            modal trigger={<p>Login</p>}>
            {close => (
                        <LoginFormPage></LoginFormPage>
                      
                      )}
          </Popup>
            
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
