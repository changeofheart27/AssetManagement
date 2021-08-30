import React from 'react';
import {Row} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const EmptySearch = () => {
    return (
        <Row className={"justify-content-center align-items-center"}>
            <i className="bi bi-inbox text-danger text-center" style={{fontSize: "100px"}}/>
            <div className={"text-center text-danger"} style={{fontSize: "18px"}}>
                No result found
            </div>
        </Row>
    );
};

export default EmptySearch;