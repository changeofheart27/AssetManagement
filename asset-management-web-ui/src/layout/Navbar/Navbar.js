import "./Navbar.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import React, {useEffect, useState} from "react";
import {NavLink, Route, Switch} from "react-router-dom";
import CreateAsset from "../../pages/ManageAll/ManageAsset/create/CreateAsset"
import CreateAssignment from "../../pages/Assignment/create/CreateAssignment"
import CreateCategory from "../../pages/ManageAll/ManageAsset/create/CreateCategory";
import CreateUser from "../../pages/ManageAll/ManageUser/create/CreateUser";
import EditAsset from "../../pages/ManageAll/ManageAsset/edit/EditAsset";
import EditAssignment from "../../pages/Assignment/edit/EditAssignment";
import EditUser from "../../pages/ManageAll/ManageUser/edit/EditUser"
import Home from "../../pages/home/Home";
import {Link} from "react-router-dom";
import ManageAsset from "../../pages/ManageAll/ManageAsset/manage/ManageAsset"
import ManageAssignment from "../../pages/Assignment/manage/ManageAssignment";
import ManageUser from "../../pages/ManageAll/ManageUser/manage/ManageUser";
import Request from "../../pages/ManageAll/Request/Request";
import UserInfo from "../header/UserInfo";
import axios from "axios";
import logo from "../../resources/logo.jpg";
import Report from "../../pages/Report/Report";
import {ListGroup} from "react-bootstrap";

const Navbar = ({setCurrentPage, setChildPage}) => {
    const rootAPI = process.env.REACT_APP_SERVER_URL;
    const [authority, setAuthority] = useState([{
        authority: null
    }]);
    useEffect(() => {
        axios.get(rootAPI + "/my-info")
            .then(response => {
                setAuthority(response.data.authority);
            })
    }, [])
    const [responseDataAsset, setResponseDataAsset] = useState({
        id: null,
        assetCode: null,
        assetName: null,
        specification: null,
        installedDate: null,
        state: null,
        categoryDTO: {
            id: null,
            name: null
        }
    });
    const [responseUser, setResponseUser] = useState({
        id: null,
        staffCode: null,
        firstName: null,
        lastName: null,
        username: null,
        dob: null,
        gender: null,
        joinedDate: null,
        type: null
    });
    const [responseAssigment, setResponseAssigment] = useState({
        id: null,
        assetDTO: {
            assetCode: null,
            assetName: null,
        },
        userDTO: {
            name: null,
        },
        assignedDate: null,
        state: null,
        note: null
    });
    const [responseRequest, setResponseRequest] = useState({
        id: null
    });
    return (
        <div className="container-fluid d-flex">
            <div className="navbar-container col-2">
                <img src={logo} alt="logo_NashTech"/>
                <h5 className={"text-danger"}>Online Asset Management</h5>
                <div className="navbar">
                    {authority === "STAFF" ? (
                        <ul className="navbar-list">
                            <Link to="/home" onClick={() => setCurrentPage("Home")}>
                                <li className="navbar-list--item">Home</li>
                            </Link>
                        </ul>
                    ) : (
                        <ListGroup className="navbar-list">
                            <NavLink to="/home"
                                     onClick={() => {
                                         setChildPage(null);
                                         setCurrentPage("Home");
                                     }}
                                     activeClassName={"custom-class"}
                            >
                                <li className="navbar-list--item">Home</li>
                            </NavLink>
                            <NavLink to="/user"
                                     onClick={() => {
                                         setChildPage(null);
                                         setCurrentPage("Manage User")
                                     }}
                                     activeClassName={"custom-class"}
                            >
                                <li className="navbar-list--item">Manage User</li>
                            </NavLink>
                            <NavLink
                                to="/asset"
                                onClick={() => {
                                    setChildPage(null);
                                    setCurrentPage("Manage Asset")
                                }}
                                activeClassName={"custom-class"}
                            >
                                <li className="navbar-list--item">Manage Asset</li>
                            </NavLink>
                            <NavLink
                                to="/assignment"
                                onClick={() => {
                                    setChildPage(null);
                                    setCurrentPage("Manage Assignment")
                                }}
                                activeClassName={"custom-class"}
                            >
                                <li className="navbar-list--item">Manage Assignment</li>
                            </NavLink>
                            <NavLink
                                to="/request"
                                onClick={() => {
                                    setChildPage(null);
                                    setCurrentPage("Request For Returning")
                                }}
                                activeClassName={"custom-class"}
                            >
                                <li className="navbar-list--item">Request For Returning</li>
                            </NavLink>
                            <NavLink to="/report"
                                     activeClassName={"custom-class"}
                                     onClick={() => {
                                         setChildPage(null);
                                         setCurrentPage("Report")
                                     }}
                            >
                                <li className="navbar-list--item">Report</li>
                            </NavLink>
                        </ListGroup>
                    )}
                </div>
            </div>
            <div className="pages-container col-10" style={{height: "500px"}}>
                {authority === "STAFF" ? (
                    <Switch>
                        <Route path={"/home"} exact>
                            <Home/>
                        </Route>
                        <Route path={"/changepassword"}>
                            <UserInfo/>
                        </Route>
                    </Switch>
                ) : (
                    <Switch>
                        <Route path={"/home"} exact>
                            <Home/>
                        </Route>
                        <Route path={"/user"} exact>
                            <ManageUser setChildPage={setChildPage}
                                        setCurrentPages={setCurrentPage}
                                        responseUser={responseUser}
                                        setResponseUser={setResponseUser}
                            />
                        </Route>
                        <Route path={"/home"}>
                            <Home/>
                        </Route>
                        <Route path={"/changepassword"}>
                            <UserInfo/>
                        </Route>
                        <Route path={"/user/createuser"}>
                            <CreateUser setChildPage={setChildPage} setResponseUser={setResponseUser}/>
                        </Route>
                        <Route path={"/user/edituser/:id"}>
                            <EditUser setChildPage={setChildPage} setResponseUser={setResponseUser}/>
                        </Route>
                        <Route path={"/asset"} exact>
                            <ManageAsset setCurrentPages={setCurrentPage}
                                         setChildPage={setChildPage}
                                         responseDataAsset={responseDataAsset}
                                         setResponseDataAsset={setResponseDataAsset}
                            />
                        </Route>
                        <Route path={"/asset/createasset"}>
                            <CreateAsset setChildPage={setChildPage}
                                         setResponseDataAsset={setResponseDataAsset}/>
                        </Route>
                        <Route path={"/asset/editasset/:id"}>
                            <EditAsset setChildPage={setChildPage} setResponseDataAsset={setResponseDataAsset}/>
                        </Route>
                        <Route path={"/asset/createcategory"}>
                            <CreateCategory/>
                        </Route>
                        <Route path={"/assignment"} exact>
                            <ManageAssignment setCurrentPages={setCurrentPage}
                                              setChildPage={setChildPage}
                                              setResponseAssignment={setResponseAssigment}
                                              responseAssigment={responseAssigment}
                            />
                        </Route>
                        <Route path={"/assignment/createassignment"}>
                            <CreateAssignment setChildPage={setChildPage}
                                              setResponseAssigment={setResponseAssigment}/>
                        </Route>
                        <Route path={"/assignment/editassignment/:id"}>
                            <EditAssignment setChildPage={setChildPage}
                                            setResponseAssigment={setResponseAssigment}/>
                        </Route>
                        <Route path={"/request"}>
                            <Request setCurrentPages={setCurrentPage} responseRequest={responseRequest}/>
                        </Route>
                        <Route path={"/report"}>
                            <Report setCurrentPages={setCurrentPage}/>
                        </Route>
                    </Switch>
                )}
            </div>
        </div>
    );
};

export default Navbar;
