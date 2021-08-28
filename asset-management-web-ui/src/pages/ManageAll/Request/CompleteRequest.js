import React, {useRef, useState} from 'react'
import {Button, ButtonGroup, Row} from "react-bootstrap";
import axios from "axios";
import moment from "moment";

const CompleteRequest = props => {
    const rootAPI = process.env.REACT_APP_SERVER_URL;
    let {id, assign, close, setState} = props;
    // setState(assign.state);
    const assigmentId = assign.assignmentDTO.id

    const onSubmit = () => {
        axios
            .put(rootAPI + `/request/${id}/complete`)
            .then(function (response) {
                setState(1);
                close();
            });
    }
    return (
        <div>
            <h3 className={"text-danger"}>Are you sure?</h3>
            <hr/>
            <p>Do you want to mark this returning request as 'Completed'?</p>
            <Row>
                <ButtonGroup>
                    <Button variant={"danger"} className={"mx-5"} onClick={onSubmit}>Yes</Button>
                    <Button variant={"secondary"} className={"mx-5"} onClick={() => close()}>No</Button>
                </ButtonGroup>
            </Row>
        </div>
    )
}

export default CompleteRequest;