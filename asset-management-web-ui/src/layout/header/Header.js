import React, { useState } from "react";
import { Link} from "react-router-dom";
import "./Header.css";
import {useHistory} from 'react-router-dom'
import Popup from "reactjs-popup";
import { Dropdown, DropdownButton } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import UserInfo from "./UserInfo";
import Logout from "./Logout";
const Header = ({currentPage}) => {
    const history = useHistory();
    const [isLogedIn, setIsLogedIn] = useState("Login");
    if (localStorage.getItem("username") !== null) {
        return (
            <header className="main-header">
                <div className="container-fluid justify-content-between d-flex">
                    <div className="content-info">
                        <p>{currentPage}</p>
                    </div>
                    <Dropdown>
                        <Dropdown.Toggle style={{backgroundColor: "#CF2338", borderColor: "#CF2338"}}
                                         className={"mt-3"}>
                            {localStorage.getItem("username")}
                        </Dropdown.Toggle>
                        <Dropdown.Menu className={"p-0"}>
                            <Popup contentStyle={{
                                width: "40%",
                                height: "40%",
                                border: "1px solid black",
                                borderRadius: 10,
                                overflow: 'hidden',
                                padding: "20px"
                            }}
                                   modal trigger={<Dropdown.Item className={'custom-dropdown'} >Change Password</Dropdown.Item>}>
                                {close => (
                                    <UserInfo close={close}/>
                                )}
                            </Popup>
                            <Popup contentStyle={{
                                width: "40%",
                                height: "30%",
                                border: "1px solid black",
                                borderRadius: 10,
                                overflow: 'hidden',
                                padding: "20px"
                            }}
                                   modal trigger={<Dropdown.Item className={'custom-dropdown'}>Logout</Dropdown.Item>}>
                                {close => (
                                    <Logout close={close}/>
                                )}
                            </Popup>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </header>
        );
    } else {
        return (
            <>

                <header className="main-header">
                    <div className="container">
                        <div className="content-info">
                            <p>{currentPage}</p>
                        </div>
                        <div className="user-info">
                            <Link to={"/login"}><p>{isLogedIn}</p></Link>
                        </div>
                    </div>
                </header>
            </>
        );
    }
};

export default Header;
