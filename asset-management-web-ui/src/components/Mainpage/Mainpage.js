import React, {useState} from "react";
import Header from "../../layout/header/Header";
import Footer from "../../layout/footer/Footer";
import Navbar from "../../layout/Navbar/Navbar";
import LoadingPage from "../../layout/Loadingpage/LoadingPage";

const Mainpage = () => {
    const [currentPage, setCurrentPage] = useState("Home");
    const [done, setDone] = useState(undefined)
    return (
        <>
            {done === false ? <LoadingPage/> :
                <>
                    <Header currentPage={currentPage}/>
                    <Navbar setCurrentPage={setCurrentPage} setDone={setDone}/>
                    <Footer/>
                </>
            }
        </>
    );
};

export default Mainpage;
