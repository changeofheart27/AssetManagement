import React from 'react';
import {Button, Container, Row} from "react-bootstrap";
import axios from "axios";

const DeclinePopup = props => {
    let {close,setState,assigment} = props;
    const rootAPI = process.env.REACT_APP_SERVER_URL;
    setState(assigment.state)
    const onSubmit = (close) => {
        const data = {
            assetDTO : assigment.assetDTO,
            userDTO: assigment.userDTO,
            assignedDate: assigment.assignedDate,
            assignedBy: assigment.assignedBy,
            state: 7,
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
        <Container fluid>
            <Row >
                <h3 className={"text-danger bg-gray  rounded-top"}>Are you sure</h3>
                <hr/>
            </Row>
            <Row>
                <p>Do you want to decline this assignment?</p>
            </Row>
            <Row className={"justify-content-center"}>
                <Button variant={"danger"} className={"w-25 me-5 my-5"} onClick={onSubmit}>
                    Yes
                </Button>
                <Button variant={"danger"} className={"w-25 my-5"} onClick={() => close()}>
                    No
                </Button>
            </Row>
        </Container>
    );
};

export default DeclinePopup;