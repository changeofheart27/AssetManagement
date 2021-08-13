import React, {useState} from "react";
import { Link } from "react-router-dom";
import logo from "../../resources/logo.jpg";
import Home from "../../pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./Navbar.css";
import ManageUser from "../../pages/ManageAll/ManageUser/manage/ManageUser";
import CreateUser from "../../pages/ManageAll/ManageUser/create/CreateUser";
import EditUser from "../../pages/ManageAll/ManageUser/edit/EditUser"

import ManageAsset from "../../pages/ManageAll/ManageAsset/manage/ManageAsset"
import CreateAsset from "../../pages/ManageAll/ManageAsset/create/CreateAsset"
import EditAsset from "../../pages/ManageAll/ManageAsset/edit/EditAsset";
import 'bootstrap/dist/css/bootstrap.min.css'
import CreateCategory from "../../pages/ManageAll/ManageAsset/create/CreateCategory";
import ManageAssignment from "../../pages/Assignment/manage/ManageAssignment";
import CreateAssignment from "../../pages/Assignment/create/CreateAssignment"
import Assignment from "../../pages/Assignment/Assignment";
import Request from "../../pages/ManageAll/Request/Request";

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
              <Link to="/asset" onClick = {()=> setCurrentPage("Request For Returning")}>
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
              <Assignment/>
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
