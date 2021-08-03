import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button, Row, FormControl, Dropdown, SplitButton, Table, Container, Form} from 'react-bootstrap';
import axios from "axios";
import {useHistory} from 'react-router-dom'
import './Manage.css'


const Manage = () => {
    const [list, setList] = useState();
    const history = useHistory();
    return (
        <Container className={"d-block ms-5"}>
            <h1 className={"text-danger mb-5"}>User List</h1>
            <Row className={"mb-5"}>
                <Dropdown className={"w-25"}>
                    <SplitButton title={"Search by Type"} menuVariant={"dark"} id={""}>
                        <Dropdown.Item>Type</Dropdown.Item>
                    </SplitButton>
                </Dropdown>
                <FormControl
                    type={"input"}
                    className={"w-25 me-5"}
                >
                </FormControl>
                <Button variant={"danger"} className={"w-25 ms-5"}>Create new User</Button>
            </Row>
                <Row>
                    <Table>
                        <thead>
                        <th className={"border-bottom"}>Staff Code</th>
                        <th className={"border-bottom"}>Full Name</th>
                        <th className={"border-bottom"}>User Name</th>
                        <th className={"border-bottom"}>Joined Date</th>
                        <th className={"border-bottom"}>Type</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>SD1901</td>
                                <td>An Nguyen Thuy</td>
                                <td>annt</td>
                                <td>20/06/2019</td>
                                <td>Staff</td>
                                <td><button><i className="bi bi-pen"></i></button></td>
                                <td><button><i className="bi bi-x-circle"></i></button></td>
                            </tr>
                        </tbody>
                    </Table>
                </Row>
        </Container>
    );
};

export default Manage;