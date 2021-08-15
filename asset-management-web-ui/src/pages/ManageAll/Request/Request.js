import React, {useEffect, useState} from 'react';
import {Button, Container, Form, FormControl, InputGroup, Row, Table} from "react-bootstrap";
import 'react-calendar/dist/Calendar.css';
import axios from "axios";

const Request = () => {
    const rootAPI = process.env.REACT_APP_SERVER_URL;
    const [list, setList] = useState([{
        id:null,
        returned_date:null,
        state: null,
        assignmentDTO:{
            assignedDate: null,
            assetDTO:{
                assetCode: null,
                assetName: null,

            },
            userDTO:{
                username: null,
            }
        },
        userDTO:{
            username: null
        }
    }]);
    useEffect(() => {
        axios.get(rootAPI + `/request`)
            .then(response => {
                setList(response.data)
            })

    }, [])
    console.log(list, " list");
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
                    >
                        <option>State</option>
                        <option value="0">Available</option>
                        <option value="1">Not Available</option>
                        <option value="2">Waiting for recycling</option>
                        <option value="3">Recycle</option>
                    </Form.Control>
                    <Button
                        variant={"outline-secondary"}
                        className={"me-5"}
                    >
                        <i className="bi bi-funnel-fill"/></Button>
                    <Form.Control
                        type={"date"}
                        className={"w-25 ms-5"}
                    />
                </div>
                <div className={"col-6 d-flex justify-content-end"}>
                    <FormControl
                        type={"input"}
                        className={"w-25"}
                        name={"searchTerm"}
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
                            <td>{assign.userDTO.username}</td>
                            <td>{assign.returned_date}</td>
                            <td>{assign.state === 5 ? <p>Complete</p> : null}</td>
                            <td><i className="bi bi-check-lg text-danger"/></td>
                            <td><i className="bi bi-x-lg text-dark fw-bold"/></td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </Row>
        </Container>
    );
};

export default Request;