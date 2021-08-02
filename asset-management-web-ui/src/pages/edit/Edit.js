import React from 'react';
import {Container, Form, FormControl, InputGroup, Button, FormCheck, Row} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


const Edit = () => {
    return (
        <Container>
            <h1 className={"text-danger"}>Edit User</h1>
            <Form>
                <Row className={"mb-3"}>
                    <p className={"w-25"}>Name</p>
                    <FormControl
                        placeholder="Username"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        className={"w-75"}
                    />
                </Row>
                <Row className="mb-3">
                    <p className={"col-3"}>Category</p>
                    <Form.Select size="lg" className={"w-75"}>
                        <option>Laptop</option>
                        <option>Monitor</option>
                        <option>Personal Computer</option>
                    </Form.Select>
                </Row>
                <Row className="mb-3">
                    <p className={"w-25"}>Specification</p>
                    <FormControl
                        placeholder="Username"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        className={"w-75"}
                    />
                </Row>
                <Row className="mb-3">
                    <p className={"w-25"} id="basic-addon1">Install Date</p>
                    <FormControl
                        type={"date"}
                        placeholder="Last Name"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        className={"w-75"}
                    />
                </Row>
                <Row className="mb-3">
                    <p id="basic-addon1" className={"me-5 w-25"}>State</p>
                    <div className={"container w-50"}>
                        <FormCheck
                            inline
                            type={"radio"}
                            label={"Available"}
                            className={"w-75"}
                        >
                        </FormCheck>
                        <FormCheck
                            inline
                            type={"radio"}
                            label={"Not available"}
                            className={"w-75"}
                        >
                        </FormCheck>

                        <FormCheck
                            inline
                            type={"radio"}
                            label={"Waiting for recycling"}
                            className={"w-75"}
                        >
                        </FormCheck>

                        <FormCheck
                            inline
                            type={"radio"}
                            label={"Recycled"}
                            className={"w-75"}
                        >
                        </FormCheck>
                    </div>
                </Row>
                <Button variant={"danger"} type={"submit"}>
                    Save
                </Button>
                <Button variant={"danger"} type={"submit"} className={"ms-5"}>
                    Cancel
                </Button>
            </Form>
        </Container>
    );
};

export default Edit;