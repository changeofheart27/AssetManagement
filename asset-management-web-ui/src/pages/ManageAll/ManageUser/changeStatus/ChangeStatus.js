import {Button, ButtonGroup, Row} from "react-bootstrap";
import  {useEffect, useState}  from 'react';
import { useHistory, useParams } from 'react-router-dom';

import React from 'react';
import axios from "axios";

const ChangeStatus = props => {
    let {id} = props;
    console.log(id);
    const refreshPage = ()=>{
        window.location.reload();
    }

    const [user, setUser] = useState({

        id:null,
        status:null,
        username:null,
        staffCode:null,
        firstName: null,
        lastName: null,
        dob: null,
        gender: null,
        joinedDate: null,
        type: null
    });
    useEffect(() => {
        axios
          .get(`http://18.142.87.28:8080/api/v1/users/${id}`)
          .then(function (response) {
            setUser(response.data);
          })
          .catch(console.log(id));
    }, [id])


    const onSubmit = () => {

        let data = {
            staff_code:user.staffCode,
            username:user.username,
             first_name: user.firstName,
             last_name: user.lastName,
             dob: user.dob,
             gender: user.gender,
             joined_date: user.joinedDate,
             type: user.type
         }

        axios
          .put(`http://18.142.87.28:8080/api/v1/users/status/${id}`, data)
          .then(function (response) {
            refreshPage();
          });
    }
    return (
        <div>
           <h3 className={"text-danger"}>Are you sure</h3>
            <hr/>
            <p>Do you want to change status this user</p>
            <Row>
                <ButtonGroup>
                    <Button variant={"danger"} className={"mx-5"} onClick={onSubmit} >Change</Button>
                    <Button variant={"secondary"} className={"mx-5"}onClick={()=> refreshPage()}>Cancel</Button>
                </ButtonGroup>
            </Row>
        </div>
    );
};

export default ChangeStatus;