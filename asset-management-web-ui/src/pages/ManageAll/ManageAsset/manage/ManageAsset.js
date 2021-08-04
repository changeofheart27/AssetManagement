import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button, Row, FormControl, Dropdown, SplitButton, Table, Container, InputGroup} from 'react-bootstrap';
import axios from "axios";
import {useHistory} from 'react-router-dom'
import './Manage.css'

const ManageAsset = () => {
    const [list, setList] = useState([{
        id: null,
        assetCode: null,
        assetName: null,
        specification: null,
        category: null,
        state: null
    }]);
    const history = useHistory();
    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/assets')
            .then(function (response) {
                setList(response.data);
                console.log(response.data)
            })
    }, [])
    const check = state => {
        if (state === 1) {
            return <p>Avaiable</p>
        } else if (state === 2) {
            return <p>Non Avaiable</p>
        } else if (state === 3) {
            return <p>Waiting for recycling</p>
        } else {
            return <p>Recycle</p>
        }
    }
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
                <Button variant={"danger"} className={"w-25 ms-5"} onClick={() => history.push('/createasset')}>Create
                    new Asset</Button>
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
                    {list.map(asset =>
                        <tr key={asset.id}>
                            <td>{asset.assetCode}</td>
                            <td>{asset.assetName}</td>
                            <td>{asset.category}</td>
                            <td>{check(asset.state)}</td>
                            <td><i className="bi bi-pen btn m-0 text-muted p-0"
                                   onClick={() => history.push(`/editasset/${asset.id}`)}/></td>
                            <td><i className="bi bi-x-circle text-danger btn p-0"/></td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </Row>
        </Container>
    );
};

export default ManageAsset;
