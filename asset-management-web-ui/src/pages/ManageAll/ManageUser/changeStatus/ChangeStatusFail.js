import React from 'react';
import {Button, ButtonGroup, Row} from "react-bootstrap";

const ChangeStatusFail = (props) => {
    let {close} = props;
    return (
        <div>
            <Row className={"justify-content-between align-items-center"}>
                <h3 className={"text-danger w-auto"}>Can not disable user</h3>
                <Button variant={"danger"} className={"btn-close"}  onClick={() => close()}>
                </Button>
            </Row>
            <hr/>
            <p>There are valid assignments belonging to this user.</p>
            <p>Please close all assignments before disabling user.</p>
        </div>
    );
};

export default ChangeStatusFail;