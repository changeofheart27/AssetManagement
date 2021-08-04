import React from 'react';
import { Form, FormControl, Button, FormCheck, Row} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateAsset = () => {
    return (
        <div className={"container ps-5 d-block"}>
            <Row>
                <h1 className={"text-danger mb-5"}>Create New Asset</h1>
            </Row>
            <Row className={"mt-5"}>
                <Form>
                    <Row className={"mb-3"}>
                        <p className={"w-25"}>Name</p>
                        <FormControl
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            className={"w-75"}
                        />
                    </Row>
                    <Row className="mb-3">
                        <p className={"col-3"}>Category</p>
                        <Form.Select size="sm" className={"w-75"}>
                            <option selected></option>
                            <option>Laptop</option>
                            <option>Monitor</option>
                            <option>Personal Computer</option>
                        </Form.Select>
                    </Row>
                    <Row className="mb-3">
                        <p className={"w-25"}>Specification</p>
                        <FormControl
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            className={"w-75"}
                            style={{height:'5em'}}
                        />
                    </Row>
                    <Row className="mb-3">
                        <p className={"w-25"} id="basic-addon1">Install Date</p>
                        <FormControl
                            type={"date"}
                            aria-describedby="basic-addon1"
                            className={"w-75"}
                        />
                    </Row>
                    <Row >
                        <p id="basic-addon1" className={"w-25"}>State</p>
                        <div className={"container w-75"}
                            style={{display:'flex', flexDirection:'column'}}>
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
                        </div>
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

export default CreateAsset;