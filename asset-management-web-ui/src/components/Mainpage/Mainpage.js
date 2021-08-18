import React, { useState } from "react";
import Header from "../../layout/header/Header";
import Footer from "../../layout/footer/Footer";
import Navbar from "../../layout/Navbar/Navbar";

const Mainpage = () => {
  const [currentPage,setCurrentPage] = useState("Home");
  
  return (
    <>
      <Header currentPage = {currentPage} />
      <Navbar setCurrentPage = {setCurrentPage}/>
      <Footer/>
    </>
  );
};

export default Mainpage;
