import React, {useEffect, useState} from 'react';
import {Form, FormControl, Button, FormCheck, Row} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Formik} from "formik";
import axios from "axios";
import {useHistory} from "react-router-dom";
import * as Yup from 'yup'

const CreateAssignment = ({setResponseAssigment}) => {
    const rootAPI = process.env.REACT_APP_SERVER_URL;
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        axios.get(rootAPI+"/categories").then((response) => {
            setCategories(response.data);
        });
    }, []);
    const history = useHistory();
    const initialValues = {
        id: null,
        assetDTO: {
            assetName: null,
        },
        userDTO: {
            name: null,
        },
        assignedDate:null,
        state:null
        }
    const onSubmit = (values, {setSubmitting}) => {
        let create = {
            assetDTO: {
                assetName: values.assetName,
            },
            assignedDate: values.assignedDate,
            state: values.state
        };

        axios.post(rootAPI+`/assets`, create)
            .then((response) => {
                setSubmitting(false);
                setResponseAssigment({
                    id: response.data.id,
                    assetCode: response.data.assetCode,
                    assetName: response.data.assetName,
                    assignedDate: response.data.assignedDate,
                    state: response.data.state,
                });
                history.push("/assignment");
            });
    };
    const ValidateSchema = Yup.object().shape({
        assetName: Yup.string()
            .min(2)
            .max(50)
            .required('Required')
            .typeError('Name can not empty'),
        category: Yup.string()
            .required('Required')
            .typeError('Category can not empty'),
        installedDate: Yup.string()
            .required('Required')
            .typeError('Installed date can not empty'),
        status: Yup.boolean()
            .required('Required')
            .typeError('State can not empty'),
    });
    return (
        <div className={"container ps-5 d-block"}>
            <Row>
                <h1 className={"text-danger mb-5"}>Create New Assignment</h1>
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
                                <p className={"w-25"}>User</p>
                                <FormControl
                                    type=""
                                    aria-label="Username"
                                    className={"w-75"}
                                    name={"assetName"}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.assetName && !errors.assetName}
                                    isInvalid={touched.assetName && errors.assetName}
                                />
                                {errors.assetName && touched.assetName ? (
                                    <div className={"text-danger"} style={{paddingLeft:"25%"}}>{errors.assetName}</div>
                                ) : null}
                            </Row>
                            <Row className="mb-3">
                                <p className={"col-3"}>Asset</p>
                                <Form.Select
                                    name={"category"}
                                    size="sm"
                                    className={"w-75"}
                                    onChange={handleChange}
                                    isValid={touched.category && !errors.category}
                                    isInvalid={touched.category && errors.category}
                                >
                                    <option selected/>
                                    {categories.map((category) => (
                                        <option value={category.id}>{category.name}</option>
                                    ))}
                                </Form.Select>
                                {errors.category && touched.category ? (
                                    <div className={"text-danger"} style={{paddingLeft:"25%"}}>{errors.category}</div>
                                ) : null}
                            </Row>
                            <Row className="mb-3">
                                <p className={"w-25"} id="basic-addon1">Assigned Date</p>
                                <FormControl
                                    type={"date"}
                                    aria-describedby="basic-addon1"
                                    className={"w-75"}
                                    name={"installedDate"}
                                    onChange={handleChange}
                                    isValid={touched.installedDate && !errors.installedDate}
                                    isInvalid={touched.installedDate && errors.installedDate}
                                />
                                {errors.installedDate && touched.installedDate ? (
                                    <div className={"text-danger"} style={{paddingLeft:"25%"}}>{errors.installedDate}</div>
                                ) : null}
                            </Row>
                            <Row className="mb-3">
                                <p className={"w-25"}>Note</p>
                                <FormControl
                                    name={"specification"}
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    className={"w-75"}
                                    style={{height: '5em'}}
                                    onChange={handleChange}
                                />
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

export default CreateAssignment;