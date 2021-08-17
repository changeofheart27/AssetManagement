import React from 'react';
import {Button, Container, Row} from "react-bootstrap";

const DeclinePopup = props => {
    let {close} = props;
    return (
        <Container fluid>
            <Row >
                <h3 className={"text-danger bg-gray  rounded-top"}>Are you sure</h3>
                <hr/>
            </Row>
            <Row>
                <p>Do you want to decline this assignment?</p>
            </Row>
            <Row className={"justify-content-center"}>
                <Button variant={"danger"} className={"w-25 me-5 my-5"}>
                    Yes
                </Button>
                <Button variant={"danger"} className={"w-25 my-5"} onClick={() => close()}>
                    No
                </Button>
            </Row>
        </Container>
    );
};

export default DeclinePopup;