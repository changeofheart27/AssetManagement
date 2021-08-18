import 'bootstrap/dist/css/bootstrap.min.css';

import * as Yup from "yup";
import {ButtonGroup} from "react-bootstrap";


import { Formik } from 'formik';
import React from 'react';
import axios from 'axios';
import { useState } from "react";
import {useHistory} from 'react-router-dom';
import {Button, Form, FormCheck, FormControl, Row} from "react-bootstrap";

const UserInfo = ({props, loginSuccess}) => {
    const rootAPI = process.env.REACT_APP_SERVER_URL;
    const [submitError, setSubmitError] = useState("");
    const history = useHistory();
    const initialValues = {oldPassword: '', newPassword: ''};

    const ValidateSchema = Yup.object().shape({
        oldPassword: Yup.string()
            .max(500)
            .required('Required')
            .typeError('Current Password is required'),
        newPassword: Yup.string()
            .max(500)
            .required('Required')
            .typeError('New Password is required'),
    });
    const onSubmit = (values, {setSubmitting}) => {
        axios({
                method: "POST",
                url: rootAPI + "/authenticate",
                headers: {},
                data: {
                    oldPassword: values.username,
                    newPassword: values.password,
                },
            }
        )
            .then((response) => {
                setSubmitting(false);
                console.log(response);
                localStorage.clear();
                localStorage.setItem("jwttoken", "Bearer " + response.data.jwttoken);
                localStorage.setItem("username", values.username);
                window.location.href = "/home";

            }).catch((error) => {
            setSubmitting(false);
            console.log(error);
            setSubmitError(
                "Login fails status code: " + error
            );
        });
    }
    return (
        <div>
            <h3 className={"text-danger"}>Change Password</h3>
            <hr/>
            <Formik
                initialValues={initialValues}
                validationSchema={ValidateSchema}
                onSubmit={onSubmit}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,

                  }) => (
                    <Form onSubmit={handleSubmit}>
                        <Row className={"mb-3"}>
                            <p className={"w-25"}>Old Password</p>
                            <FormControl
                                aria-label="Old Password"
                                aria-describedby="basic-addon1"
                                className={"w-75"}
                                name={"oldPassword"}
                                type={"password"}
                                onChange={handleChange}
                                isValid={touched.oldPassword && !errors.oldPassword}
                                isInvalid={touched.oldPassword && errors.oldPassword}
                            />
                            {errors.oldPassword && touched.oldPassword ? (
                                <div className={"text-danger"} style={{paddingLeft: "25%"}}>{errors.oldPassword}</div>
                            ) : null}
                        </Row>
                        <Row className={"mb-3"}>
                            <p className={"w-25"}>New Password</p>
                            <FormControl
                                aria-label="New Password"
                                aria-describedby="basic-addon1"
                                className={"w-75"}
                                name={"newPassword"}
                                type={"password"}
                                onChange={handleChange}
                                isValid={touched.newPassword && !errors.newPassword}
                                isInvalid={touched.newPassword && errors.newPassword}
                            />
                            {errors.newPassword && touched.newPassword ? (
                                <div className={"text-danger"} style={{paddingLeft: "25%"}}>{errors.newPassword}</div>
                            ) : null}
                        </Row>
                        <Row>
                            <ButtonGroup>
                                <Button variant={"danger"} type={"submit"} style={{float: 'right'}}
                                        disabled={isSubmitting} on>
                                    Submit
                                </Button>
                                <Button variant={"danger"} onClick={() => history.push('/home')} type={"submit"}
                                        className={"ms-5"} style={{float: 'right'}}>
                                    Cancel
                                </Button>
                            </ButtonGroup>
                        </Row>

                    </Form>

                )
                }
            </Formik>
        </div>
    );
}

export default UserInfo;
