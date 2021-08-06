import 'bootstrap/dist/css/bootstrap.min.css'
import './Manage.css'
import 'reactjs-popup/dist/index.css';

import {Button, Container, Dropdown, FormControl, InputGroup, Row, SplitButton, Table} from 'react-bootstrap';
import {useEffect, useState} from 'react';

import ChangeStatus from '../changeStatus/ChangeStatus';
import Pagination from '../../../../components/Pagination/Pagination'
import Popup from "reactjs-popup";
import React from 'react';
import axios from "axios";
import {useHistory} from 'react-router-dom'

const ManageUser = () => {

   
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10);
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
 
    const paginate = pageNumber => setCurrentPage(pageNumber);



    const history = useHistory();
    const [search, setSearch] = useState("");
    const [list, setList] = useState([{
        staffCode:null,
        firstName:null,
        lastName: null,
        username: null,
        joinedDate: null,
        type: null,
        status: null
    }]);
    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/users')
            .then(function (response) {
                setList(response.data);
                console.log(response.data)
            })
    }, [])
    const handleChange = evt => {
        setSearch(evt.target.value)
        console.log(search)
    }
    const filterSearchBySearchTerm = () => {
        axios.get(`http://localhost:8080/api/v1/users/searchby?keyword=${search}`)
            .then(function (response) {
                setList(response.data);
                console.log(response.data)
            })
    }
    const filterSearchByType = () => {
        axios.get(`http://localhost:8080/api/v1/users/filter?type=${search}`)
            .then(function (response) {
                setList(response.data);
                console.log(response.data)
            })
    }
    return (
        <Container className={"d-block ms-5"}>
            <h1 className={"text-danger mb-5"}>User List</h1>
            <Row className={"mb-5"}>
                <InputGroup className={"w-25"}>
                    <FormControl
                        type={"input"}
                        className={"w-25"}
                        placeholder={"Type"}
                        name={"type"}
                        onChange={handleChange}
                    >
                    </FormControl>
                    <Button variant={"outline-secondary"} onClick={filterSearchByType}><i
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
                <Button variant={"danger"} className={"w-25 ms-5"} onClick={() => history.push('/createuser')}>Create new User</Button>
            </Row>
            <Row>
                <Table>
                    <thead>
                    <tr>
                        <th className={"border-bottom"}>Staff Code<i className="bi bi-caret-down-fill"/></th>
                        <th className={"border-bottom"}>Full Name<i className="bi bi-caret-down-fill"/></th>
                        <th className={"border-bottom"}>User Name</th>
                        <th className={"border-bottom"}>Joined Date<i className="bi bi-caret-down-fill"/></th>
                        <th className={"border-bottom"}>Type<i className="bi bi-caret-down-fill"/></th>
                    </tr>
                    </thead>
                    <tbody>
                    {list.slice(indexOfFirstUser, indexOfLastUser).map(user =>
                        <tr key={user.id}>
                            <td>{user.staffCode}</td>
                            <td>{user.firstName} {user.lastName}</td>
                            <td>{user.username}</td>
                            <td>{user.joinedDate}</td>
                            <td>{user.type}</td>
                            <td><i className="bi bi-pen btn m-0 text-muted p-0"
                                   onClick={() => history.push(`/edituser/${user.id}`)}/></td>
                             <Popup contentStyle={{width: "25%" ,border: "1px solid black" , borderRadius: 10,
              overflow: 'hidden', padding: "20px"}} trigger={user.status==="enable"
                                 ?
                                 <td><i className="bi bi-eye text-danger btn p-0"/></td>
                                 :
                                 <td><i className="bi bi-eye disabled text-danger btn p-0"/></td>} modal>
                               <ChangeStatus id={user.id}/>
                            </Popup>
                        </tr>
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

export default ManageUser;