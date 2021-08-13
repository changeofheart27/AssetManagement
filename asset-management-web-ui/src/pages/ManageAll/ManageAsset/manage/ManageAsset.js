import 'bootstrap/dist/css/bootstrap.min.css'
import './Manage.css'
import 'reactjs-popup/dist/index.css';

import {Button, Container, Form, FormControl, InputGroup, Row, Table} from 'react-bootstrap';
import React, { useMemo, useEffect, useState} from 'react';

import Delete from "../delete/Delete";
import DeleteFail from "../delete/DeleteFail";
import Pagination from '../../../../components/Pagination/Pagination'
import Popup from "reactjs-popup";
import ViewDetailedAsset from "../viewDetails/ViewDetailedAsset"
import axios from "axios";
import {useHistory} from 'react-router-dom'

const ManageAsset = ({responseDataAsset}) => {
    const rootAPI = process.env.REACT_APP_SERVER_URL;
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10);
    const [sortConfig, setSortConfig] = useState(null);
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
                    const index = response.data.findIndex(() => responseDataAsset.id);
                    console.log(index, " index")
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
    const [search, setSearch] = useState("");
    const handleChange = evt => {
        setSearch(evt.target.value);
    }
    const handleChangeState = evt => {
        const target = evt.target.value;
        axios.get(rootAPI + `/assets/state/${target}`)
            .then(function (response) {
                setList(response.data);
                console.log(response.data)
            });
    }
    const handleChangeCategory = evt => {
        const target = evt.target.value;
        axios.get(rootAPI + `/assets/category/${target}`)
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
            <h1 className={"text-danger mb-3"}>Asset List</h1>
            <InputGroup className={"justify-content-between"}>
                <div className={"col-5 d-flex"}>
                    <Form.Control
                        as="select"
                        custom
                        className={"w-25"}
                        name={"type"}
                        onChange={handleChangeState}
                    >
                        <option value={"999"}>State</option>
                        <option value="0">Available</option>
                        <option value="1">Not Available</option>
                        <option value="2">Waiting for recycling</option>
                        <option value="3">Recycle</option>
                    </Form.Control>
                    <Button
                        variant={"outline-secondary"}
                    >
                        <i className="bi bi-funnel-fill"/></Button>
                    <Form.Control
                        as="select"
                        custom
                        className={"w-25 ms-5"}
                        placeholder={"Category"}
                        name={"category"}
                        onChange={handleChangeCategory}
                    >
                        <option>Category</option>
                        {categories.map((category) => (
                            <option value={category.name}>{category.name}</option>
                        ))}
                    </Form.Control>
                    <Button variant={"outline-secondary"} onClick={filterSearchByCategory}><i
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
                    <Button variant={"outline-secondary"}
                            onClick={filterSearchBySearchTerm}
                            className={"me-5"}
                    ><i className="bi bi-search"/>
                    </Button>
                    <Button variant={"danger"} className={"w-25"} onClick={() => history.push('/createasset')}>Create
                        new Asset</Button>
                </div>

            </InputGroup>
            <Row className={"mt-5"}>
                <Table>
                <thead>
                    <tr>
                        <th className={"border-bottom"} 
                            className={getClassNamesFor('assetCode')} 
                            onClick={() => requestSort('assetCode') }>Asset Code<i className="bi bi-caret-down-fill"/>
                        </th>
                        <th className={"border-bottom"} 
                            className={getClassNamesFor('assetName')} 
                            onClick={() => requestSort('assetName')}>Asset Name<i className="bi bi-caret-down-fill"/>
                        </th>
                        <th className={"border-bottom"} 
                            className={getClassNamesFor('categoryDTO.name')} 
                            onClick={() => requestSort('category')}>Category<i className="bi bi-caret-down-fill"/>
                        </th>
                        <th className={"border-bottom"} 
                            className={getClassNamesFor('state')} 
                            onClick={() => requestSort('state')}>State<i className="bi bi-caret-down-fill"/>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {list.slice(indexOfFirstUser, indexOfLastUser).map(asset =>
                        <Popup key={asset.id} contentStyle={{
                            width: "25%", border: "1px solid black", borderRadius: 10,
                            overflow: 'hidden', padding: "20px"
                        }} trigger={
                            <tr key={asset.id}>
                                <td>{asset.assetCode}</td>
                                <td>{asset.assetName}</td>
                                <td>{asset.categoryDTO.name}</td>
                                <td>{check(asset.state)}</td>
                                <td><i className="bi bi-pen btn m-0 text-muted p-0"
                                       onClick={() => history.push(`/editasset/${asset.id}`)}/></td>
                                <Popup contentStyle={{
                                    width: "25%", border: "1px solid black", borderRadius: 10,
                                    overflow: 'hidden', padding: "20px"
                                }}
                                       trigger={<td><i className="bi bi-x-circle text-danger btn p-0"/></td>}
                                       modal>
                                    {asset.state !== 1 ? <Delete id={asset.id}/> : <DeleteFail id={asset.id}/>}
                                </Popup>
                            </tr>
                        } modal>{close => (<div>
                            <ViewDetailedAsset id={asset.id}/>
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

export default ManageAsset;