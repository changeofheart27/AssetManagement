import React from 'react'
import {Button, ButtonGroup, Row} from "react-bootstrap";
import axios from "axios";

const CompleteRequest = props => {
    const rootAPI = process.env.REACT_APP_SERVER_URL;
    let {id, assign} = props;
    console.log(id);
    const refreshPage = ()=>{
        window.location.reload();
    }
    const assigmentId = assign.assignmentDTO.id
    const data = {
        id:assign.id,
        returnedDate:assign.returnedDate,
        state: 1,
        assignmentDTO:assign.assignmentDTO,
        accepted_by: assign.accepted_by
    }
    const onSubmit = () => {
        axios
          .put(rootAPI+`/request/${id}`,data)
          .then(function (response) {
            
          });
        axios
          .delete(rootAPI+`/assignments/${assigmentId}`)
          .then(function (response) {
            
          });
    }
    return (
        <div>
           <h3 className={"text-danger"}>Are you sure?</h3>
            <hr/>
            <p>Do you want to mark this returnning request as 'Completed'?</p>
            <Row>
                <ButtonGroup>
                    <Button variant={"danger"} className={"mx-5"} onClick={onSubmit} >Yes</Button>
                    <Button variant={"secondary"} className={"mx-5"} onClick={()=> refreshPage()}>No</Button>
                </ButtonGroup>
            </Row>
        </div>
    )
}

export default CompleteRequest;