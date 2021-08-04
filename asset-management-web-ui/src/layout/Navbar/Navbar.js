import React from "react";
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

const Navbar = () => {
  return (
    <div className="container">
      <Router>
        <div className="navbar-container w-25">
          <img src={logo} alt="logo_NashTech" />
          <p>Online Asset Management</p>
          <div className="navbar">
            <ul className="navbar-list">
              <Link to="/home">
                <li className="navbar-list--item">Home</li>
              </Link>
              <Link to="/user">
                <li className="navbar-list--item">Manage User</li>
              </Link>
              <Link to="/asset">
                <li className="navbar-list--item">Manage Asset</li>
              </Link>
              <Link to="/asset">
                <li className="navbar-list--item">Manage Assignment</li>
              </Link>
              <Link to="/asset">
                <li className="navbar-list--item">Request For Returning</li>
              </Link>
              <Link to="/asset">
                <li className="navbar-list--item">Report</li>
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
              <ManageUser/>
            </Route>
            <Route path={"/createuser"}>
              <CreateUser/>
            </Route>
            <Route path={"/edituser"}>
              <EditUser/>
            </Route>
            <Route path={"/asset"}>
              <ManageAsset />
            </Route>
            <Route path={"/createasset"}>
              <CreateAsset />
            </Route>
            <Route path={"/editasset/:id"}>
              <EditAsset/>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default Navbar;
