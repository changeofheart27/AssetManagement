import 'bootstrap/dist/css/bootstrap.min.css'

import 'reactjs-popup/dist/index.css';

import {Button, Container, Form, FormControl, InputGroup, Row, Table} from 'react-bootstrap';
import React, {useEffect, useState} from 'react';


import Popup from "reactjs-popup";

import axios from "axios";
import {useHistory} from 'react-router-dom'
import ViewDetailedAsset from '../ManageAll/ManageAsset/viewDetails/ViewDetailedAsset';
import Pagination from '../../components/Pagination/Pagination';
import DeleteFail from '../ManageAll/ManageAsset/delete/DeleteFail';
import Delete from '../ManageAll/ManageAsset/delete/Delete';
const Home = ({responseDataAsset}) => {
    const rootAPI = process.env.REACT_APP_SERVER_URL;
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10);
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const paginate = pageNumber => setCurrentPage(pageNumber);
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
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        axios.get(rootAPI + "/categories").then((response) => {
            setCategories(response.data);
        }, []);
    }, []);

    useEffect(() => {
        axios.get(rootAPI + '/assets')
            .then(function (response) {
                let result = response.data.map(asset => asset.id);
                if (result.includes(responseDataAsset.id)) {
                    const index = response.data.indexOf(responseDataAsset);
                    response.data.splice(index, 1);
                    response.data.unshift(responseDataAsset);
                    setList(response.data);
                } else {
                    setList(response.data);
                }
                console.log(response.data);
            })
    }, [])
    const check = state => {
        if (state === 0) {
            return <p>Available</p>
        } else if (state === 1) {
            return <p>Not Available</p>
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
        axios.get(rootAPI + `/assets/state/${search}`)
            .then(function (response) {
                setList(response.data);
                console.log(response.data)
            })
    }
    const filterSearchByCategory = () => {
        axios.get(rootAPI + `/assets/category/${search}`)
            .then(function (response) {
                setList(response.data);
                console.log(response.data)
            })
    }
    const filterSearchBySearchTerm = () => {
        axios.get(rootAPI + `/assets/search?keyword=${search}`)
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
        <div>
            
            <Container className={"d-block ms-5"}>
            <h1 className={"text-danger mb-5"}>My Assigment</h1>
            <Row className={"mb-5"}>
                <InputGroup className={"w-25"}>
                    <Form.Control
                        as="select"
                        custom
                        className={"w-25"}
                        placeholder={"State"}
                        name={"type"}
                        onChange={handleChange}
                    >
                        <option>None</option>
                        <option value="0">Available</option>
                        <option value="1">Not Available</option>
                        <option value="2">Waiting for recycling</option>
                        <option value="3">Recycle</option>
                    </Form.Control>
                    <Button variant={"outline-secondary"} onClick={filterSearchByState}><i
                        className="bi bi-funnel-fill"/></Button>
                </InputGroup>
                <InputGroup className={"w-25"}>
                    <Form.Control
                        as="select"
                        custom
                        className={"w-25"}
                        placeholder={"Category"}
                        name={"category"}
                        onChange={handleChange}
                    >
                        <option>None</option>
                        {categories.map((category) => (
                            <option value={category.name}>{category.name}</option>
                        ))}

                    </Form.Control>
                    <Button variant={"outline-secondary"} onClick={filterSearchByCategory}><i
                        className="bi bi-funnel-fill"/></Button>
                </InputGroup>
                <InputGroup className={"w-25"}>
                    <FormControl
                        type={"input"}
                        className={""}
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
                        <th className={"border-bottom"}>No.<i className="bi bi-caret-down-fill"/></th>
                        <th className={"border-bottom"}>Asset Code <i className="bi bi-caret-down-fill"/></th>
                        <th className={"border-bottom"}>Asset Name <i className="bi bi-caret-down-fill"/></th>
                        <th className={"border-bottom"}>Asigned To<i className="bi bi-caret-down-fill"/></th>
                        <th className={"border-bottom"}>Asigned By<i className="bi bi-caret-down-fill"/></th>
                        <th className={"border-bottom"}>Asigned Date<i className="bi bi-caret-down-fill"/></th>
                        <th className={"border-bottom"}>Sate<i className="bi bi-caret-down-fill"/></th>
                    </tr>
                    </thead>
                    <tbody>
                    {list.slice(indexOfFirstUser, indexOfLastUser).map(asset =>
                       <Popup contentStyle={{width: "25%" ,border: "1px solid black" , borderRadius: 10,
                       overflow: 'hidden', padding: "20px"}} trigger={  
                       <tr key={asset.id}>
                            <td>"No."</td>
                            <td>{asset.assetCode}</td>
                            <td>{asset.assetName}</td>
                            <td>"Asigned To"</td>
                            <td>"Asigned By"</td>
                            <td>"Asigned Date"</td>
                            <td>{check(asset.state)}</td>
                            <td><i className="bi bi-pen btn m-0 text-muted p-0"
                                   onClick={() => history.push(`/editasset/${asset.id}`)}/></td>
                            <Popup contentStyle={{
                                width: "25%", border: "1px solid black", borderRadius: 10,
                                overflow: 'hidden', padding: "20px"
                            }}
                                   trigger={<td><i className="bi bi-x-circle text-danger btn p-0"/></td>} offsetX={200}
                                   modal>
                                {asset.state !== 1 ? <Delete id={asset.id}/> : <DeleteFail id={asset.id}/>}
                            </Popup>
                        </tr>
                        } modal>{close=>(  <div>
                            <ViewDetailedAsset id={asset.id} />
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
        </div>
    )
}

export default Home;