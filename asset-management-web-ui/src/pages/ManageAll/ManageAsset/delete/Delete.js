import React from 'react';
import {Button, ButtonGroup, Row} from "react-bootstrap";
import axios from "axios";

const Delete = props => {
    let {id} = props;
    console.log(id);
    const refreshPage = ()=>{
        window.location.reload();
    }
    const onSubmit = () => {
        axios
          .delete(`http://18.142.87.28:8080/api/v1/assets/${id}`)
          .then(function (response) {
            refreshPage();
          });
    }
    return (
        <div>
           <h3 className={"text-danger"}>Are you sure?</h3>
            <hr/>
            <p>Do you want to delete this asset?</p>
            <Row>
                <ButtonGroup>
                    <Button variant={"danger"} className={"mx-5"} onClick={onSubmit} >Yes</Button>
                    <Button variant={"secondary"} className={"mx-5"}onClick={()=> refreshPage()}>No</Button>
                </ButtonGroup>
            </Row>
        </div>
    );
};

export default Delete;