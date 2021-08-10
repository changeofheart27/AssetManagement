import React from 'react';
import {Button, Container, Form, InputGroup, Row, Table} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

const Assignment = () => {
    return (
        <Container fluid className={"ps-5"}>
            <Row className={"mb-3"}>
                <h3 className={"text-danger"}>Assignment List</h3>
            </Row>
            <Row className={"mb-5"}>
                <InputGroup className={"justify-content-between"}>
                    <div className={"col-6 d-flex"}>
                        <Form.Control
                            as="select"
                            className={"w-25"}
                        >
                            <option>None</option>
                            <option value="0">Available</option>
                            <option value="1">Not Available</option>
                            <option value="2">Waiting for recycling</option>
                            <option value="3">Recycle</option>
                        </Form.Control>
                        <Button
                            variant={"outline-secondary"}><i
                            className={"bi bi-funnel-fill"}/>
                        </Button>
                        <Form.Control
                            type={"date"}
                            className={"w-25 ms-5"}
                            name={"joinedDate"}
                        />
                    </div>
                    <div className={"col-6 d-flex"}>
                        <Form.Control
                            type={"input"}
                            className={"w-25"}
                            name={"searchTerm"}
                        />
                        <Button
                            variant={"outline-secondary"}
                            className={"me-5"}
                        >
                            <i className="bi bi-search"/>
                        </Button>
                        <Button
                            variant={"danger"}
                            className={"w-auto border-0 ms-5"}
                        >
                            Create new assignment
                        </Button>
                    </div>
                </InputGroup>
            </Row>
            <Row>
                <Table>
                    <thead>
                    <tr>
                        <th>No.<i className="bi bi-caret-down-fill"/></th>
                        <th>Asset Code<i className="bi bi-caret-down-fill"/></th>
                        <th>Asset Name<i className="bi bi-caret-down-fill"/></th>
                        <th>Assign to<i className="bi bi-caret-down-fill"/></th>
                        <th>Assign by<i className="bi bi-caret-down-fill"/></th>
                        <th>Assign Date<i className="bi bi-caret-down-fill"/></th>
                        <th>State<i className="bi bi-caret-down-fill"/></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1</td>
                        <td>LA10003</td>
                        <td>Laptop HP Probook 440 G1</td>
                        <td>hungtv1</td>
                        <td>binhnv</td>
                        <td>12/10/2018</td>
                        <td>Accepted</td>
                        <td><i className="bi bi-pencil-fill text-dark"/></td>
                        <td><i className="bi bi-x-circle text-danger"/></td>
                        <td><i className="bi bi-arrow-counterclockwise text-blue fw-bold"/></td>
                    </tr>
                    </tbody>
                </Table>
            </Row>
        </Container>
    );
};

export default Assignment;