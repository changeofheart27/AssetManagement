import React, {useEffect, useState} from 'react';
import {Form, FormControl, Button, FormCheck, Row} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Formik} from "formik";
import axios from "axios";
import {useHistory} from "react-router-dom";
import * as Yup from 'yup'

const CreateAsset = ({setResponseDataAsset}) => {
    const rootAPI = process.env.REACT_APP_SERVER_URL;
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        axios.get(rootAPI+"/categories").then((response) => {
            setCategories(response.data);
        });
    }, []);
    const history = useHistory();
    const initialValues = {
        assetName: null,
        specification: null,
        installedDate: null,
        state: null,
        category: null,
    }
    const onSubmit = (values, {setSubmitting}) => {
        let create = {
            assetName: values.assetName,
            specification: values.specification,
            installedDate: values.installedDate,
            state: values.state,
            categoryDTO: {
                id: values.category
            },
        };

        axios.post(rootAPI+`/assets`, create)
            .then((response) => {
                setSubmitting(false);
                setResponseDataAsset({
                    id: response.data.id,
                    assetCode: response.data.assetCode,
                    assetName: response.data.assetName,
                    specification: response.data.specification,
                    installedDate: response.data.installedDate,
                    state: response.data.state,
                    categoryDTO: response.data.categoryDTO,
                });
                history.push("/asset");
            });
    };
    const ValidateSchema = Yup.object().shape({
        assetName: Yup.string()
            .min(5)
            .max(50)
            .required('Required'),
        category: Yup.string().required('Required'),
        installedDate: Yup.string().required('Required'),
        state: Yup.number().required('Required')
    });
    return (
        <div className={"container ps-5 d-block"}>
            <Row>
                <h1 className={"text-danger mb-5"}>Create New Asset</h1>
            </Row>
            <Row className={"mt-5"}>
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={ValidateSchema}>
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
                                />
                                {errors.assetName && touched.assetName ? (
                                    <div className={"text-danger"} style={{paddingLeft:"25%"}}>Asset Name must be between 5-50 character</div>
                                ) : null}
                            </Row>
                            <Row className="mb-3">
                                <p className={"col-3"}>Category</p>
                                <Form.Select
                                    name={"category"}
                                    size="sm"
                                    className={"w-75"}
                                    onChange={handleChange}
                                >
                                    <option selected/>
                                    {categories.map((category) => (
                                        <option value={category.id}>{category.name}</option>
                                    ))}
                                </Form.Select>
                                {errors.category && touched.category ? (
                                    <div className={"text-danger"} style={{paddingLeft:"25%"}}>Please select one category</div>
                                ) : null}
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
                                >
                                </FormControl>
                                {errors.installedDate && touched.installedDate ? (
                                    <div className={"text-danger"} style={{paddingLeft:"25%"}}>Please select Install Date</div>
                                ) : null}
                            </Row>
                            <Row>
                                <p id="basic-addon1" className={"w-25"}>State</p>
                                <div className={"container-lg w-75"}
                                     style={{display: 'flex', flexDirection: 'column'}}>
                                    <FormCheck
                                        inline
                                        name={"status"}
                                        type={"radio"}
                                        label={"Available"}
                                        className={"w-75"}
                                        onChange={() => values.state = 0}
                                    >
                                    </FormCheck>
                                    <FormCheck
                                        inline
                                        name={"status"}
                                        type={"radio"}
                                        label={"Not available"}
                                        className={"w-75"}
                                        onChange={() => values.state = 1}
                                    >
                                    </FormCheck>
                                    {errors.state && touched.state ? (
                                        <div className={"text-danger"}>Please select status</div>
                                    ) : null}
                                </div>
                            </Row>
                            <Button variant={"danger"} onClick={() => history.push('/asset')} className={"ms-5"}
                                    style={{float: 'right'}}>
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