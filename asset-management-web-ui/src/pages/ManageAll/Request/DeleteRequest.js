import React from 'react'
import {Button, ButtonGroup, Row} from "react-bootstrap";
import axios from "axios";

const DeleteRequest = props => {
    const rootAPI = process.env.REACT_APP_SERVER_URL;
    let {id, close,setRefreshList, refreshList} = props;
    const onSubmit = () => {
        axios
            .delete(rootAPI + `/request/${id}`)
            .then(function (response) {
                setRefreshList(!refreshList);
                close();
            });
    }
    return (
        <div>
            <h3 className={"text-danger"}>Are you sure?</h3>
            <hr/>
            <p>Do you want to cancel this this returning request?</p>
            <Row>
                <ButtonGroup>
                    <Button variant={"danger"} className={"mx-5"} onClick={onSubmit}>Yes</Button>
                    <Button variant={"secondary"} className={"mx-5"} onClick={() => close()}>No</Button>
                </ButtonGroup>
            </Row>
        </div>
    )
}

export default DeleteRequest;