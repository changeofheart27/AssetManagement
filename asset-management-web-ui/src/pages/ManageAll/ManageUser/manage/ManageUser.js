import 'bootstrap/dist/css/bootstrap.min.css'
import './Manage.css'
import 'reactjs-popup/dist/index.css';

import {Button, Container, Dropdown, Form, FormControl, InputGroup, Row, SplitButton, Table} from 'react-bootstrap';
import {useMemo, useEffect, useState} from 'react';

import ChangeStatus from '../changeStatus/ChangeStatus';
import Pagination from '../../../../components/Pagination/Pagination'
import Popup from "reactjs-popup";
import React from 'react';
import ViewDetailedUser from "../viewDetails/ViewDetailedUser"
import axios from "axios";
import {useHistory} from 'react-router-dom'

const ManageUser = ({responseUser}) => {
    const rootAPI = process.env.REACT_APP_SERVER_URL;
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10);
    const [sortConfig, setSortConfig] = useState(null);
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;

    const paginate = pageNumber => setCurrentPage(pageNumber);


    const history = useHistory();
    const [search, setSearch] = useState("");
    const [list, setList] = useState([{
        staffCode: null,
        firstName: null,
        lastName: null,
        username: null,
        joinedDate: null,
        type: null,
        status: null
    }]);
    useEffect(() => {
        axios.get(rootAPI + '/users')
            .then(response => {
                let result = response.data.map(user => user.id);
                if (result.includes(responseUser.id)) {
                    const index = result.indexOf(responseUser.id);
                    response.data.splice(index, 1);
                    response.data.unshift(responseUser);
                    setList(response.data);
                } else {
                    setList(response.data);
                }
                console.log(response.data);
            })
    }, [])
    const handleChange = evt => {
        setSearch(evt.target.value)
        console.log(search)
    }
    const handleChangeType = evt => {
        const target = evt.target.value;
        axios.get(rootAPI + `/users/filter?type=${target}`)
            .then(function (response) {
                setList(response.data);
                console.log(response.data)
            })
    }
    const filterSearchBySearchTerm = () => {
        axios.get(rootAPI + `/users/searchby?keyword=${search}`)
            .then(function (response) {
                setList(response.data);
                console.log(response.data)
            })
    }
    const filterSearchByType = () => {
        axios.get(rootAPI + `/users/filter?type=${search}`)
            .then(function (response) {
                setList(response.data);
                console.log(response.data)
            })
    }

    const sortingData = useMemo(() => {
        let listData = list;
        if (sortConfig !== null) {
        listData.sort((a, b) => {
            if(a[sortConfig.key] < (b[sortConfig.key])) { 
                return sortConfig.direction === "asc" ? -1 : 1;
            }
            if(a[sortConfig.key] > (b[sortConfig.key])) {
                return sortConfig.direction === "asc" ? 1 : -1;
            }
            return 0;
            })
        }
    },[list, sortConfig]);
    const requestSort = key => {
        let direction = "asc";
        if(sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({key, direction});
    }
    const getClassNamesFor = (name) => {
        if (!sortConfig) {
          return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };

    return (
        <Container fluid className={"d-block ps-5"}>
            <h1 className={"text-danger mb-3"}>User List</h1>
            <InputGroup className={"justify-content-between"}>
                <div className={"col-5 d-flex"}>
                    <Form.Control
                        as="select"
                        custom
                        className={"w-25"}
                        placeholder={"Type"}
                        name={"type"}
                        onChange={handleChangeType}
                    >
                        <option value={""}>Type</option>
                        <option value="Admin">Admin</option>
                        <option value="Staff">Staff</option>
                    </Form.Control>
                    <Button variant={"outline-secondary"}><i
                        className="bi bi-funnel-fill"/></Button>
                </div>
                <div className={"col-5 d-flex"}>
                    <FormControl
                        type={"input"}
                        className={"w-25"}
                        name={"searchTerm"}
                        onChange={handleChange}
                    >
                    </FormControl>
                    <Button variant={"outline-secondary"} onClick={filterSearchBySearchTerm}>Search</Button>

                    <Button variant={"danger"} className={"w-auto ms-5"} onClick={() => history.push('/createuser')}>Create
                        new User</Button>
                </div>
            </InputGroup>
            <Row className={"mt-5"}>
                <Table>
                <thead>
                    <tr>
                        <th className={"border-bottom"}
                            className={getClassNamesFor('staffCode')} 
                            onClick={() => requestSort('staffCode') }>Staff Code<i className="bi bi-caret-down-fill"/>
                        </th>
                        <th className={"border-bottom"}
                            className={getClassNamesFor('lastName')} 
                            onClick={() => requestSort('lastName') }>Full Name<i className="bi bi-caret-down-fill"/>
                        </th>
                        <th className={"border-bottom"}
                            className={getClassNamesFor('username')} 
                            onClick={() => requestSort('username') }>User Name<i className="bi bi-caret-down-fill"/>
                        </th>
                        <th className={"border-bottom"}
                            className={getClassNamesFor('joinedDate')} 
                            onClick={() => requestSort('joinedDate') }>Joined Date<i className="bi bi-caret-down-fill"/>
                        </th>
                        <th className={"border-bottom"}
                            className={getClassNamesFor('type')} 
                            onClick={() => requestSort('type') }>Type<i className="bi bi-caret-down-fill"/>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {list.slice(indexOfFirstUser, indexOfLastUser).map(user =>
                        <Popup key={user.id} contentStyle={{
                            width: "25%", border: "1px solid black", borderRadius: 10,
                            overflow: 'hidden', padding: "20px"
                        }} trigger={

                            <tr key={user.id}>
                                <td>{user.staffCode}</td>
                                <td>{user.firstName} {user.lastName}</td>
                                <td>{user.username}</td>
                                <td>{user.joinedDate}</td>
                                <td>{user.type}</td>
                                <td><i className="bi bi-pen btn m-0 text-muted p-0"
                                       onClick={() => history.push(`/edituser/${user.id}`)}/></td>
                                <Popup contentStyle={{
                                    width: "25%", border: "1px solid black", borderRadius: 10,
                                    overflow: 'hidden', padding: "20px"
                                }} trigger={user.status === "enable"
                                    ?
                                    <td><i className="bi bi-x-circle text-danger btn p-0"/></td>
                                    :
                                    <td><i className="bi bi-x-circle text-danger btn p-0 disabled text-dark"/></td>}
                                       modal>
                                    <ChangeStatus id={user.id}/>
                                </Popup>
                            </tr>
                        } modal>{close => (<div>
                            <ViewDetailedUser id={user.id}/>
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
    );
};

export default ManageUser;