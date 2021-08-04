import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button, Row, FormControl, Dropdown, SplitButton, Table, Container, Form, InputGroup} from 'react-bootstrap';
import axios from "axios";
import {useHistory} from 'react-router-dom'
import './Manage.css'

const ManageUser = () => {
    const [list, setList] = useState();
    const history = useHistory();
    
    return (
        <Container className={"d-block ms-5"}>
            <h1 className={"text-danger mb-5"}>User List</h1>
            <Row className={"mb-5"}>
                <Dropdown className={"w-25"}>
                    <SplitButton title={"Type"}>
                        <Dropdown.Item>Type</Dropdown.Item>
                    </SplitButton>
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
                    <tr>
                        <td>SD1901</td>
                        <td>An Nguyen Thuy</td>
                        <td>annt</td>
                        <td>20/06/2019</td>
                        <td>Staff</td>
                        <td><i className="bi bi-pen btn m-0 text-muted p-0" onClick={() => history.push('/edituser')}/></td>
                        <td><i className="bi bi-x-circle text-danger btn p-0"/></td>
                    </tr>
                    </tbody>
                </Table>
            </Row>
        </Container>
    );
};

export default ManageUser;