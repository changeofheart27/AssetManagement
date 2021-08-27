import React from 'react';
import {Button, Container, Row} from "react-bootstrap";
import './popup.css'
import axios from "axios";
import moment from "moment";

const ReturnPopup = (props) => {
    const rootAPI = process.env.REACT_APP_SERVER_URL;
    let {close, assigment, setState} = props;
    setState(assigment.state)
    const onSubmit = (close) => {
        const data = {
            assetDTO: assigment.assetDTO,
            userDTO: assigment.userDTO,
            assignedDate: assigment.assignedDate,
            assignedBy: assigment.assignedBy,
            state: 8,
            note: assigment.note
        }
        axios.put(rootAPI + `/assignments/${assigment.id}`, data, {
                headers: {
                    Authorization: localStorage.getItem("jwttoken")
                }
            }
        )
            .then(response => {
                close();
                setState(data.state);
                const requestdata={
                    assignmentDTO: assigment
                }
                axios.post(rootAPI+`/request/create`,requestdata,{
                    headers:{
                        Authorization: localStorage.getItem("jwttoken")
                    }
                }).then(response=> {
                    console.log("request success")
                })
            })
    }
    return (
        <Container fluid>
            <Row>
                <h3 className={"text-danger bg-gray mb-0 rounded-top"}>Are you sure?</h3>
                <hr/>
            </Row>
            <Row>
                <p>Do you want to create a returning request for this asset?</p>
            </Row>
            <Row className={"justify-content-center"}>
                <Button variant={"danger"} className={"w-25 me-5 my-5"} onClick={() => onSubmit(close)}>
                    Yes
                </Button>
                <Button variant={"secondary"} className={"w-25 my-5"} onClick={() => close()}>
                    No
                </Button>
            </Row>
        </Container>
    );
};

export default ReturnPopup;