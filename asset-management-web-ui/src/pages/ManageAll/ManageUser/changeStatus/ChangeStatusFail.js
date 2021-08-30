import React, {useEffect} from 'react';
import {Button, Row} from "react-bootstrap";

const ChangeStatusFail = (props) => {
    let {close, setDisable} = props;
    useEffect(() => {
        setDisable(true);
    })
    return (
        <div>
            <Row className={"justify-content-between align-items-center"}
                 style={{padding: '10px 20px'}}
            >
                <h3 className={"text-danger w-auto m-0"}>Can not disable user</h3>
                <Button variant={"outline-danger w-auto"} style={{padding: '3px 6px'}} onClick={() => {
                    setDisable(false);
                    close()
                }}>
                    <i class="bi bi-x-lg"/>
                </Button>
            </Row>
            <hr style={{margin: '0'}}/>
            <div style={{padding: '10px 20px'}}>
                <p>There are valid assignments belonging to this user.</p>
                <p>Please close all assignments before disabling user.</p>
            </div>
        </div>
    );
};

export default ChangeStatusFail;