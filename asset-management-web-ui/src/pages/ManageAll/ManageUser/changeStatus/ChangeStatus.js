import {Button, ButtonGroup, Row} from "react-bootstrap";
import {useEffect, useState} from 'react';
import React from 'react';
import axios from "axios";

const ChangeStatus = props => {
    const rootAPI = process.env.REACT_APP_SERVER_URL;
    let {id, close, setRefresh} = props;
    console.log(id);
    const refreshPage = () => {
        window.location.reload();
    }
    const token = localStorage.getItem('jwttoken')

    const headers = {
        'Authorization': token
    };

    const [user, setUser] = useState({

        id: null,
        status: null,
        username: null,
        staffCode: null,
        firstName: null,
        lastName: null,
        dob: null,
        gender: null,
        joinedDate: null,
        authority: null
    });
    useEffect(() => {
        axios
            .get(rootAPI + `/admin/users/${id}`, {headers})
            .then(function (response) {
                setUser(response.data);
            })
            .catch(console.log(id));
    }, [id])


    const onSubmit = () => {

        let data = {
            staff_code: user.staffCode,
            username: user.username,
            first_name: user.firstName,
            last_name: user.lastName,
            dob: user.dob,
            gender: user.gender,
            joined_date: user.joinedDate,
            authority: user.authority
        }

        axios
            .put(rootAPI + `/admin/users/status/${id}`, data, {headers})
            .then(function (response) {
                setRefresh(false);
                close()
            });
    }
    return (
        <div>
            <h3 className={"text-danger"}>Are you sure?</h3>
            <hr/>
            <p>Do you want to disable this user?</p>
            <Row className>
                <ButtonGroup className={"w-50"}>
                    <Button variant={"danger"} className={"px-5"} onClick={onSubmit}>Change</Button>
                </ButtonGroup>
                <ButtonGroup className={"w-50"}>
                    <Button variant={"secondary"} className={"px-5"} onClick={() => close()}>Cancel</Button>
                </ButtonGroup>
            </Row>
        </div>
    );
};

export default ChangeStatus;