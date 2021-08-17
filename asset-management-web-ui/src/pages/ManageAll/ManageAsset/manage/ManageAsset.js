import 'bootstrap/dist/css/bootstrap.min.css'
import './Manage.css'
import 'reactjs-popup/dist/index.css';
import {Button, Container, Form, FormControl, InputGroup, Row, Table} from 'react-bootstrap';
import React, {useEffect, useMemo, useState} from 'react';
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
        });
    }, []);

    useEffect(() => {
        axios.get(rootAPI + '/assets')
            .then(function (response) {
                let result = response.data.map(asset => asset.id);
                if (result.includes(responseDataAsset.id)) {
                    const index = result.indexOf(responseDataAsset.id);
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
            return <td>Available</td>
        } else if (state === 1) {
            return <td>Not Available</td>
        } else if (state === 2) {
            return <td>Waiting for recycling</td>
        } else if (state === 3) {
            return <td>Recycled</td>
        } else if (state === 4) {
            return <td>Assigned</td>
        }
    }
    const [search, setSearch] = useState("");
    const handleChange = evt => {
        setSearch(evt.target.value);
    }
    const [type, setType] = useState();
    const [category, setCategory] = useState();
    const request = {
        params: {
            type,
            category
        }
    }
    const handleFilterType = evt => {
        const name = evt.target.name;
        setType(evt.target.value)
    }
    const handleFilterCategory = evt => {
        const name = evt.target.name;
        setCategory(evt.target.value)
    }
    useEffect(() => {
        console.log("use Effect Run")
        console.log(request)
        if (request.params.type === 'State') {
            request.params.type = null;
            console.log(request)
        }
        if (request.params.category === 'Category') {
            request.params.category = null;
            console.log(request)
        }
        axios.get(rootAPI + `/assets/filter`, request)
            .then(function (response) {
                setList(response.data);
                console.log(response.data)
            })
    }, [type, category])

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
        if (sortConfig !== null) {
            list.sort((a, b) => {
                if (a[sortConfig.key] < (b[sortConfig.key])) {
                    return sortConfig.direction === "asc" ? -1 : 1;
                }
                if (a[sortConfig.key] > (b[sortConfig.key])) {
                    return sortConfig.direction === "asc" ? 1 : -1;
                }
                return 0;
            })
        }
    }, [sortConfig]);
    const requestSort = key => {
        let direction = "asc";
        if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
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
    const initialState = {}
    const clearTypeState = () => {
        setType(null)
    }

    return (
        <Container fluid className={"d-block ps-5"}>
            <h1 className={"text-danger mb-3"}>Asset List</h1>
            <div className={"justify-content-between d-flex"}>
                <div className={"col-3 d-flex"}>
                    <InputGroup>
                        <Form.Control
                            as="select"
                            custom
                            name={"type"}
                            onChange={handleFilterType}
                        >
                            <option value={null}>State</option>
                            <option value="0">Available</option>
                            <option value="1">Not Available</option>
                            <option value="2">Waiting for recycling</option>
                            <option value="3">Recycled</option>
                            <option value="4">Assigned</option>
                        </Form.Control>
                        <Button
                            variant={"outline-secondary"}
                        >
                            <i className="bi bi-funnel-fill"/></Button>
                        <Form.Control
                            as="select"
                            custom
                            className={"ms-5"}
                            placeholder={"Category"}
                            name={"category"}
                            onChange={handleFilterCategory}
                        >
                            <option>Category</option>
                            {categories.map((category) => (
                                <option value={category.name}>{category.name}</option>
                            ))}
                        </Form.Control>
                        <Button variant={"outline-secondary"}><i
                            className="bi bi-funnel-fill"/></Button>
                    </InputGroup>
                </div>
                <div className={"col-8 d-flex justify-content-end"}>
                    <InputGroup className={"w-50"}>
                        <FormControl
                            type={"input"}
                            name={"searchTerm"}
                            onChange={handleChange}
                        >
                        </FormControl>
                        <Button variant={"outline-secondary"}
                                onClick={filterSearchBySearchTerm}
                                className={"me-5"}
                        ><i className="bi bi-search"/>
                        </Button>
                    </InputGroup>
                    <Button variant={"danger"} className={"w-auto"} onClick={() => history.push('/createasset')}>Create
                        new Asset</Button>

                </div>
            </div>
            <Row className={"mt-5"}>
                <Table>
                    <thead>
                    <tr>
                        <th className={"border-bottom"}
                            className={getClassNamesFor('assetCode')}
                            onClick={() => requestSort('assetCode')}>Asset Code
                        </th>
                        <th className={"border-bottom"}
                            className={getClassNamesFor('assetName')}
                            onClick={() => requestSort('assetName')}>Asset Name
                        </th>
                        <th className={"border-bottom"}
                            className={getClassNamesFor('categoryDTO.name')}
                            onClick={() => requestSort('category')}>Category
                        </th>
                        <th className={"border-bottom"}
                            className={getClassNamesFor('state')}
                            onClick={() => requestSort('state')}>State
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
                                {check(asset.state)}
                                <td><i className="bi bi-pen btn m-0 text-muted p-0"
                                       onClick={() => history.push(`/editasset/${asset.id}`)}/></td>
                                <Popup contentStyle={{
                                    width: "25%", border: "1px solid black", borderRadius: 10,
                                    overflow: 'hidden', padding: "20px"
                                }}
                                       trigger={<td><i className="bi bi-x-circle text-danger btn p-0"/></td>}
                                       modal>
                                    {asset.state !== 4 ?
                                        close => <Delete id={asset.id} close={close} setList={setList}/> :
                                        close => <DeleteFail id={asset.id} close={close}/>}
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