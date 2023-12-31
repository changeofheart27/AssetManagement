import React, {useEffect, useState} from 'react';
import {Button, ButtonGroup, Row} from "react-bootstrap";
import './popup.css'
import axios from "axios";

const ReturnPopup = (props) => {
        const rootAPI = process.env.REACT_APP_SERVER_URL;
        let {close, assigment, setState, setDisable} = props;
        useEffect(() => {
            setDisable(true);
        })
        setState(assigment.state)
        const onSubmit = (close) => {
            const data = {
                assignmentDTO: {
                    id: assigment.id
                }
            }
            axios.post(rootAPI + `/request/create`, data
            )
                .then(response => {
                    setState(data.state);
                    console.log("request success");
                    setDisable(false);
                    close();
                })
        }

        return (
            <div>
                <h3 className={"text-danger"} style={{padding: '10px 20px'}}>Are you sure?</h3>
                <hr style={{margin: '0'}}/>
                <Row style={{padding: '10px 20px'}}>
                    <p>Do you want to create a returning request for this asset?</p>
                    <ButtonGroup className={"w-50"}>
                        <Button variant={"danger"} className={"px-5"} onClick={() => {
                            onSubmit(close)
                        }}>YES</Button>
                    </ButtonGroup>
                    <ButtonGroup className={"w-50"}>
                        <Button variant={"secondary"} className={"px-5"} onClick={() => {
                            setDisable(false);
                            close()
                        }}>NO</Button>
                    </ButtonGroup>
                </Row>
            </div>
        );
    }
;

export default ReturnPopup;