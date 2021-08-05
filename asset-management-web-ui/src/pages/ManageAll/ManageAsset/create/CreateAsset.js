import React from 'react';
import {Form, FormControl, Button, FormCheck, Row} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Formik} from "formik";
import axios from "axios";
import {useHistory} from "react-router-dom";

const CreateAsset = () => {
    const history = useHistory();
    const initialValues = {
        assetName: null,
        specification: null,
        installedDate: null,
        state: null,
        category: null,
        cars: null
    }
    const onSubmit = (values, {setSubmitting}) => {
        let edit = {
            assetName: values.assetName,
            specification: values.specification,
            installedDate: values.installedDate,
            state: values.state,
            categoryDTO: {
                id: values.category
            },
        }
        axios
            .post(`http://localhost:8080/api/v1/assets`, edit)
            .then(response => {
                setSubmitting(false);
                history.push("/asset");
            });
    };
    return (
        <div className={"container ps-5 d-block"}>
            <Row>
                <h1 className={"text-danger mb-5"}>Create New Asset</h1>
            </Row>
            <Row className={"mt-5"}>
                <Formik initialValues={initialValues} onSubmit={onSubmit}>
                    {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          isSubmitting,
                          /* and other goodies */
                      }) => (
                        <Form onSubmit={handleSubmit}>
                            <Row className={"mb-3"}>
                                <p className={"w-25"}>Name</p>
                                <FormControl
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    className={"w-75"}
                                    name={"assetName"}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    onError={errors}
                                />
                            </Row>
                            <Row className="mb-3">
                                <p className={"col-3"}>Category</p>
                                <Form.Select name={"category"} size="sm" className={"w-75"} onChange={handleChange}>
                                    <option selected></option>
                                    <option value={"1"}>Laptop</option>
                                    <option value={"2"}>Monitor</option>
                                    <option value={"3"}>Personal Computer</option>
                                </Form.Select>
                            </Row>
                            <Row className="mb-3">
                                <p className={"w-25"}>Specification</p>
                                <FormControl
                                    name={"specification"}
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    className={"w-75"}
                                    style={{height: '5em'}}
                                    onChange={handleChange}
                                />
                            </Row>
                            <Row className="mb-3">
                                <p className={"w-25"} id="basic-addon1">Install Date</p>
                                <FormControl
                                    type={"date"}
                                    aria-describedby="basic-addon1"
                                    className={"w-75"}
                                    name={"installedDate"}
                                    onChange={handleChange}
                                />
                            </Row>
                            <Row>
                                <p id="basic-addon1" className={"w-25"}>State</p>
                                <div className={"container w-75"}
                                     style={{display: 'flex', flexDirection: 'column'}}>
                                    <FormCheck
                                        inline
                                        name={"status"}
                                        type={"radio"}
                                        label={"Available"}
                                        className={"w-75"}
                                        onChange={() => values.state = 1}
                                    >
                                    </FormCheck>
                                    <FormCheck
                                        name={"status"}
                                        inline
                                        type={"radio"}
                                        label={"Not available"}
                                        className={"w-75"}
                                        onChange={() => values.state = 2}
                                    >
                                    </FormCheck>
                                </div>
                            </Row>
                            <Button variant={"danger"} type={"submit"} className={"ms-5"} style={{float: 'right'}}>
                                Cancel
                            </Button>
                            <Button variant={"danger"} type={"submit"} style={{float: 'right'}} on>
                                Save
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Row>
        </div>
    );
};

export default CreateAsset;