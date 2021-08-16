import {Button, ButtonGroup, Row} from "react-bootstrap";

import React from 'react';


const Logout = () => {
    
    const refreshPage = ()=>{
        window.location.reload();
    }

    const onSubmit = () =>{
        localStorage.removeItem("username");
        localStorage.removeItem("jwttoken")
        window.location.href = "/login";
    }
    
    return (
        <div>
           <h3 className={"text-danger"}>Are you sure</h3>
            <hr/>
            <p>Do you want to Logout</p>
            <Row>
                <ButtonGroup>
                    <Button variant={"danger"} className={"mx-5"} onClick={onSubmit} >Logout</Button>
                    <Button variant={"secondary"} className={"mx-5"}onClick={()=> refreshPage()}>Cancel</Button>
                </ButtonGroup>
            </Row>
        </div>
    );
};

export default Logout;