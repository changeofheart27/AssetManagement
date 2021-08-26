import React, {useEffect, useState, useRef, useMemo} from 'react';
import {Button, Container, Form, FormControl, InputGroup, Row, Table} from "react-bootstrap";
import 'react-calendar/dist/Calendar.css';
import axios from "axios";
import Popup from 'reactjs-popup';
import DeleteRequest from './DeleteRequest';
import CompleteRequest from './CompleteRequest';

const Request = () => {
    const rootAPI = process.env.REACT_APP_SERVER_URL;
    const [sortConfig, setSortConfig] = useState(null);
    const [list, setList] = useState([{
        id: null,
        returnedDate: null,
        assignmentDTO: {
            assignedDate: null,
            assetDTO: {
                assetCode: null,
                assetName: null,
                state: null
            },
            userDTO: {
                username: null,
            },
            state: null,
        },
        state: null,
        accepted_by: null
    }]);
    const [state, setState] = useState(null);
    useEffect(() => {
        axios.get(rootAPI + `/request`)
            .then(response => {
                setList(response.data)
            })

    }, [state, list.length])


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
    const sortingData = useMemo(() => {
        if (sortConfig !== null) {
            list.sort((a, b) => {
                if(sortConfig.key == 'username') {
                    if(a.assignmentDTO.userDTO.username < b.assignmentDTO.userDTO.username)
                    return sortConfig.direction === "asc" ? -1 : 1;
                    if(a.assignmentDTO.userDTO.username > b.assignmentDTO.userDTO.username)
                    return sortConfig.direction === "asc" ? 1 : -1;
                }
                if(sortConfig.key == 'assetName') {
                    if(a.assignmentDTO.assetDTO.assetName < b.assignmentDTO.assetDTO.assetName)
                    return sortConfig.direction === "asc" ? -1 : 1;
                    if(a.assignmentDTO.assetDTO.assetName > b.assignmentDTO.assetDTO.assetName)
                    return sortConfig.direction === "asc" ? 1 : -1;
                }
                if(sortConfig.key == 'assetCode') {
                    if(a.assignmentDTO.assetDTO.assetCode < b.assignmentDTO.assetDTO.assetCode)
                    return sortConfig.direction === "asc" ? -1 : 1;
                    if(a.assignmentDTO.assetDTO.assetCode > b.assignmentDTO.assetDTO.assetCode)
                    return sortConfig.direction === "asc" ? 1 : -1;
                }
                if(sortConfig.key == 'state') {
                    if(a.assignmentDTO.assetDTO.state < b.assignmentDTO.assetDTO.state)
                    return sortConfig.direction === "asc" ? -1 : 1;
                    if(a.assignmentDTO.assetDTO.state > b.assignmentDTO.assetDTO.state)
                    return sortConfig.direction === "asc" ? 1 : -1;
                }
                if(sortConfig.key == 'assignedDate') {
                    if(a.assignmentDTO.assignedDate < b.assignmentDTO.assignedDate)
                    return sortConfig.direction === "asc" ? -1 : 1;
                    if(a.assignmentDTO.assignedDate > b.assignmentDTO.assignedDate)
                    return sortConfig.direction === "asc" ? 1 : -1;
                }
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === "asc" ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === "asc" ? 1 : -1;
                }
                return 0;
            });
        }
    }, [sortConfig]);
    const requestSort = (key) => {
        let direction = "asc";
        if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === "asc"
        ) {
            direction = "desc";
        }
        setSortConfig({key, direction});
    };
    const getClassNamesFor = (name) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };
    const handleFilterType = evt => {
        setType(evt.target.value)
    }
    const handleFilterDate = evt => {
        setDate(evt.target.value)
    }
    const handleSearch = evt => {
        const name = evt.target.name;
        setSearchTerm(evt.target.value)
    }
    const isFirstRun = useRef(true);
    useEffect(() => {
        if (isFirstRun.current) {
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
    }, [type, date, searchTerm])
    const check = (state) => {
        if (state === 8) {
            return <td>Waiting for returning</td>;
        } else if (state === -1) {
            return <td>Completed</td>;
        }
    };
    let i = 1;
    return (
        <Container fluid className={"d-block ps-5"}>
            <h1 className={"text-danger mb-3"}>Request List</h1>
            <InputGroup className={"justify-content-between"}>
                <div className={"col-6 d-flex"}>
                    <Form.Control
                        as="select"
                        custom
                        className={"w-26"}
                        name={"type"}
                        onChange={handleFilterType}
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
                        className={"w-26 ms-3"}
                        onChange={handleFilterDate}
                    />
                </div>
                <div className={"col-6 d-flex justify-content-end"}>
                    <FormControl
                        type={"input"}
                        className={"w-25"}
                        name={"searchTerm"}
                        onChange={handleSearch}
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
                        <th className={"border-bottom"}
                            className={getClassNamesFor("id")}
                            onClick={() => requestSort("id")}
                        >No.
                        </th>
                        <th className={"border-bottom"}
                            className={getClassNamesFor("assetCode")}
                            onClick={() => requestSort("assetCode")}
                        >Asset Code
                        </th>
                        <th className={"border-bottom"}
                            className={getClassNamesFor("assetName")}
                            onClick={() => requestSort("assetName")}
                        >Asset Name
                        </th>
                        <th className={"border-bottom"}
                            className={getClassNamesFor("username")}
                            onClick={() => requestSort("username")}
                        >Request by
                        </th>
                        <th className={"border-bottom"}
                            className={getClassNamesFor("assignedDate")}
                            onClick={() => requestSort("assignedDate")}
                        >Assign Date
                        </th>
                        <th className={"border-bottom"}
                            className={getClassNamesFor("accepted_by")}
                            onClick={() => requestSort("accepted_by")}
                        >Accepted by
                        </th>
                        <th className={"border-bottom"}
                            className={getClassNamesFor("returnedDate")}
                            onClick={() => requestSort("returnedDate")}
                        >Return Date
                        </th>
                        <th className={"border-bottom"}
                            className={getClassNamesFor("state")}
                            onClick={() => requestSort("state")}
                        >State
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {list.map(assign =>
                        <tr>
                            <td>{i++}</td>
                            <td>{assign.assignmentDTO.assetDTO.assetCode}</td>
                            <td>{assign.assignmentDTO.assetDTO.assetName}</td>
                            <td>{assign.assignmentDTO.userDTO.username}</td>
                            <td>{assign.assignmentDTO.assignedDate}</td>
                            <td>{assign.accepted_by}</td>
                            <td>{assign.returnedDate}</td>
                            {check(assign.assignmentDTO.state)}
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
                                {close => <CompleteRequest id={assign.id} assign={assign} close={close}
                                                           setState={setState}/>}
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
                                {close => <DeleteRequest id={assign.id} close={close}/>}
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