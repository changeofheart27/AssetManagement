import React from 'react'
import {Button, ButtonGroup, Row} from "react-bootstrap";
import axios from "axios";

const DeleteAssignment = props => {
    const rootAPI = process.env.REACT_APP_SERVER_URL;
    let {id,close} = props;
    console.log(id);

    const onSubmit = () => {
        axios
          .delete(rootAPI+`/assignments/${id}`)
          .then(function (response) {
            close();
          });
    }
    return (
        <div>
            <h3 className={"text-danger"} style={{padding: '10px 20px'}}>Are you sure?</h3>
            <hr style={{margin: '0'}}/>
            <Row style={{padding: '10px 20px'}}>
                <p>Do you want to delete this assignment?</p>
                <ButtonGroup className={"w-50"}>
                    <Button variant={"danger"} className={"px-5"} onClick={() =>{onSubmit(close)}}>Delete</Button>
                </ButtonGroup>
                <ButtonGroup className={"w-50"}>
                    <Button variant={"secondary"} className={"px-5"} onClick={() =>close()}>Cancel</Button>
                </ButtonGroup>
            </Row>
        </div>
    )
}

export default DeleteAssignment;