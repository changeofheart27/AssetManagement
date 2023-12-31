import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row} from "react-bootstrap";
import "./index.css"

const EmptyList = () => {

    return (

        <Row className={"justify-content-center align-items-center"}>
            <i className="bi bi-inbox text-danger text-center" style={{fontSize: "100px"}}/>
            <div className={"text-center text-danger"} style={{fontSize: "18px"}}>
                You have got no assignment yet
            </div>
        </Row>


    );
};

export default EmptyList;