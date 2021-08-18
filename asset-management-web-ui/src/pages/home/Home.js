import 'bootstrap/dist/css/bootstrap.min.css'
import 'reactjs-popup/dist/index.css';
import {Button, Container, Row, Table} from 'react-bootstrap';
import React, {useEffect, useState} from 'react';
import Popup from "reactjs-popup";
import axios from "axios";
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
            categoryDTO: {
                name: null
            },
        },
        userDTO: {
            username: null,
        },
        assignedDate: null,
        state: null
    }]);
    const [state, setState] = useState({
        state: null
    });
    const Authentoken = localStorage.getItem("jwttoken");
    useEffect(() => {
        axios.get(rootAPI + '/users/home?username=' + localStorage.getItem("username"), {
                headers: {
                    Authorization: Authentoken
                }
            }
        )
            .then(response => {
                    setList(response.data)
                    setState(response.data.state)
                    console.log(response.data)
                }
            ).catch((error) => {
            console.log(localStorage.getItem("username"))
            console.log(localStorage.getItem("jwttoken"))
        });
    }, [state])
    console.log(state + " state")
    console.log(list + " list")
    const check = state => {
        if (state === 6) {
            return <td>Accepted</td>
        } else if (state === 5) {
            return <td>Waiting for acceptance</td>
        } else if (state === 7) {
            return <td>Decline</td>
        }
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
                    {list.map(assigment =>
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
                                {assigment.state === 5 ?
                                    <Popup
                                        trigger={<td><i className="bi bi-check-lg btn m-0 p-0 text-danger "/></td>}
                                        modal
                                        contentStyle={PopupStyle}
                                    >
                                        {close => <AcceptPopup close={close} assigment={assigment}
                                                               setState={setState}/>}
                                    </Popup>
                                    :
                                    <Popup
                                        trigger={<td><i className="bi bi-check-lg btn m-0 p-0 text-danger disabled "/>
                                        </td>}
                                        modal
                                        disabled
                                        contentStyle={PopupStyle}
                                    >
                                        {close => <AcceptPopup close={close} assigment={assigment}
                                                               setState={setState}/>}
                                    </Popup>
                                }
                                {assigment.state === 5 ?
                                    <Popup contentStyle={PopupStyle}
                                           trigger={<td><i className="bi bi-x-lg btn m-0 p-0"/></td>}
                                           modal>
                                        {close => <DeclinePopup close={close} setState= {setState} assigment={assigment}/>}
                                    </Popup>
                                    :
                                    <Popup contentStyle={PopupStyle}
                                           trigger={<td><i className="bi bi-x-lg btn m-0 p-0 disabled"/></td>}
                                           disabled
                                           modal>
                                        {close => <DeclinePopup close={close} id={assigment.assetDTO.id}/>}
                                    </Popup>
                                }
                                <Popup
                                    trigger={<td><i
                                        className="bi bi-arrow-counterclockwise btn m-0 p-0 text-blue "/></td>}
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