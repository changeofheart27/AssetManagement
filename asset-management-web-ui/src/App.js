import React from "react";
import "./App.css";
import Mainpage from "./components/Mainpage/Mainpage";
import DeleteAsset from "./pages/ManageAll/ManageAsset/delete/DeleteAsset";

const App = () => {
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  return (
      <>
        <Mainpage/>
      </>
  );
};

export default App;