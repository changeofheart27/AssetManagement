import React, { useState } from "react";
import { Link, Route, Router, Switch } from "react-router-dom";
import "./Header.css";
import {useHistory} from 'react-router-dom'
import { Button } from "bootstrap";
import Popup from "reactjs-popup";
import LoginFormPage from "./LoginFormPage";
import { Dropdown, DropdownButton } from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.min.css'
import UserInfo from "./UserInfo";
import Logout from "./Logout";
const Header = ({currentPage}) => {
  
  const history = useHistory();
  const [isLogedIn,setIsLogedIn] = useState("Login");
  if(localStorage.getItem("username") !== null) {
  return (
      <>
      
        <header className="main-header">
          <div className="container">
              <div className = "content-info">
                <p>{currentPage}</p>
              </div>
              <div className = "user-ifnor">
              <DropdownButton id="dropdown-basic-button" title={localStorage.getItem("username")}>
                <Dropdown.Item href="#/action-1">
                <Popup contentStyle={{
                              width: "40%", 
                              height: "40%",
                              border: "1px solid black", 
                              borderRadius: 10,
                              overflow: 'hidden', 
                              padding: "20px"
                            }} 
                              modal trigger={<p id = "user-infor-optional">Change Password</p>}>
                  {close => (
                          <UserInfo></UserInfo>
                        
                        )}
                  </Popup>
                </Dropdown.Item>
                <Dropdown.Item href="#/action-2">
                  <Popup contentStyle={{
                                width: "40%", 
                                height: "30%",
                                border: "1px solid black", 
                                borderRadius: 10,
                                overflow: 'hidden', 
                                padding: "20px"
                              }} 
                                modal trigger={<p id = "user-infor-optional">Logout</p>}>
                    {close => (
                            <Logout></Logout>
                          
                          )}
                    </Popup>
                </Dropdown.Item>
              </DropdownButton>
              </div>
          </div>
        </header>
      </>
    );
  }else{
    return (
      <>
      
        <header className="main-header">
          <div className="container">
              <div className = "content-info">
                <p>{currentPage}</p>
              </div>
              <div className = "user-info">
                <Link to = {"/login"}> <p>{isLogedIn}</p></Link>
              </div>
          </div>
        </header>
      </>
    );
  }
};

export default Header;
