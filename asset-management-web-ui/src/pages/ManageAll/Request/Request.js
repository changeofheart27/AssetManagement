import React, {useEffect, useState, useRef} from 'react';
import {Button, Container, Form, FormControl, InputGroup, Row, Table} from "react-bootstrap";
import 'react-calendar/dist/Calendar.css';
import axios from "axios";
import Popup from 'reactjs-popup';
import DeleteRequest from './DeleteRequest';
import CompleteRequest from './CompleteRequest';

const Request = () => {
    const rootAPI = process.env.REACT_APP_SERVER_URL;
    const [list, setList] = useState([{
        id:null,
        returnedDate:null,
        state: null,
        assignmentDTO:{
            assignedDate: null,
            assetDTO:{
                assetCode: null,
                assetName: null,
                state: null

            },
            userDTO:{
                username: null,
            }
        },
        accepted_by: null
    }]);
    useEffect(() => {
        axios.get(rootAPI + `/request`)
            .then(response => {
                setList(response.data)
            })

    }, [])

    const [type, setType] = useState();
    const [date, setDate] = useState();
    const [searchTerm, setSearchTerm] = useState();
    const request = {
        params: {
            type,
            date,
            searchTerm
        }
    }
    const handleFilterType = evt => {
        const name = evt.target.name;
        setType(evt.target.value)
    }
    const handleFilterDate = evt => {
        const name = evt.target.name;
        setDate(evt.target.value)
    }
    const handleSearch = evt => {
        const name = evt.target.name;
        setSearchTerm(evt.target.value)
    }
    const isFirstRun = useRef(true);
    useEffect(() => {
        if(isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        console.log("use Effect Run")
        console.log(request)
        if (request.params.type === "State") {
            request.params.type = null;
            console.log(request);
          }
        if (request.params.date === "Assigned Date") {
            request.params.date = null;
            console.log(request);
        }
        axios.get(rootAPI + `/request/filter`, request)
            .then(function (response) {
                setList(response.data);
                console.log(response.data)
            })
    }, [type, date,searchTerm])
    const check = (state) => {
        if (state === 0) {
          return <td>Waiting for returning</td>;
        } else if (state === 1) {
          return <td>Completed</td>;
        }
      };
    return (
        <Container fluid className={"d-block ps-5"}>
            <h1 className={"text-danger mb-3"}>Request List</h1>
            <InputGroup className={"justify-content-between"}>
                <div className={"col-6 d-flex"}>
                    <Form.Control
                        as="select"
                        custom
                        className={"w-25"}
                        name={"type"}
                        onChange = {handleFilterType}
                    >
                        <option>State</option>
                        <option value="0">Waiting for returning</option>
                        <option value="1">Completed</option>
                    </Form.Control>
                    <Button
                        variant={"outline-secondary"}
                        className={"me-5"}
                    >
                        <i className="bi bi-funnel-fill"/></Button>
                    <Form.Control
                        type={"date"}
                        className={"w-25 ms-5"}
                        onChange = {handleFilterDate}
                    />
                </div>
                <div className={"col-6 d-flex justify-content-end"}>
                    <FormControl
                        type={"input"}
                        className={"w-25"}
                        name={"searchTerm"}
                        onChange = {handleSearch}
                    >
                    </FormControl>
                    <Button variant={"outline-secondary"}
                            className={"me-5"}
                    ><i className="bi bi-search"/>
                    </Button>
                </div>
            </InputGroup>
            <Row className={"mt-5"}>
                <Table>
                    <thead>
                    <tr>
                        <th>No.<i className="bi bi-caret-down-fill"/></th>
                        <th>Asset Code<i className="bi bi-caret-down-fill"/></th>
                        <th>Asset Name<i className="bi bi-caret-down-fill"/></th>
                        <th>Request by<i className="bi bi-caret-down-fill"/></th>
                        <th>Assign Date<i className="bi bi-caret-down-fill"/></th>
                        <th>Accepted by<i className="bi bi-caret-down-fill"/></th>
                        <th>Return Date<i className="bi bi-caret-down-fill"/></th>
                        <th>State<i className="bi bi-caret-down-fill"/></th>
                    </tr>
                    </thead>
                    <tbody>
                    {list.map(assign =>
                        <tr>
                            <td>{assign.id}</td>
                            <td>{assign.assignmentDTO.assetDTO.assetCode}</td>
                            <td>{assign.assignmentDTO.assetDTO.assetName}</td>
                            <td>{assign.assignmentDTO.userDTO.username}</td>
                            <td>{assign.assignmentDTO.assignedDate}</td>
                            <td>{assign.accepted_by}</td>
                            <td>{assign.returnedDate}</td>
                            {check(assign.state)}
                            <Popup
                                contentStyle={{
                                    width: "25%",
                                    border: "1px solid black",
                                    borderRadius: 10,
                                    overflow: "hidden",
                                    padding: "20px",
                                }}
                                trigger={
                                    <td><i className="bi bi-check-lg text-danger"/></td>
                                }
                                offsetX={200}
                                modal
                            >
                            <CompleteRequest id={assign.id} assign = {assign}></CompleteRequest>
                            </Popup>
                            <Popup
                                contentStyle={{
                                    width: "25%",
                                    border: "1px solid black",
                                    borderRadius: 10,
                                    overflow: "hidden",
                                    padding: "20px",
                                }}
                                trigger={
                                    <td><i className="bi bi-x-lg text-dark fw-bold"/></td>
                                }
                                offsetX={200}
                                modal
                            >
                            <DeleteRequest id={assign.id}></DeleteRequest>
                            </Popup>
                            
                        </tr>
                    )}
                    </tbody>
                </Table>
            </Row>
        </Container>
    );
};

export default Request;