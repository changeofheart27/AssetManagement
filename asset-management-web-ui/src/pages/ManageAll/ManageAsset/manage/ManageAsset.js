import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button, Row, FormControl, Dropdown, SplitButton, Table, Container, InputGroup} from 'react-bootstrap';
import axios from "axios";
import {useHistory} from 'react-router-dom'
import './Manage.css'
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import DeleteAsset from "../delete/DeleteAsset";
import Delete from "../delete/Delete";
import DeleteFail from "../delete/DeleteFail";

const ManageAsset = () => {
    const [list, setList] = useState([{
        id: null,
        assetCode: null,
        assetName: null,
        specification: null,
        category: null,
        state: null,
        categoryDTO: {
            name: null
        }
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
        if (state === 0) {
            return <p>Avaiable</p>
        } else if (state === 1) {
            return <p>Not Avaiable</p>
        } else if (state === 2) {
            return <p>Waiting for recycling</p>
        } else if (state === 3) {
            return <p>Recycle</p>
        }
    }
    const handleChange = evt => {
        setSearch(evt.target.value)
    }
    const [search, setSearch] = useState("");

    const filterSearchByState = () => {
        axios.get(`http://localhost:8080/api/v1/assets/state/${search}`)
            .then(function (response) {
                setList(response.data);
                console.log(response.data)
            })
    }
    const filterSearchByCategory = () => {
        axios.get(`http://localhost:8080/api/v1/assets/category/${search}`)
            .then(function (response) {
                setList(response.data);
                console.log(response.data)
            })
    }
    const filterSearchBySearchTerm = () => {
        axios.get(`http://localhost:8080/api/v1/assets/search?keyword=${search}`)
            .then(function (response) {
                setList(response.data);
                console.log(response.data)
            })
    }
    if (search === null) {
        axios.get('http://localhost:8080/api/v1/assets')
            .then(function (response) {
                setList(response.data);
                console.log(response.data)
            })
    }

    return (
        <Container className={"d-block ms-5"}>
            <h1 className={"text-danger mb-5"}>Asset List</h1>
            <Row className={"mb-5"}>
                <InputGroup className={"w-25"}>
                    <FormControl
                        type={"input"}
                        className={"w-25"}
                        placeholder={"State"}
                        name={"type"}
                        onChange={handleChange}
                    >
                    </FormControl>
                    <Button variant={"outline-secondary"} onClick={filterSearchByState}><i
                        className="bi bi-funnel-fill"/></Button>
                </InputGroup>
                <InputGroup className={"w-25"}>
                    <FormControl
                        type={"input"}
                        className={"w-25"}
                        placeholder={"Category"}
                        name={"category"}
                        onChange={handleChange}
                    >
                    </FormControl>
                    <Button variant={"outline-secondary"} onClick={filterSearchByCategory}><i
                        className="bi bi-funnel-fill"/></Button>
                </InputGroup>
                <InputGroup className={"w-25"}>
                    <FormControl
                        type={"input"}
                        className={"w-25"}
                        name={"searchTerm"}
                        onChange={handleChange}
                    >
                    </FormControl>
                    <Button variant={"outline-secondary"} onClick={filterSearchBySearchTerm}>Search</Button>
                </InputGroup>
                <Button variant={"danger"} className={"w-25"} onClick={() => history.push('/createasset')}>Create
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
                            <td>{asset.categoryDTO.name}</td>
                            <td>{check(asset.state)}</td>
                            <td><i className="bi bi-pen btn m-0 text-muted p-0"
                                   onClick={() => history.push(`/editasset/${asset.id}`)}/></td>
                            <Popup contentStyle={{width: "25%" ,border: "1px solid black" , borderRadius: 10,
                                overflow: 'hidden', padding: "20px"}}
                                trigger={<td><i className="bi bi-x-circle text-danger btn p-0"/></td>} offsetX={200}
                                   modal>
                                {asset.state !== 1 ? <Delete id={asset.id}/> : <DeleteFail id={asset.id}/>}
                            </Popup>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </Row>
        </Container>
    );
};

export default ManageAsset;
