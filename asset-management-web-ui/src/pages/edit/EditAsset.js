import React from 'react';
import { Form, FormControl, Button, FormCheck, Row} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


const EditAsset = () => {
    return (
        <div className={"container ps-5 d-block"}>
            <Row>
                <h1 className={"text-danger mb-5"}>Edit User</h1>
            </Row>
            <Row className={"mt-5"}>
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
                    <Row >
                        <p id="basic-addon1" className={"w-25"}>State</p>
                        <div className={"container w-75"}>
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
            </Row>
        </div>
    );
};

export default EditAsset;