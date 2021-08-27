import 'bootstrap/dist/css/bootstrap.min.css';
import './UserInfo.css'

import * as Yup from "yup";

import {Button, Form, FormCheck, FormControl, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useHistory, useParams} from 'react-router-dom';

import {ButtonGroup} from "react-bootstrap";
import {Formik} from 'formik';
import React from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';

const UserInfo = ({props, loginSuccess, setResponseUser}) => {
    const username = localStorage.getItem('username')
    const token = localStorage.getItem('jwttoken')

    const headers = {
        'Authorization': token

    };
    const [showLoginSuccess, setShowLoginSuccess] = useState(false);
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
            .min(8,"Password at least have 8 character")
            .max(500)
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password requires at least 8 characters, one uppercase letter, one number, one special character (e.g.!@#$%)")
            .required('Required')
            .typeError('New Password is required'),
    });
    const onSubmit = (values, {setSubmitting}) => {
        axios({
                method: "POST",
                url: rootAPI + "/authenticate",
                data: {
                    username: username,
                    password: values.oldPassword,
                },
            }
        )
            .then((response) => {
                setSubmitting(false);
                localStorage.setItem("jwttoken", "Bearer " + response.data.jwttoken);
                setShowLoginSuccess(true);
                toast.success("Your password has been changed successfully");
            }).then((response) => {
            let editUserPassword = {
                password: values.newPassword
            }
            axios
                .put(rootAPI + `/change-password/${username}`, editUserPassword, {headers})
                .then((response) => {
                    setSubmitting(false);

                }).catch((error) => {
                localStorage.clear()
                window.location.href = "/login";
            });
        })

            .catch((error) => {
                setSubmitting(false);
                setSubmitError(
                    "Login fails status code: " + error
                );
                toast.error("Password is incorrect");

            });
    }


    return (
        <div className="body-changepassword">
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
                                value={values.oldPassword}
                                name={"oldPassword"}
                                type={"password"}
                                onChange={handleChange}
                                onBlur={handleBlur}
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
                                value={values.newPassword}
                                name={"newPassword"}
                                type={"password"}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                isInvalid={touched.newPassword && errors.newPassword}
                            />
                            {errors.newPassword && touched.newPassword ? (
                                <div className={"text-danger"} style={{paddingLeft: "25%"}}>{errors.newPassword}</div>
                            ) : null}
                        </Row>

                        <Row className={"justify-content-between"}>
                            <ButtonGroup className={"w-50"}>
                                <Button variant={"danger"} type={"submit"}
                                        disabled={isSubmitting} on>
                                    Save
                                </Button>
                            </ButtonGroup>
                            <ButtonGroup className={"w-50 pe-0"}>
                                <Button variant={"secondary"}
                                        onClick={() => history.push('/home')} type={"submit"}>
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
