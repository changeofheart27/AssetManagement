import React from "react";
import "./Header.css";

const Header = ({currentPage}) => {
  return (
    <>
      <header className="main-header">
        <p>{currentPage}</p>
      </header>
    </>
  );
};

export default Header;
