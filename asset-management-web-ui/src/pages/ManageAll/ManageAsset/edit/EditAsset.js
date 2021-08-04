import React, {useEffect, useState} from 'react';
import {Form, FormControl, Button, FormCheck, Row} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useHistory, useParams} from 'react-router-dom';
import axios from "axios";
import {Formik} from "formik";

const EditAsset = () => {
    let {id} = useParams();
    const history = useHistory();
    const [asset, setAsset] = useState({
        assetName: null,
        specification: null,
        installedDate: null,
        state: null
    });
    useEffect(() => {
        axios.get(`http://localhost:8080/api/v1/assets/${id}`)
            .then(function (response) {
                setAsset(response.data);
            })
    }, [id])

    const initialValues = {
        assetName: asset.assetName,
        specification: asset.specification,
        installedDate: asset.installedDate,
        state: asset.state
    }
    const onSubmit = (values, {setSubmitting}) => {
        let edit = {
            id: id,
            assetName: values.assetName,
            specification: values.specification,
            installedDate: values.installedDate,
            state: values.state
        }
        axios
            .put(`http://localhost:8080/api/v1/assets/${id}`, edit)
            .then(response => {
                setSubmitting(false);
                history.push("/asset");
            });
    };
    return (
        <div className={"container ps-5 d-block"}>
            <Row>
                <h1 className={"text-danger mb-5"}>Edit Asset</h1>
            </Row>
            <Row className={"mt-5"}>
                <Formik initialValues={initialValues} onSubmit={onSubmit} enableReinitialize={"true"}>
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
                                    name={"assetName"}
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    className={"w-75"}
                                    value={values.assetName}
                                    onChange={handleChange}
                                />
                            </Row>
                            <Row className="mb-3">
                                <p className={"col-3"}>Category</p>
                                <Form.Select size="sm" className={"w-75"}>
                                    <option>Laptop</option>
                                    <option>Monitor</option>
                                    <option>Personal Computer</option>
                                </Form.Select>
                            </Row>
                            <Row className="mb-3">
                                <p className={"w-25"}>Specification</p>
                                <FormControl
                                    aria-label="Specification"
                                    aria-describedby="basic-addon1"
                                    className={"w-75"}
                                    style={{height: '5em'}}
                                    name={"specification"}
                                    value={values.specification}
                                    onChange={handleChange}
                                />
                            </Row>
                            <Row className="mb-3">
                                <p className={"w-25"} id="basic-addon1">Install Date</p>
                                <FormControl
                                    name={"installedDate"}
                                    type={"date"}
                                    aria-describedby="basic-addon1"
                                    className={"w-75"}
                                    value={values.installedDate}
                                    onChange={handleChange}
                                />
                            </Row>
                            <Row>
                                <p id="basic-addon1" className={"w-25"}>State</p>
                                <div className={"container w-75"}
                                     style={{display: 'flex', flexDirection: 'column'}}>
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
                            <Button variant={"danger"} type={"submit"} className={"ms-5"} style={{float: 'right'}}>
                                Cancel
                            </Button>
                            <Button variant={"danger"} type={"submit"} style={{float: 'right'}}>
                                Save
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Row>
        </div>
    );
};

export default EditAsset;