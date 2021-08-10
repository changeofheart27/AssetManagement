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
  return (
    <div className="container">
      <Router>
        <div className="navbar-container w-25">
          <img src={logo} alt="logo_NashTech" />
          <p>Online Asset Management</p>
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
              <Link to="/asset" onClick = {()=> setCurrentPage("Manage Assignment")}>
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
        <div className="pages-container w-75">
          <Switch>
            <Route path={"/home"} exact>
              <Home />
            </Route>
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
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default Navbar;
