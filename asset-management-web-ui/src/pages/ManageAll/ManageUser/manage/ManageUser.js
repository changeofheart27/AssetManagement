import 'bootstrap/dist/css/bootstrap.min.css'
import './Manage.css'
import 'reactjs-popup/dist/index.css';
import {Button, Container, Form, FormControl, InputGroup, Row, Table} from 'react-bootstrap';
import {useEffect, useRef, useMemo, useState} from 'react';
import ChangeStatus from '../changeStatus/ChangeStatus';
import Pagination from '../../../../components/Pagination/Pagination'
import Popup from "reactjs-popup";
import React from 'react';
import ViewDetailedUser from "../viewDetails/ViewDetailedUser"
import axios from "axios";
import {useHistory} from 'react-router-dom'
import dateFormat from 'dateformat';

import '../../../../style/style.css'
import ChangeStatusFail from "../changeStatus/ChangeStatusFail";

const ManageUser = ({responseUser}) => {

    const token = localStorage.getItem('jwttoken')
    const headers = {
        'Authorization': token
    };
    const rootAPI = process.env.REACT_APP_SERVER_URL;
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10);
    const [sortConfig, setSortConfig] = useState(null);
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const [refresh, setRefresh] = useState(true);
    const paginate = pageNumber => setCurrentPage(pageNumber);
    const history = useHistory();

    const [list, setList] = useState([{
        staffCode: null,
        firstName: null,
        lastName: null,
        username: null,
        joinedDate: null,
        authority: null,
        status: null,
        assignments: [{
            state: null
        }]
    }]);
    console.log(list)
    useEffect(() => {
        axios.get(rootAPI + '/users', {headers})
            .then(function (response) {
                setRefresh(true);
                let result = response.data.map(user => user.id);
                if (result.includes(responseUser.id)) {
                    const index = result.indexOf(responseUser.id);
                    response.data.splice(index, 1);
                    response.data.unshift(responseUser);
                    setList(response.data);
                } else {
                    setList(response.data);
                }
            })
    }, [refresh])

    const [type, setType] = useState();
    const [searchTerm, setSearchTerm] = useState();
    const request = {
        headers: headers,
        params: {
            type,
            searchTerm
        }
    }

    const handleFilterType = evt => {
        setType(evt.target.value)
    }

    const handleSearch = evt => {
        setSearchTerm(evt.target.value)
    }

    const isFirstRun = useRef(true);
    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        if (request.params.type === 'Type') {
            request.params.type = null;

        }
        if (request.params.searchTerm === '') {
            request.params.searchTerm = null;

        }
        axios.get(rootAPI + '/users', request)
            .then(function (response) {
                setList(response.data);
            })
    }, [type, searchTerm])

    const sortingData = useMemo(() => {
        let listData = list;
        if (sortConfig !== null) {
            listData.sort((a, b) => {
                if (a[sortConfig.key] < (b[sortConfig.key])) {
                    return sortConfig.direction === "asc" ? -1 : 1;
                }
                if (a[sortConfig.key] > (b[sortConfig.key])) {
                    return sortConfig.direction === "asc" ? 1 : -1;
                }
                return 0;
            })
        }
    }, [list, sortConfig]);

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
    function capitalizeFirstLetter(string) {
        return string?.charAt(0) + string?.slice(1).toLowerCase();
    }
    return (
      <Container fluid className={"d-block ps-5"}>
        <h1 className={"text-danger mb-3"}>User List</h1>
        <div className={"justify-content-between d-flex"}>
          <div className={"col-3 d-flex"}>
            <InputGroup className={"w-50"}>
              <Form.Control
                as="select"
                custom
                placeholder={"Type"}
                name={"type"}
                onChange={handleFilterType}
              >
                <option value={"Type"}>Type</option>
                <option value="Admin">Admin</option>
                <option value="Staff">Staff</option>
              </Form.Control>
              <Button variant={"outline-secondary"}>
                <i className="bi bi-funnel-fill" />
              </Button>
            </InputGroup>
          </div>
          <div className={"col-6 d-flex justify-content-end"}>
            <InputGroup className={"w-50"}>
              <FormControl
                type={"text"}
                name={"searchTerm"}
                onChange={handleSearch}
                maxLength={255}
              />
              <Button variant={"outline-secondary"}>
                <i className="bi bi-search" />
              </Button>
            </InputGroup>
            <Button
              variant={"danger"}
              className={"w-auto ms-5"}
              onClick={() => history.push("/createuser")}
            >
              Create new user
            </Button>
          </div>
        </div>
        <Row className={"mt-5"}>
          <Table>
            <thead>
              <tr>
                <th
                  className={"border-bottom"}
                  className={getClassNamesFor("staffCode")}
                  onClick={() => requestSort("staffCode")}
                >
                  Staff Code
                </th>
                <th
                  className={"border-bottom"}
                  className={getClassNamesFor("firstName")}
                  onClick={() => requestSort("firstName")}
                >
                  Full Name
                </th>
                <th
                  className={"border-bottom"}
                  className={getClassNamesFor("username")}
                  onClick={() => requestSort("username")}
                >
                  User Name
                </th>
                <th
                  className={"border-bottom"}
                  className={getClassNamesFor("joinedDate")}
                  onClick={() => requestSort("joinedDate")}
                >
                  Joined Date
                </th>
                <th
                  className={"border-bottom"}
                  className={getClassNamesFor("authority")}
                  onClick={() => requestSort("authority")}
                >
                  Type
                </th>
              </tr>
            </thead>
            <tbody>
              {list.slice(indexOfFirstUser, indexOfLastUser).map((user) => (
                <Popup
                  key={user.id}
                  contentStyle={{
                    width: "25%",
                    border: "1px solid black",
                    borderRadius: 10,
                    overflow: "hidden",
                    padding: "20px",
                  }}
                  trigger={
                    <tr key={user.id}>
                      <td>{user.staffCode}</td>
                      <td>
                        {user.firstName} {user.lastName}
                      </td>
                      <td>{user.username}</td>
                      <td>{dateFormat(user.joinedDate, "dd/mm/yyyy")}</td>
                      <td>{capitalizeFirstLetter(user.authority)}</td>
                      <td>
                        <i className="bi bi-pen btn m-0 text-muted p-0"
                          onClick={() => history.push(`/edituser/${user.id}`)}
                        />
                      </td>
                      <Popup
                        contentStyle={{
                          width: "27%",
                          border: "1px solid black",
                          borderRadius: 10,
                          overflow: "hidden",
                        }}
                        trigger={
                          <td>
                            <i className="bi bi-x-circle text-danger btn p-0" />
                          </td>
                        }
                        modal
                      >
                        {(close) => {
                          if (user.assignments?.length !== 0) {
                            return <ChangeStatusFail close={close} />;
                          } else {
                            return <ChangeStatus id={user.id} close={close} setRefresh={setRefresh}/>;
                          }
                        }}
                      </Popup>
                    </tr>
                  }
                  modal
                >
                  {(close) => (
                    <div>
                      <ViewDetailedUser id={user.id} />
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
        </Row>
        <Pagination
          className="pagnition"
          usersPerPage={usersPerPage}
          totalUsers={list.length}
          paginate={paginate}
        />
      </Container>
    );
};

export default ManageUser;