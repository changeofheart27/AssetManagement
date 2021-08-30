import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row} from "react-bootstrap";
import "./index.css"
import EmptySVG from '../../style/paper.svg'
const EmptyList = () => {

    return (
        <>
            <Row className={"justify-content-center align-items-center"}>
               <img src={EmptySVG}  className={"svg-custom my-5"} alt={"Empty"}/>
                <div className={"text-center text-danger"} style={{fontSize:"18px"}}>
                    You have got no assignment yet
                </div>
            </Row>

        </>
    );
};

export default EmptyList;