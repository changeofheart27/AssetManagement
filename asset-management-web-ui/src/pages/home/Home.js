import 'bootstrap/dist/css/bootstrap.min.css'
import 'reactjs-popup/dist/index.css';
import {Button, Container, Form, FormControl, InputGroup, Row, Table} from 'react-bootstrap';
import React, {useEffect, useState} from 'react';
import Popup from "reactjs-popup";
import axios from "axios";
import {useHistory} from 'react-router-dom'
import Pagination from '../../components/Pagination/Pagination';
import ReturnPopup from "./popup/ReturnPopup";
import '../../style/style.css'
import AcceptPopup from "./popup/AcceptPopup";
import DeclinePopup from "./popup/DeclinePopup";

const Home = ({responseAssigment}) => {
    const rootAPI = process.env.REACT_APP_SERVER_URL;
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10);
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const paginate = pageNumber => setCurrentPage(pageNumber);
    const [list, setList] = useState([{
        id: null,
        assetDTO: {
            id: null,
            assetCode: null,
            assetName: null,
            state: null,
            categoryDTO:{
                name: null
            },

        },
        userDTO: {
            username: null,
        },
        assignedDate: null,
        state: null

    }]);
    const authority = localStorage.getItem("authority");
    const history = useHistory();
    const Authentoken = localStorage.getItem("jwttoken");
    useEffect(() => {
            axios.get(rootAPI + '/users/home?username=' + localStorage.getItem("username"), {
                    headers: {
                        Authorization: Authentoken
                    }
                }
            )
                .then(function (response) {
                    let result = response.data.map(assigment => assigment.id);
                    if (result.includes(responseAssigment.id)) {
                        const index = response.data.indexOf(responseAssigment);
                        response.data.splice(index, 1);
                        response.data.unshift(responseAssigment);
                        setList(response.data);
                    } else {
                        setList(response.data);
                    }
                    console.log(response.data);
                }).catch((error) => {
                console.log(localStorage.getItem("username"))
                console.log(localStorage.getItem("jwttoken"))
            });
    }, [])
    const check = state => {
        if (state === 6) {
            return <td>Accepted</td>
        } else if (state === 5) {
            return <td>Waiting for acceptance</td>
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
    const PopupStyle = {
        width: "500px",
        border: "none",
        padding: "0",
        borderRadius: "5px"
    }
    return (
        <Container fluid className={"d-block ps-5"}>
            <h1 className={"text-danger mb-5"}>My Assigment</h1>
            <Row className={"mt-5"}>
                <Table>
                    <thead>
                    <tr>
                        <th className={"border-bottom"}>No.<i className="bi bi-caret-down-fill"/></th>
                        <th className={"border-bottom"}>Asset Code <i className="bi bi-caret-down-fill"/></th>
                        <th className={"border-bottom"}>Asset Name <i className="bi bi-caret-down-fill"/></th>
                        <th className={"border-bottom"}>Category<i className="bi bi-caret-down-fill"/></th>
                        <th className={"border-bottom"}>Assigned Date<i className="bi bi-caret-down-fill"/></th>
                        <th className={"border-bottom"}>State<i className="bi bi-caret-down-fill"/></th>
                    </tr>
                    </thead>
                    <tbody>
                    {list.slice(indexOfFirstUser, indexOfLastUser).map(assigment =>
                        <Popup contentStyle={{
                            width: "25%", border: "1px solid black", borderRadius: 10,
                            overflow: 'hidden', padding: "20px"
                        }} trigger={
                            <tr key={assigment.id}>
                                <td>{assigment.id}</td>
                                <td>{assigment.assetDTO.assetCode}</td>
                                <td>{assigment.assetDTO.assetName}</td>
                                <td>{assigment.assetDTO.categoryDTO.name}</td>
                                <td>{assigment.assignedDate}</td>
                                <td>{check(assigment.state)}</td>
                                <Popup
                                    trigger={<td><i className="bi bi-check-lg btn m-0 text-danger p-0"/></td>}
                                    modal
                                    contentStyle={PopupStyle}
                                >
                                    {close =><AcceptPopup close={close} assigment={assigment} setList={setList}/>}
                                </Popup>

                                <Popup contentStyle={PopupStyle}
                                       trigger={<td><i className="bi bi-x-lg btn p-0"/></td>}
                                       modal>
                                    {close => <DeclinePopup close={close} id={assigment.assetDTO.id}/>}
                                </Popup>
                                <Popup
                                    trigger={assigment.assetDTO.state ===5 ?
                                        <td><i className="bi bi-arrow-counterclockwise text-blue"/></td>
                                        :
                                        <td><i className="bi bi-arrow-counterclockwise text-blue"/></td>
                                    }
                                    modal
                                    contentStyle={PopupStyle}
                                >
                                    {close => <ReturnPopup close={close} id={assigment.assetDTO.id}/>}

                                </Popup>
                            </tr>
                        } modal>{close => (<div>
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
    )
}

export default Home;