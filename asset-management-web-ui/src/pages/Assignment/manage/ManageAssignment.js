import 'bootstrap/dist/css/bootstrap.min.css'
import 'reactjs-popup/dist/index.css';
import {Button, Container, Form, FormControl, InputGroup, Row, Table} from 'react-bootstrap';
import React, {useEffect, useState} from 'react';
import Popup from "reactjs-popup";
import axios from "axios";
import {useHistory} from 'react-router-dom'
import Pagination from '../../../components/Pagination/Pagination';
import DeleteAssignment from '../delete/DeleteAssignment';

const ManageAssignment = ({responseAssigment}) => {
    const rootAPI = process.env.REACT_APP_SERVER_URL;
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10);
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const paginate = pageNumber => setCurrentPage(pageNumber);
    const [list, setList] = useState([{
        id: null,
        assetDTO: {
            assetCode: null,
            assetName: null,
        },
        userDTO: {
            username: null,
        },
        assignedBy: null,
        assignedDate: null,
        state: null
    }]);
    const history = useHistory();
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        axios.get(rootAPI + '/assignments')
            .then(function (response) {
                let result = response.data.map(assigment => assigment.id);
                if (result.includes(responseAssigment)) {
                    const index = response.data.indexOf(responseAssigment);
                    response.data.splice(index, 1);
                    response.data.unshift(responseAssigment);
                    setList(response.data);
                } else {
                    setList(response.data);
                }
                console.log(response.data);
            })
    }, [])
    const check = state => {
        if (state === 6) {
            return <td>Accepted</td>
        } else if (state === 5) {
            return <td>Waiting for acceptance</td>
        }
    }
    const handleChange = evt => {
        setSearch(evt.target.value)
    }
    const [search, setSearch] = useState("");
    const [type, setType] = useState();
    const [date, setDate] = useState();
    const request = {
        params: {
            type,
            date
        }
    }
    const handleFilterType = evt => {
        const name = evt.target.name;
        setType(evt.target.value)
    }
    const handleFilterAssignedDate = evt => {
        const name = evt.target.name;
        setDate(evt.target.value)
    }
    useEffect(() => {
        console.log("use Effect Run")
        console.log(request)
        if (request.params.type === 'State') {
            request.params.type = null;
            console.log(request)
        }
        if (request.params.date === 'Assigned Date') {
            request.params.date= null;
            console.log(request)
        }
        axios.get(rootAPI + `/assignments/filter`, request)
            .then(function (response) {
                setList(response.data);
                console.log(response.data)
            })
    }, [type, date])

    const filterSearchBySearchTerm = () => {
        axios.get(rootAPI + `/assignments/search?keyword=${search}`)
            .then(function (response) {
                setList(response.data);
                console.log(response.data)
            })
    }
    if (search === null) {
        axios.get(rootAPI + '/assets')
            .then(function (response) {
                setList(response.data);
                console.log(response.data)
            })
    }
    return (
        <Container fluid className={"d-block ps-5"}>
            <h1 className={"text-danger mb-3"}>My Assigment</h1>
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
                            <option value="6">Accepted</option>
                            <option value="5">Waiting for acceptance</option>
                        </Form.Control>
                        <Button variant={"outline-secondary"}><i
                            className="bi bi-funnel-fill"/></Button>
                        <Form.Control
                            type={"date"}
                            className={"w-25 ms-5"}
                            placeholder={"Assigned Date"}
                            name={"assignedDate"}
                            onChange={handleFilterAssignedDate}
                        >
                        </Form.Control>
                    </InputGroup>
                </div>
                <div className={"col-5 d-flex"}>
                    <InputGroup>
                        <FormControl
                            type={"input"}
                            className={"w-25"}
                            name={"searchTerm"}
                            onChange={handleChange}
                        >
                        </FormControl>
                        <Button variant={"outline-secondary"}
                                onClick={filterSearchBySearchTerm}
                                className={"me-5"}
                        >Search
                        </Button>
                        <Button variant={"danger"}
                                className={"w-auto"}
                                onClick={() => history.push('/createAssignment')}
                        >Create new Assigment
                        </Button>
                    </InputGroup>
                </div>
            </InputGroup>
            <Row className={"mt-5"}>
                <Table>
                    <thead>
                    <tr>
                        <th className={"border-bottom"}>No.<i className="bi bi-caret-down-fill"/></th>
                        <th className={"border-bottom"}>Asset Code <i className="bi bi-caret-down-fill"/></th>
                        <th className={"border-bottom"}>Asset Name <i className="bi bi-caret-down-fill"/></th>
                        <th className={"border-bottom"}>Assigned To<i className="bi bi-caret-down-fill"/></th>
                        <th className={"border-bottom"}>Assigned By<i className="bi bi-caret-down-fill"/></th>
                        <th className={"border-bottom"}>Assigned Date<i className="bi bi-caret-down-fill"/></th>
                        <th className={"border-bottom"}>State<i className="bi bi-caret-down-fill"/></th>
                    </tr>
                    </thead>
                    <tbody>
                    {list.slice(indexOfFirstUser, indexOfLastUser).map(assigment =>
                        <Popup contentStyle={{
                            width: "25%", border: "1px solid black", borderRadius: 10,
                            overflow: 'hidden', padding: "20px"
                        }} trigger={
                            <tr key={assigment.id}>
                                <td>{assigment.id}</td>
                                <td>{assigment.assetDTO.assetCode}</td>
                                <td>{assigment.assetDTO.assetName}</td>
                                <td>{assigment.userDTO.username}</td>
                                <td>{assigment.assignedBy}</td>
                                <td>{assigment.assignedDate}</td>
                                <td>{check(assigment.state)}</td>
                                <td><i className="bi bi-pen btn m-0 text-muted p-0"
                                       onClick={() => history.push(`/editassignment/${assigment.id}`)}/></td>
                                <Popup contentStyle={{
                                    width: "25%", border: "1px solid black", borderRadius: 10,
                                    overflow: 'hidden', padding: "20px"
                                }}
                                       trigger={<td><i className="bi bi-x-circle text-danger btn p-0"/></td>}
                                       offsetX={200}
                                       modal>
                                    {assigment.state !== 6 ? <DeleteAssignment id={assigment.id} /> : null}
                                </Popup>
                                <td><i className="bi bi-arrow-counterclockwise text-blue fw-bold"/></td>
                            </tr>
                        } modal>
                            {close => (<div>
                            <Button onClick={close} variant="success" className="btn-view-detail">&times;</Button>
                        </div>)}
                        </Popup>
                    )}
                    </tbody>
                </Table>
            </Row>
            <Pagination className="pagnition"
                        usersPerPage={usersPerPage}
                        totalUsers={list.length}
                        paginate={paginate}
            >
            </Pagination>
        </Container>
    )
}

export default ManageAssignment;