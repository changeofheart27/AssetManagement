import 'bootstrap/dist/css/bootstrap.min.css';

import {Button, Form, FormCheck, FormControl, Row} from "react-bootstrap";
import {useHistory} from 'react-router-dom';

import {Formik} from 'formik';
import React from 'react';
import axios from "axios";
import * as Yup from "yup";

const CreateUser = ({setResponseUser}) => {
    const rootAPI = process.env.REACT_APP_SERVER_URL;
    const history = useHistory();
    const initialValues = {
        id: null,
        staffCode: null,
        firstName: null,
        lastName: null,
        username: null,
        dob: null,
        gender: null,
        joinedDate: null,
        type: null
    }
    const onSubmit = (values, {setSubmitting}) => {
        let create = {
            username: values.lastName + values.firstName + Math.floor(Math.random() * 999),
            first_name: values.firstName,
            last_name: values.lastName,
            dob: values.dob,
            gender: values.gender,
            joined_date: values.joinedDate,
            type: values.type
        }
        axios
            .post(rootAPI + `/users`, create)
            .then((response) => {
                setSubmitting(false);
                setResponseUser({
                    id: response.data.id,
                    staffCode: response.data.staffCode,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    username: response.data.username,
                    dob: response.data.dob,
                    gender: response.data.gender,
                    joinedDate: response.data.joinedDate,
                    type: response.data.type
                });
                history.push("/user");
            });
    };
    const ValidateSchema = Yup.object().shape({
        firstName: Yup.string()
            .max(50)
            .required('Required'),
        lastName: Yup.string()
            .max(50)
            .required('Required'),
        dob: Yup.string()
            .required('Required'),
        type: Yup.string()
            .required('Required'),
        joinedDate: Yup.string()
            .required('Required'),
    });
    return (
        <div className={"container ps-5 d-block"}>
            <Row>
                <h1 className={"text-danger mb-5"}>Create New User</h1>
            </Row>
            <Row className={"mt-5"}>
                <Formik initialValues={initialValues}
                        onSubmit={onSubmit}
                        validationSchema={ValidateSchema}
                >
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
                                <p className={"w-25"}>First Name</p>
                                <FormControl
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    className={"w-75"}
                                    name={"firstName"}
                                    onChange={handleChange}
                                />
                                {errors.firstName && touched.firstName ? (
                                    <div className={"text-danger"} style={{paddingLeft: "25%"}}>User first name must be
                                        between 5-50 character</div>
                                ) : null}
                            </Row>
                            <Row className={"mb-3"}>
                                <p className={"w-25"}>Last Name</p>
                                <FormControl
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    className={"w-75"}
                                    name={"lastName"}
                                    onChange={handleChange}
                                />
                                {errors.lastName && touched.lastName ? (
                                    <div className={"text-danger"} style={{paddingLeft: "25%"}}>User first name must be
                                        between 5-50 character</div>
                                ) : null}
                            </Row>
                            <Row className="mb-3">
                                <p className={"w-25"} id="basic-addon1">Date of Birth</p>
                                <FormControl
                                    type={"date"}
                                    aria-describedby="basic-addon1"
                                    className={"w-75"}
                                    name={"dob"}
                                    onChange={handleChange}
                                />
                                {errors.dob && touched.dob ? (
                                    <div className={"text-danger"} style={{paddingLeft: "25%"}}>Please select DOB</div>
                                ) : null}
                            </Row>
                            <Row>
                                <p id="basic-addon1" className={"w-25"}>Gender</p>
                                <div className={"container w-75"}>
                                    <FormCheck
                                        inline
                                        type={"radio"}
                                        label={"Female"}
                                        className={"w-75"}
                                        name={"gender"}
                                        onChange={() => values.gender = "Female"}
                                    >
                                    </FormCheck>
                                    <FormCheck
                                        inline
                                        type={"radio"}
                                        label={"Male"}
                                        className={"w-75"}
                                        name={"gender"}
                                        onChange={() => values.gender = "Male"}
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
                                    name={"joinedDate"}
                                    onChange={handleChange}
                                />
                                {errors.joinedDate && touched.joinedDate ? (
                                    <div className={"text-danger"} style={{paddingLeft: "25%"}}>Please select Joined
                                        Date</div>
                                ) : null}
                            </Row>
                            <Row className="mb-3">
                                <p className={"col-3"}>Type</p>
                                <Form.Select
                                    size="sm"
                                    className={"w-75"}
                                    name={"type"}
                                    value={values.type}
                                    onChange={handleChange}
                                >
                                    <option selected></option>
                                    <option>Admin</option>
                                    <option>Staff</option>
                                </Form.Select>
                                {errors.type && touched.type ? (
                                    <div className={"text-danger"} style={{paddingLeft: "25%"}}>Please select TYPE</div>
                                ) : null}
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

export default CreateUser;