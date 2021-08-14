import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Container, Form, FormControl, InputGroup, Row, Table} from "react-bootstrap";

const SearchUser = ({setSingleUser,close}) => {
    const [user, setUser] = useState([{
        username: null,
        id: null,
        firstName: null,
        lastName: null,
        type: null,
        status: null
    }]);
    const rootAPI = process.env.REACT_APP_SERVER_URL;
    useEffect(() => {
        axios.get(rootAPI + '/users')
            .then(response => {
                setUser(response.data)
            })
    }, [])
    const [value, setValue]= useState({
        username: null
    })
    useEffect(()=>{
        console.log(value);
    })
    return (
        <>
            <Container fluid>
                <Row>
                    <h3 className={"text-danger w-50"}>Select Asset</h3>
                    <InputGroup className={"w-50"}>
                        <FormControl
                            type={"input"}
                            className={"w-25"}
                            name={"searchTerm"}
                        >
                        </FormControl>
                        <Button variant={"outline-secondary"}
                                className={"me-5"}
                        ><i className="bi bi-search"/>
                        </Button>
                    </InputGroup>
                </Row>
                <Table>
                    <thead>
                    <th/>
                    <th className={"border-bottom"}>Staff Code</th>
                    <th className={"border-bottom"}>Full Name</th>
                    <th className={"border-bottom"}>Type</th>
                    </thead>
                    <tbody>
                    {user.map(user => (
                        user.status === "enable" ?
                        <tr>
                            <td><Form.Check name={"singleUser"} color={"red"} type={"radio"} onChange={()=> setSingleUser({id: user.id, username: user.username})} /></td>
                            <td>{user.username}</td>
                            <td>{user.firstName} {user.lastName}</td>
                            <td>{user.type}</td>
                        </tr>
                        : null

                    ))}
                    </tbody>
                </Table>
                <Row className={"justify-content-end"}>
                    <Button variant={"danger"} className={"w-25 mx-5"} onClick={()=> close()}>Save</Button>
                    <Button variant={"danger"} className={"w-25"} onClick={()=>{
                        setSingleUser({id:"", username:""})
                        close()
                    }} >Cancel</Button>
                </Row>

            </Container>
        </>
    );
};

export default SearchUser;