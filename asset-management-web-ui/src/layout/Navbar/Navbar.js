import React from "react";
import { Link } from "react-router-dom";
import logo from "../../resources/logo.jpg";
import Home from "../../pages/home/Home";
import Asset from "../../pages/asset/Asset";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./Navbar.css";
import Manage from "../../pages/manage/Manage";
import EditAsset from "../../pages/edit/EditAsset";
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
            <Route path="/home" exact>
              <Home />
            </Route>
            <Route path="/user">
              <Manage/>
            </Route>
            <Route path="/asset">
              <Asset />
            </Route>
            <Route path={"/edit"}>
              <EditAsset/>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default Navbar;
