import React from 'react';
import {Button, ButtonGroup, Row} from "react-bootstrap";
import axios from "axios";

const Delete = props => {
    const rootAPI = process.env.REACT_APP_SERVER_URL;
    let {id,close,setList} = props;
    console.log(id);
    const refreshPage = ()=>{
        window.location.reload();
    }
    const onSubmit = () => {
        axios
            .delete(rootAPI+`/assets/${id}`)
            .then(function (response) {
                console.log("Delete success");
                axios.get(rootAPI + "/assets/filter")
                    .then((response) => {
                        setList(response.data);
                        console.log("delete axios get list run")
                    });
            });

    }
    return (
        <div>
            <h3 className={"text-danger"}>Are you sure?</h3>
            <hr/>
            <p>Do you want to delete this asset?</p>
            <Row>
                <ButtonGroup>
                    <Button variant={"danger"} className={"mx-5"} onClick={()=>{onSubmit(); close();}} >Yes</Button>
                    <Button variant={"secondary"} className={"mx-5"} onClick={()=> close()}>No</Button>
                </ButtonGroup>
            </Row>
        </div>
    );
};

export default Delete;