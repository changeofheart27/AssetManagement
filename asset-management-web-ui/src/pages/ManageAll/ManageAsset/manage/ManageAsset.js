import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button, Row, FormControl, Dropdown, SplitButton, Table, Container, Form, InputGroup} from 'react-bootstrap';
import axios from "axios";
import {useHistory} from 'react-router-dom'
import './Manage.css'

const ManageAsset = () => {
    const [list, setList] = useState();
    const history = useHistory();
    return (
        <Container className={"d-block ms-5"}>
            <h1 className={"text-danger mb-5"}>Asset List</h1>
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
                <Button variant={"danger"} className={"w-25 ms-5"} onClick={() => history.push('/createasset')}>Create new Asset</Button>
            </Row>
            <Row>
                <Table>
                    <thead>
                    <tr>
                        <th className={"border-bottom"}>Asset Code <i className="bi bi-caret-down-fill"/></th>
                        <th className={"border-bottom"}>Asset Name <i className="bi bi-caret-down-fill"/></th>
                        <th className={"border-bottom"}>Category<i className="bi bi-caret-down-fill"/></th>
                        <th className={"border-bottom"}>State<i className="bi bi-caret-down-fill"/></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>LA100001</td>
                        <td>Laptop HP Probook 450 G1</td>
                        <td>Laptop</td>
                        <td>Available</td>
                        <td><i className="bi bi-pen btn m-0 text-muted p-0" onClick={() => history.push('/editasset')}/></td>
                        <td><i className="bi bi-x-circle text-danger btn p-0"/></td>
                    </tr>
                    <tr>
                        <td>MO100001</td>
                        <td>Monitor Dell UltraSharp</td>
                        <td>Monitor</td>
                        <td>Not Available</td>
                        <td><i className="bi bi-pen btn m-0 text-muted p-0" onClick={() => history.push('/editasset')}/></td>
                        <td><i className="bi bi-x-circle text-danger btn p-0"/></td>
                    </tr>
                    </tbody>
                </Table>
            </Row>
        </Container>
    );
};

export default ManageAsset;
