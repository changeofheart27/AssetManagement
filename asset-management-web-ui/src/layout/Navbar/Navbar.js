import "./Navbar.css";
import 'bootstrap/dist/css/bootstrap.min.css'

import React, {useState} from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import CreateAsset from "../../pages/ManageAll/ManageAsset/create/CreateAsset"
import CreateAssignment from "../../pages/Assignment/create/CreateAssignment"
import CreateCategory from "../../pages/ManageAll/ManageAsset/create/CreateCategory";
import CreateUser from "../../pages/ManageAll/ManageUser/create/CreateUser";
import EditAsset from "../../pages/ManageAll/ManageAsset/edit/EditAsset";
import EditUser from "../../pages/ManageAll/ManageUser/edit/EditUser"
import Home from "../../pages/home/Home";
import { Link } from "react-router-dom";
import LoginFormPage from "../header/LoginFormPage"
import ManageAsset from "../../pages/ManageAll/ManageAsset/manage/ManageAsset"
import ManageAssignment from "../../pages/Assignment/manage/ManageAssignment";
import ManageUser from "../../pages/ManageAll/ManageUser/manage/ManageUser";
import Request from "../../pages/ManageAll/Request/Request";
import logo from "../../resources/logo.jpg";

const Navbar = ({setCurrentPage}) => {
  const [responseDataAsset, setResponseDataAsset] = useState({
    id: null,
    assetCode: null,
    assetName: null,
    specification: null,
    installedDate: null,
    state: null,
    categoryDTO: {
      id: null,
      name : null
    }
  });
  const [responseUser, setResponseUser] = useState({
    id:null,
    staffCode: null,
    firstName: null,
    lastName: null,
    username:null,
    dob: null,
    gender: null,
    joinedDate: null,
    type: null
  });
  const [responseAssigment,setResponseAssigment] = useState({
    id: null,
    assetDTO: {
      assetCode: null,
      assetName: null,
    },
    userDTO: {
      name: null,
    },
    assignedDate:null,
    state:null
  });
  return (
    <div className="container-fluid d-flex">
      <Router>
        <div className="navbar-container col-2">
          <img src={logo} alt="logo_NashTech" />
          <h5 className={"text-danger"}>Online Asset Management</h5>
          <div className="navbar">
            <ul className="navbar-list">
              <Link to="/home" onClick = {()=> setCurrentPage("Home")}>
                <li className="navbar-list--item">Home</li>
              </Link>
              <Link to="/user" onClick = {()=> setCurrentPage("Manage User")}>
                <li className="navbar-list--item">Manage User</li>
              </Link>
              <Link to="/asset" onClick = {()=> setCurrentPage("Manage Asset")} >
                <li className="navbar-list--item">Manage Asset</li>
              </Link>
              <Link to="/assignment" onClick = {()=> setCurrentPage("Manage Assignment")}>
                <li className="navbar-list--item">Manage Assignment</li>
              </Link>
              <Link to="/request" onClick = {()=> setCurrentPage("Request For Returning")}>
                <li className="navbar-list--item">Request For Returning</li>
              </Link>
              <Link to="/asset">
                <li className="navbar-list--item" onClick = {()=> setCurrentPage("Report")}>Report</li>
              </Link>
            </ul>
          </div>
        </div>
        <div className="pages-container col-10">
          <Switch>
            {/*<Route path={"/home"} exact>*/}
            {/*  <Home responseAssigment = {responseAssigment}/>*/}
            {/*</Route>*/}
            <Route path={"/user"}>
              <ManageUser responseUser = {responseUser}/>
            </Route>
            <Route path={"/login"}>
              <LoginFormPage/>
            </Route>
            <Route path={"/home"}>
              <Home/>
            </Route>
            <Route path={"/createuser"}>
              <CreateUser setResponseUser = {setResponseUser}/>
            </Route>
            <Route path={"/edituser/:id"}>
              <EditUser setResponseUser = {setResponseUser}/>
            </Route>
            <Route path={"/asset"}>
              <ManageAsset responseDataAsset={responseDataAsset} />
            </Route>
            <Route path={"/createasset"}>
              <CreateAsset setResponseDataAsset={setResponseDataAsset} />
            </Route>
            <Route path={"/editasset/:id"}>
              <EditAsset setResponseDataAsset={setResponseDataAsset}/>
            </Route>
            <Route path={"/createcategory"}>
              <CreateCategory/>
            </Route>
            <Route path={"/assignment"}>
              <ManageAssignment responseAssigment={responseAssigment}/>
            </Route>
            <Route path={"/createassignment"}>
              <CreateAssignment setResponseAssigment={setResponseAssigment}/>
            </Route>
            <Route path={"/request"}>
              <Request/>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default Navbar;
