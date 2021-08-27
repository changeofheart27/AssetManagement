import "bootstrap/dist/css/bootstrap.min.css";
import "reactjs-popup/dist/index.css";
import '../../../style/style.css'
import {
    Button,
    Container,
    Form,
    FormControl,
    InputGroup,
    Row,
    Table,
} from "react-bootstrap";
import React, {useEffect, useMemo, useRef, useState} from "react";
import DeleteAssignment from "../delete/DeleteAssignment";
import Pagination from "../../../components/Pagination/Pagination";
import Popup from "reactjs-popup";
import ViewDetailAssignment from "../viewDetails/ViewDetailAssignment";
import axios from "axios";
import {useHistory} from "react-router-dom";
import dateFormat from 'dateformat';
import ReturnPopup from "../../home/popup/ReturnPopup";

const ManageAssignment = ({responseAssigment}) => {
    const rootAPI = process.env.REACT_APP_SERVER_URL;
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10);
    const [sortConfig, setSortConfig] = useState(null);
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const [list, setList] = useState([]);
    const history = useHistory();
    const [state, setState] = useState({
        state: null
    });

    const [type, setType] = useState();
    const [date, setDate] = useState();
    const [keyword, setKeyword] = useState();
    const request = {
        params: {
            type,
            date,
            keyword
        },
    };
    const handleFilterType = (evt) => {
        setType(evt.target.value);
    };
    const handleFilterAssignedDate = (evt) => {
        setDate(evt.target.value);
    };
    const handleFilterSearch = (evt) => {
        setKeyword(evt.target.value);
    };
    //prevent filter api autorun with useRef()
    const isFirstRun = useRef(true);
    let config = {
        headers: {
            'Authorization': localStorage.getItem("jwttoken"),
        },
        params: request.params
    }
    useEffect(() => {

        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        if (request.params.type === "State") {
            request.params.type = null;
        }
        if (request.params.date === "Assigned Date") {
            request.params.date = null;
        }
        if (request.params.keyword === "") {
            request.params.keyword = null;
        }
        axios
            .get(rootAPI + `/assignments/filter`, config)
            .then(function (response) {
                setList(response.data);
            });
    }, [type, date, keyword]);


    useEffect(() => {
        axios.get(rootAPI + "/assignments", config).then(function (response) {
            let result = response.data.map((assigment) => assigment.id);
            if (result.includes(responseAssigment.id)) {
                const index = result.indexOf(responseAssigment.id);
                response.data.splice(index, 1);
                response.data.unshift(responseAssigment);
                setList(response.data);
            } else {
                setList(response.data);
            }
        });
    }, [state]);
    const check = (state) => {
        if (state === 5) {
            return <td>Waiting for acceptance</td>;
        } else if (state === 6) {
            return <td>Accepted</td>;
        } else if (state === 7) {
            return <td>Decline</td>;
        } else if (state === 8) {
            return <td>Waiting for returning</td>;
        }
    };
    const sortingData = useMemo(() => {
        if (sortConfig !== null) {
            list.sort((a, b) => {
                if (sortConfig.key === 'assetCode') {
                    if (a.assetDTO.assetCode < b.assetDTO.assetCode)
                        return sortConfig.direction === "asc" ? -1 : 1;
                    if (a.assetDTO.assetCode > b.assetDTO.assetCode)
                        return sortConfig.direction === "asc" ? 1 : -1;
                }
                if (sortConfig.key === 'assetName') {
                    if (a.assetDTO.assetName < b.assetDTO.assetName)
                        return sortConfig.direction === "asc" ? -1 : 1;
                    if (a.assetDTO.assetName > b.assetDTO.assetName)
                        return sortConfig.direction === "asc" ? 1 : -1;
                }
                if (sortConfig.key === 'username') {
                    if (a.userDTO.username < b.userDTO.username)
                        return sortConfig.direction === "asc" ? -1 : 1;
                    if (a.userDTO.username > b.userDTO.username)
                        return sortConfig.direction === "asc" ? 1 : -1;
                }
                if (a[sortConfig.key] <= b[sortConfig.key]) {
                    return sortConfig.direction === "asc" ? -1 : 1;
                }
                if (a[sortConfig.key] >= b[sortConfig.key]) {
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
    let i = 1;
    return (
        <Container fluid className={"d-block ps-5"}>
            <h1 className={"text-danger mb-3"}>My Assignment</h1>
            <InputGroup className={"justify-content-between"}>
                <div className={"col-5 d-flex"}>
                    <InputGroup>
                        <Form.Control
                            as="select"
                            custom
                            className={"w-25"}
                            placeholder={"State"}
                            name={"state"}
                            onChange={handleFilterType}
                        >
                            <option>State</option>
                            <option value="5">Waiting for acceptance</option>
                            <option value="6">Accepted</option>
                            <option value="7">Decline</option>
                            <option value="8">Waiting for returning</option>
                        </Form.Control>
                        <Button variant={"outline-secondary"}>
                            <i className="bi bi-funnel-fill"/>
                        </Button>
                        <Form.Control
                            type={"date"}
                            className={"w-25 ms-5"}
                            placeholder={"Assigned Date"}
                            name={"assignedDate"}
                            onChange={handleFilterAssignedDate}
                        />
                    </InputGroup>
                </div>
                <div className={"col-6 d-flex justify-content-end"}>
                    <InputGroup className={"w-auto"}>
                        <FormControl
                            type={"input"}
                            name={"searchTerm"}
                            onChange={handleFilterSearch}
                            maxLength={255}
                        />
                        <Button
                            variant={"outline-secondary"}
                            onClick={handleFilterSearch}
                            className={"me-5"}
                        >
                            <i className={"bi bi-search"}/>
                        </Button>
                    </InputGroup>
                    <Button
                        variant={"danger"}
                        className={"w-auto"}
                        onClick={() => history.push("/createAssignment")}
                    >
                        Create new Assignment
                    </Button>

                </div>
            </InputGroup>
            <Row className={"mt-5"}>
                <Table>
                    <thead>
                    <tr>
                        <th
                            className={"border-bottom"}
                            className={getClassNamesFor("id")}
                            onClick={() => requestSort("id")}
                        >
                            No.
                        </th>
                        <th
                            className={"border-bottom"}
                            className={getClassNamesFor("assetCode")}
                            onClick={() => requestSort("assetCode")}
                        >
                            Asset Code
                        </th>
                        <th
                            className={"border-bottom"}
                            className={getClassNamesFor("assetName")}
                            onClick={() => requestSort("assetName")}
                        >
                            Asset Name
                        </th>
                        <th
                            className={"border-bottom"}
                            className={getClassNamesFor("username")}
                            onClick={() => requestSort("username")}
                        >
                            Assigned To
                        </th>
                        <th
                            className={"border-bottom"}
                            className={getClassNamesFor("assignedBy")}
                            onClick={() => requestSort("assignedBy")}
                        >
                            Assigned By
                        </th>
                        <th
                            className={"border-bottom"}
                            className={getClassNamesFor("assignedDate")}
                            onClick={() => requestSort("assignedDate")}
                        >
                            Assigned Date
                        </th>
                        <th
                            className={"border-bottom"}
                            className={getClassNamesFor("state")}
                            onClick={() => requestSort("state")}
                        >
                            State
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {list.slice(indexOfFirstUser, indexOfLastUser).map((assigment) => (
                        <Popup
                            contentStyle={{
                                width: "25%",
                                border: "1px solid black",
                                borderRadius: 10,
                                overflow: "hidden",
                                padding: "20px",
                            }}
                            trigger={
                                <tr key={assigment.id}>
                                    <td>{i++}</td>
                                    <td>{assigment.assetDTO.assetCode}</td>
                                    <td>{assigment.assetDTO.assetName}</td>
                                    <td>{assigment.userDTO.username}</td>
                                    <td>{assigment.assignedBy}</td>
                                    <td>{dateFormat(assigment.assignedDate, "dd/mm/yyyy")}</td>
                                    <td>{check(assigment.state)}</td>
                                    {assigment.state === 5
                                        ? (
                                            <>
                                                <td>
                                                    <i
                                                        className="bi bi-pen btn m-0 text-muted p-0 zoomin"
                                                        onClick={() =>
                                                            history.push(`/editassignment/${assigment.id}`)
                                                        }
                                                    />
                                                </td>
                                                <Popup
                                                    contentStyle={{
                                                        width: "25%",
                                                        border: "1px solid black",
                                                        borderRadius: 10,
                                                        overflow: "hidden",
                                                        padding: "20px",
                                                    }}
                                                    trigger={
                                                        <td>
                                                            <i className="bi bi-x-circle text-danger btn p-0 zoomin"/>
                                                        </td>
                                                    }
                                                    modal
                                                >
                                                    {close => <DeleteAssignment id={assigment.id} close={close}/>}
                                                </Popup>
                                                <Popup
                                                    trigger={
                                                        <td>
                                                            <i className="bi bi-arrow-counterclockwise text-blue fw-bold"
                                                               style={{color: "#8c9ce5"}}
                                                            />
                                                        </td>
                                                    }
                                                    modal
                                                    disabled
                                                >
                                                    {(close) => <ReturnPopup assigment={assigment}
                                                                             setState={setState}
                                                                             close={close}/>}
                                                </Popup>

                                            </>
                                        ) : (
                                            <>
                                                <td>
                                                    <i
                                                        className="bi bi-pen btn m-0 p-0"
                                                        style={{color: "#E0E0E0"}}
                                                    />
                                                </td>
                                                <td>
                                                    <i
                                                        className="bi bi-x-circle btn p-0"
                                                        style={{color: "#DAB5B6"}}
                                                    />
                                                </td>
                                                <Popup
                                                    trigger={
                                                        <td>
                                                            <i className="bi btn m-0 p-0 zoomin bi-arrow-counterclockwise text-blue fw-bold"
                                                            />
                                                        </td>
                                                    }
                                                    modal
                                                >
                                                    {(close) => <ReturnPopup assigment={assigment}
                                                                             setState={setState}
                                                                             close={close}/>}
                                                </Popup>
                                            </>
                                        )}
                                </tr>
                            }
                            modal
                        >
                            {(close) => (
                                <div>
                                    <ViewDetailAssignment id={assigment.id}/>
                                    <Button
                                        onClick={close}
                                        variant="success"
                                        className="btn-view-detail"
                                    >
                                        &times;
                                    </Button>
                                </div>
                            )}
                        </Popup>
                    ))}
                    </tbody>
                </Table>
            </Row>
            <Pagination
                className="pagnition"
                usersPerPage={usersPerPage}
                totalUsers={list.length}
                paginate={paginate}
            />
        </Container>
    );
};

export default ManageAssignment;
