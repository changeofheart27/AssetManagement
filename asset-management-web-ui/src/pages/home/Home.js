import 'bootstrap/dist/css/bootstrap.min.css'
import 'reactjs-popup/dist/index.css';
import '../../style/style.css'

import {Button, Container, Row, Table} from 'react-bootstrap';
import React, {useEffect, useState, useMemo} from 'react';

import AcceptPopup from "./popup/AcceptPopup";
import DeclinePopup from "./popup/DeclinePopup";
import DetailsPopup from "./popup/DetailsPopup";
import Pagination from '../../components/Pagination/Pagination';
import Popup from "reactjs-popup";
import ReturnPopup from "./popup/ReturnPopup";
import axios from "axios";
import EmptyList from "../../layout/EmptyList/EmptyList";
import ViewDetailAssignment from "../Assignment/viewDetails/ViewDetailAssignment";

const Home = () => {
    const rootAPI = process.env.REACT_APP_SERVER_URL;
    const [sortConfig, setSortConfig] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10);
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const paginate = pageNumber => setCurrentPage(pageNumber);
    const [user, setUser] = useState({
        defaultPassword: null
    });
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
        axios.get(rootAPI + '/my-assignments', {
            headers: {
                Authorization: Authentoken
            }
        }).then((response) => {
            setList(response.data);
            axios
                .get(rootAPI + `/users`)
                .then((response1) => {
                    setUser(response1.data)
                })
        })
            .catch((error) => {
                console.log(error)
            });
    }, [state])
    if (user.defaultPassword === localStorage.getItem("password")) {
        window.alert("You are using the default password, please change it now !")
        window.location.href = "/changepassword";
    }
    const check = state => {
        if (state === 6) {
            return <td>Accepted</td>
        } else if (state === 5) {
            return <td>Waiting for acceptance</td>
        } else if (state === 7) {
            return <td>Decline</td>
        } else if (state === 8) {
            return <td>Returning Request</td>
        }
    }
    const PopupStyle = {
        width: "500px",
        border: "none",
        padding: "0",
        borderRadius: "5px"
    }

    const sortingData = useMemo(() => {
        if (sortConfig !== null) {
            list.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key] ||
                    a.assetDTO.categoryDTO.name < b.assetDTO.categoryDTO.name ||
                    a.assetDTO.assetName < b.assetDTO.assetName ||
                    a.assetDTO.assetCode < b.assetDTO.assetCode) {
                    return sortConfig.direction === "asc" ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key] ||
                    a.assetDTO.categoryDTO.name > b.assetDTO.categoryDTO.name ||
                    a.assetDTO.assetName > b.assetDTO.assetName ||
                    a.assetDTO.assetCode > b.assetDTO.assetCode) {
                    return sortConfig.direction === "asc" ? 1 : -1;
                }
                return 0;
            });
        }
    }, [sortConfig]);
    const requestSort = (key) => {
        let direction = "asc";
        if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === "asc"
        ) {
            direction = "desc";
        }
        setSortConfig({key, direction});
    };
    const getClassNamesFor = (name) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };
    let i = 1;
    return (
      <Container fluid className={"d-block ps-5"}>
        <h3 className={"text-danger my-5"}>My Assignment</h3>
        <Row className={"mt-5"}>
          {list.length === 0 ? (
            <EmptyList />
          ) : (
            <Table>
              <thead>
                <tr>
                  <th
                    className={"border-bottom"}
                    className={getClassNamesFor("id")}
                    onClick={() => requestSort("id")}
                  >
                    No.
                  </th>
                  <th
                    className={"border-bottom"}
                    className={getClassNamesFor("assetDTO.assetCode")}
                    onClick={() => requestSort("assetDTO.assetCode")}
                  >
                    Asset Code
                  </th>
                  <th
                    className={"border-bottom"}
                    className={getClassNamesFor("assetDTO.assetName")}
                    onClick={() => requestSort("assetDTO.assetName")}
                  >
                    Asset Name
                  </th>
                  <th
                    className={"border-bottom"}
                    className={getClassNamesFor("assetDTO.categoryDTO.name")}
                    onClick={() => requestSort("assetDTO.categoryDTO.name")}
                  >
                    Category
                  </th>
                  <th
                    className={"border-bottom"}
                    className={getClassNamesFor("assignedDate")}
                    onClick={() => requestSort("assignedDate")}
                  >
                    Assigned Date
                  </th>
                  <th
                    className={"border-bottom"}
                    className={getClassNamesFor("state")}
                    onClick={() => requestSort("state")}
                  >
                    State
                  </th>
                </tr>
              </thead>
              <tbody>
                {list.map((assigment) => (
                  <Popup
                    contentStyle={{
                      width: "25%",
                      border: "1px solid black",
                      borderRadius: 10,
                      overflow: "hidden",
                      padding: "20px",
                    }}
                    trigger={
                      <tr key={assigment.id}>
                        <td>{i++}</td>
                        <td>{assigment.assetDTO.assetCode}</td>
                        <td>{assigment.assetDTO.assetName}</td>
                        <td>{assigment.assetDTO.categoryDTO.name}</td>
                        <td>{assigment.assignedDate}</td>
                        <td>{check(assigment.state)}</td>
                        {assigment.state === 5 ? (
                          <Popup
                            trigger={
                              <td>
                                <i className="bi bi-check-lg btn m-0 p-0 text-danger " />
                              </td>
                            }
                            modal
                            contentStyle={PopupStyle}
                          >
                            {(close) => (
                              <AcceptPopup
                                close={close}
                                assigment={assigment}
                                setState={setState}
                              />
                            )}
                          </Popup>
                        ) : (
                          <Popup
                            trigger={
                              <td>
                                <i className="bi bi-check-lg btn m-0 p-0 text-danger disabled " />
                              </td>
                            }
                            modal
                            disabled
                            contentStyle={PopupStyle}
                          >
                            {(close) => (
                              <AcceptPopup
                                close={close}
                                assigment={assigment}
                                setState={setState}
                              />
                            )}
                          </Popup>
                        )}
                        {assigment.state === 5 ? (
                          <Popup
                            contentStyle={PopupStyle}
                            trigger={
                              <td>
                                <i className="bi bi-x-lg btn m-0 p-0" />
                              </td>
                            }
                            modal
                          >
                            {(close) => (
                              <DeclinePopup
                                close={close}
                                setState={setState}
                                assigment={assigment}
                              />
                            )}
                          </Popup>
                        ) : (
                          <Popup
                            contentStyle={PopupStyle}
                            trigger={
                              <td>
                                <i className="bi bi-x-lg btn m-0 p-0 disabled" />
                              </td>
                            }
                            disabled
                            modal
                          >
                            {(close) => <DeclinePopup />}
                          </Popup>
                        )}
                        {assigment.state === 7 ||
                        assigment.state === 8 ||
                        assigment.state === 5 ? (
                          <Popup
                            trigger={
                              <td>
                                <i className="bi bi-arrow-counterclockwise btn m-0 p-0 text-blue disabled " />
                              </td>
                            }
                            modal
                            disabled
                            contentStyle={PopupStyle}
                          >
                            {(close) => <ReturnPopup />}
                          </Popup>
                        ) : (
                          <Popup
                            trigger={
                              <td>
                                <i className="bi bi-arrow-counterclockwise btn m-0 p-0 text-blue zoomin" />
                              </td>
                            }
                            modal
                            contentStyle={PopupStyle}
                          >
                            {(close) => (
                              <ReturnPopup
                                close={close}
                                setState={setState}
                                assigment={assigment}
                              />
                            )}
                          </Popup>
                        )}
                      </tr>
                    }
                    modal
                  >
                    {(close) => (
                      <div>
                        <ViewDetailAssignment id={assigment.id} />
                        <Button
                          onClick={close}
                          variant="success"
                          className="btn-view-detail"
                        >
                          &times;
                        </Button>
                      </div>
                    )}
                  </Popup>
                ))}
              </tbody>
            </Table>
          )}
        </Row>
        <Pagination
          className="pagnition"
          usersPerPage={usersPerPage}
          totalUsers={list.length}
          paginate={paginate}
        ></Pagination>
      </Container>
    );

}

export default Home;