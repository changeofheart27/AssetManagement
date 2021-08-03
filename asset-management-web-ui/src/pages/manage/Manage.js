import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button, Row, FormControl, Dropdown, SplitButton, Table, Container} from 'react-bootstrap';
import axios from "axios";

const Manage = () => {
    const [list, setList] = useState();
    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/users')
            .then(function (response) {
                setList(response.data);
            })
            .catch(function (error) {
                console.log(error)
            })
    })
    return (
        <Container>
            <h1 className={"text-danger"}>User List</h1>
            <Row>
                <Dropdown className={"w-25 m-auto"}>
                    <SplitButton title={"Search by Type"} menuVariant={"dark"} id={""}>
                        <Dropdown.Item>Type</Dropdown.Item>
                    </SplitButton>
                </Dropdown>
                <FormControl
                    type={"input"}
                    className={"w-25 m-auto"}
                >
                </FormControl>
                <Button variant={"danger"} className={"w-25 m-auto"}>Create new User</Button>
            </Row>
            <Container className={"mt-5"}>
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
                                <td><button>Edit</button></td>
                                <td><button>Delete</button></td>
                            </tr>
                        </tbody>
                    </Table>
                </Row>
            </Container>
        </Container>
    );
};

export default Manage;