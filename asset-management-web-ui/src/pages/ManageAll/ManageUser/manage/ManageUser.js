import 'bootstrap/dist/css/bootstrap.min.css'
import './Manage.css';

import {Button, Container, Dropdown, FormControl, InputGroup, Row, SplitButton, Table} from 'react-bootstrap';
import {useEffect, useState} from 'react';

import React from 'react';
import axios from "axios";
import {useHistory} from 'react-router-dom'

const ManageUser = () => {
    const history = useHistory();
    const [search, setSearch] = useState("Select");
    const [list, setList] = useState([{
        staffCode:null,
        firstName:null,
        lastName: null,
        username: null,
        joinedDate: null,
        type: null
    }]);
    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/users')
            .then(function (response) {
                setList(response.data);
                console.log(response.data)
            })
    }, [])
    return (
        <Container className={"d-block ms-5"}>
            <h1 className={"text-danger mb-5"}>User List</h1>
            <Row className={"mb-5"}>
                <Dropdown className={"w-25"}>
                <Dropdown.Toggle variant={"danger"}>
                        {search}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={()=>setSearch("Type")}>Type</Dropdown.Item>
                        <Dropdown.Item  onClick={()=>setSearch("Staff Code")}>Staff Code</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <InputGroup className={"w-auto"}>
                    <FormControl
                        type={"input"}
                        className={"w-25"}
                    >
                    </FormControl>
                    <InputGroup.Text>Search</InputGroup.Text>
                </InputGroup>
                <Button variant={"danger"} className={"w-25 ms-5"} onClick={() => history.push('/createuser')}>Create new User</Button>
            </Row>
            <Row>
                <Table>
                    <thead>
                    <tr>
                        <th className={"border-bottom"}>Staff Code<i className="bi bi-caret-down-fill"/></th>
                        <th className={"border-bottom"}>Full Name<i className="bi bi-caret-down-fill"/></th>
                        <th className={"border-bottom"}>User Name</th>
                        <th className={"border-bottom"}>Joined Date<i className="bi bi-caret-down-fill"/></th>
                        <th className={"border-bottom"}>Type<i className="bi bi-caret-down-fill"/></th>
                    </tr>
                    </thead>
                    <tbody>
                    {list.map(user =>
                        <tr key={user.id}>
                            <td>{user.staffCode}</td>
                            <td>{user.firstName} {user.lastName}</td>
                            <td>{user.username}</td>
                            <td>{user.joinedDate}</td>
                            <td>{user.type}</td>
                            <td><i className="bi bi-pen btn m-0 text-muted p-0"
                                   onClick={() => history.push(`/edituser/${user.id}`)}/></td>
                            <td><i className="bi bi-x-circle text-danger btn p-0"/></td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </Row>
        </Container>
    );
};

export default ManageUser;