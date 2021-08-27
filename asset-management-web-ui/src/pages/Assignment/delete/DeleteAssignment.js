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
           <h3 className={"text-danger"}>Are you sure?</h3>
            <hr/>
            <p>Do you want to delete this assignment?</p>
            <Row>
                <ButtonGroup>
                    <Button variant={"danger"} className={"mx-5"} onClick={onSubmit} >Delete</Button>
                    <Button variant={"secondary"} className={"mx-5"} onClick={()=> close()}>Cancel</Button>
                </ButtonGroup>
            </Row>
        </div>
    )
}

export default DeleteAssignment;