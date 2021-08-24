import React, {useEffect, useState, useMemo} from 'react';
import {Button, Container, Form, FormControl, InputGroup, Row, Table} from "react-bootstrap";
import 'react-calendar/dist/Calendar.css';
import axios from "axios";

const Request = () => {
    const rootAPI = process.env.REACT_APP_SERVER_URL;
    const [sortConfig, setSortConfig] = useState(null);
    const [list, setList] = useState([{
        id:null,
        returned_date:null,
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
    const check = state => {
        if (state === 8) {
            return <td>Waiting for returning</td>
        }
    }

    const sortingData = useMemo(() => {
        if (sortConfig !== null) {
          list.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key] ||
                a.assignmentDTO.userDTO.username < b.assignmentDTO.userDTO.username ||
                a.assignmentDTO.assetDTO.assetName < b.assignmentDTO.assetDTO.assetName ||
                a.assignmentDTO.assetDTO.assetCode < b.assignmentDTO.assetDTO.assetCode ||
                a.assignmentDTO.assetDTO.state < b.assignmentDTO.assetDTO.state ||
                a.assignmentDTO.assignedDate < b.assignmentDTO.assignedDate) {
              return sortConfig.direction === "asc" ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key] ||
                a.assignmentDTO.userDTO.username > b.assignmentDTO.userDTO.username ||
                a.assignmentDTO.assetDTO.assetName < b.assignmentDTO.assetDTO.assetName ||
                a.assignmentDTO.assetDTO.assetCode < b.assignmentDTO.assetDTO.assetCode ||
                a.assignmentDTO.assetDTO.state > b.assignmentDTO.assetDTO.state ||
                a.assignmentDTO.assignedDate > b.assignmentDTO.assignedDate) {
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
        setSortConfig({ key, direction });
      };
      const getClassNamesFor = (name) => {
        if (!sortConfig) {
          return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
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
                        <th className={"border-bottom"}
                            className={getClassNamesFor("id")}
                            onClick={() => requestSort("id")}
                        >No.</th>
                        <th className={"border-bottom"}
                            className={getClassNamesFor("assignmentDTO.assetDTO.assetCode")}
                            onClick={() => requestSort("assignmentDTO.assetDTO.assetCode")}
                        >Asset Code</th>
                        <th className={"border-bottom"}
                            className={getClassNamesFor("assignmentDTO.assetDTO.assetName")}
                            onClick={() => requestSort("assignmentDTO.assetDTO.assetName")}
                        >Asset Name</th>
                        <th className={"border-bottom"}
                            className={getClassNamesFor("assignmentDTO.userDTO.username")}
                            onClick={() => requestSort("assignmentDTO.userDTO.username")}
                        >Request by</th>
                        <th className={"border-bottom"}
                            className={getClassNamesFor("assignmentDTO.assignedDate")}
                            onClick={() => requestSort("assignmentDTO.assignedDate")}
                        >Assign Date</th>
                        <th className={"border-bottom"}
                            className={getClassNamesFor("accepted_by")}
                            onClick={() => requestSort("accepted_by")}
                        >Accepted by</th>
                        <th className={"border-bottom"}
                            className={getClassNamesFor("returned_date")}
                            onClick={() => requestSort("returned_date")}
                        >Return Date</th>
                        <th className={"border-bottom"}
                            className={getClassNamesFor("assignmentDTO.assetDTO.state")}
                            onClick={() => requestSort("assignmentDTO.assetDTO.state")}
                        >State</th>
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
                            <td>{assign.returned_date}</td>
                            <td>{check(assign.assignmentDTO.state)}</td>
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