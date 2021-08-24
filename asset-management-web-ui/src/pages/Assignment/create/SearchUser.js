import React, {useEffect, useState, useMemo} from 'react';
import axios from "axios";
import {Button, Container, Form, FormControl, InputGroup, Row, Table} from "react-bootstrap";
import '../../ManageAll/ManageAsset/manage/Manage.css'

const SearchUser = ({setSingleUser, close}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState(null);
    const [user, setUser] = useState([{
        username: null,
        id: null,
        firstName: null,
        lastName: null,
        authority: null,
        status: null,
        staffCode: null
    }]);
    useEffect(() => {
        axios.get(rootAPI + '/admin/users')
            .then(response => {
                setUser(response.data)
            })
    }, [])
    useEffect(() => {
        axios.get(rootAPI + '/searchby?keyword=' + searchTerm)
            .then(response => {
                setUser(response.data);
            })
    }, [searchTerm])
    const rootAPI = process.env.REACT_APP_SERVER_URL;

    const [value, setValue] = useState({
        username: null
    })
    useEffect(() => {
        console.log(value);
    })

    const sortingData = useMemo(() => {
        if (sortConfig !== null) {
          user.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
              return sortConfig.direction === "asc" ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
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
        setSortConfig({ key, direction });
      };
      const getClassNamesFor = (name) => {
        if (!sortConfig) {
          return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
      };

    return (
        <>
            <Container fluid>
                <Row>
                    <h3 className={"text-danger w-50"}>Select User</h3>
                    <InputGroup className={"w-50"}>
                        <Form.Control
                            type={"input"}
                            className={"w-25"}
                            name={"searchTerm"}
                            onChange={evt => {setSearchTerm(evt.target.value)}}
                        />
                        <Button variant={"outline-secondary"}
                                className={"me-5"}
                        ><i className="bi bi-search"/>
                        </Button>
                    </InputGroup>
                </Row>
                <Table>
                    <thead>
                    <th/>
                    <th className={"border-bottom"}
                        className={getClassNamesFor("staffCode")}
                        onClick={() => requestSort("staffCode")}
                    >Staff Code</th>
                    <th className={"border-bottom"}
                        className={getClassNamesFor("lastName")}
                        onClick={() => requestSort("lastName")}
                    >Full Name</th>
                    <th className={"border-bottom"}
                        className={getClassNamesFor("authority")}
                        onClick={() => requestSort("authority")}
                    >Type</th>
                    </thead>
                    <tbody>
                    {user.map(user => (
                        user.status === "enabled" ?
                            <tr key={user.id}>
                                <td><Form.Check name={"singleUser"} color={"red"} type={"radio"}
                                                onChange={() => setSingleUser({id: user.id, username: user.username})}/>
                                </td>
                                <td>{user.staffCode}</td>
                                <td>{user.firstName} {user.lastName}</td>
                                <td>{user.authority}</td>
                            </tr>
                            : null
                    ))}
                    </tbody>
                </Table>
                <Row className={"justify-content-end"}>
                    <Button variant={"danger"} className={"w-25 mx-5"} onClick={() => close()}>Save</Button>
                    <Button variant={"danger"} className={"w-25"} onClick={() => {
                        setSingleUser({id: null, username: ""})
                        close()
                    }}>Cancel</Button>
                </Row>

            </Container>
        </>
    );
};

export default SearchUser;