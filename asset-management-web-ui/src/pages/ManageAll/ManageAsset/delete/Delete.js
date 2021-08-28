import React from 'react';
import {Button, ButtonGroup, Row} from "react-bootstrap";
import axios from "axios";

const Delete = props => {
    const rootAPI = process.env.REACT_APP_SERVER_URL;
    let {id,close,setList} = props;
    const refreshPage = ()=>{
        window.location.reload();
    }
    const onSubmit = () => {
        axios
            .delete(rootAPI+`/assets/${id}`)
            .then(function (response) {
                axios.get(rootAPI + "/assets/filter")
                    .then((response) => {
                        setList(response.data);
                    });
            });

    }
    return (
        <div>
            <h3 className={"text-danger"} style={{padding: '10px 20px'}}>Are you sure?</h3>
            <hr style={{margin: '0'}}/>
            <Row style={{padding: '10px 20px'}}>
                <p>Do you want to delete this asset?</p>
                <ButtonGroup className={"w-50"}>
                    <Button variant={"danger"} className={"px-5"} onClick={()=>{onSubmit(); close();}}>Yes</Button>
                </ButtonGroup>
                <ButtonGroup className={"w-50"}>
                    <Button variant={"secondary"} className={"px-5"} onClick={()=> close()}>No</Button>
                </ButtonGroup>
            </Row>
        </div>
    );
};

export default Delete;