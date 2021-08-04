import React from 'react';
import { Form, FormControl, Button, FormCheck, Row} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


const CreateUser = () => {
    return (
        <div className={"container ps-5 d-block"}>
            <Row>
                <h1 className={"text-danger mb-5"}>Create New User</h1>
            </Row>
            <Row className={"mt-5"}>
                <Form>
                    <Row className={"mb-3"}>
                        <p className={"w-25"}>First Name</p>
                        <FormControl
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            className={"w-75"}
                        />
                    </Row>
                    <Row className={"mb-3"}>
                        <p className={"w-25"}>Last Name</p>
                        <FormControl
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            className={"w-75"}
                        />
                    </Row>
                    <Row className="mb-3">
                        <p className={"w-25"} id="basic-addon1">Date of Birth</p>
                        <FormControl
                            type={"date"}
                            aria-describedby="basic-addon1"
                            className={"w-75"}
                        />
                    </Row>
                    <Row >
                        <p id="basic-addon1" className={"w-25"}>Gender</p>
                        <div className={"container w-75"}>
                            <FormCheck
                                inline
                                type={"radio"}
                                label={"Female"}
                                className={"w-75"}
                            >
                            </FormCheck>
                            <FormCheck
                                inline
                                type={"radio"}
                                label={"Male"}
                                className={"w-75"}
                            >
                            </FormCheck>
                        </div>
                    </Row>
                    <Row className="mb-3">
                        <p className={"w-25"} id="basic-addon1">Joined Date</p>
                        <FormControl
                            type={"date"}
                            aria-describedby="basic-addon1"
                            className={"w-75"}
                        />
                    </Row>
                    <Row className="mb-3">
                        <p className={"col-3"}>Type</p>
                        <Form.Select size="sm" className={"w-75"}>
                            <option selected></option>
                            <option>Admin</option>
                            <option>Staff</option>
                        </Form.Select>
                    </Row>
                    <Button variant={"danger"} type={"submit"} className={"ms-5"} style={{float:'right'}}>
                        Cancel
                    </Button>
                    <Button variant={"danger"} type={"submit"} style={{float:'right'}}>
                        Save
                    </Button>
                </Form>
            </Row>
        </div>
    );
};

export default CreateUser;