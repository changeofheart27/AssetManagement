import React from 'react';
import {Button, ButtonGroup, Row} from "react-bootstrap";
import axios from "axios";

const AcceptPopup = props => {
    const rootAPI = process.env.REACT_APP_SERVER_URL;
    let {close, assigment, setState} = props;
    setState(assigment.state)
    const onSubmit = (close) => {
        const data = {
            assetDTO: assigment.assetDTO,
            userDTO: assigment.userDTO,
            assignedDate: assigment.assignedDate,
            assignedBy: assigment.assignedBy,
            state: 6,
            note: assigment.note
        }
        axios.put(rootAPI + `/assignments/${assigment.id}`, data, {
                headers: {
                    Authorization: localStorage.getItem("jwttoken")
                }
            }
        )
            .then(response => {
                console.log(`Accept Assignment`);
                close();
                setState(data.state);
            })
    }
    return (
        <div>
            <h3 className={"text-danger"} style={{padding: '10px 20px'}}>Are you sure?</h3>
            <hr style={{margin: '0'}}/>
            <Row style={{padding: '10px 20px'}}>
                <p>Do you want to accept this assignment?</p>
                <ButtonGroup className={"w-50"}>
                    <Button variant={"danger"} className={"px-5"} onClick={() =>{onSubmit(close)}}>Yes</Button>
                </ButtonGroup>
                <ButtonGroup className={"w-50"}>
                    <Button variant={"secondary"} className={"px-5"} onClick={() =>close()}>No</Button>
                </ButtonGroup>
            </Row>
        </div>
    );
};

export default AcceptPopup;