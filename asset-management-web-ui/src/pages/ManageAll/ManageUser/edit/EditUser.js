import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Form, FormCheck, FormControl, Row} from "react-bootstrap";
import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {Formik} from 'formik';
import axios from "axios";
import * as Yup from "yup";

const EditUser = ({setResponseUser}) => {
    const rootAPI = process.env.REACT_APP_SERVER_URL;
    let {id} = useParams();
    const history = useHistory();
    const [user, setUser] = useState({
        id: null,
        username: null,
        staffCode: null,
        firstName: null,
        lastName: null,
        dob: null,
        gender: null,
        joinedDate: null,
        type: null,
        password: null,
        location: null,
        status: null
    });
    useEffect(() => {
        axios
            .get(rootAPI+`/users/${id}`)
            .then(function (response) {
                setUser(response.data);
                setGender(response.data.gender);
            });
    }, [id])

    const [gender, setGender] = useState("");
    const initialValues = {
        staffCode: user.staffCode,
        firstName: user.firstName,
        username: user.username,
        lastName: user.lastName,
        dob: user.dob,
        gender: user.gender,
        joinedDate: user.joinedDate,
        type: user.type,
        status: user.status,
        location: user.location,
        password: user.password

    }
    const onSubmit = (values, {setSubmitting}) => {
        let editUser = {
            staff_code: values.staffCode,
            username: values.username,
            first_name: values.firstName,
            last_name: values.lastName,
            dob: values.dob,
            gender: gender,
            joined_date: values.joinedDate,
            type: values.type,
            status: user.status,
            location: user.location,
            password: user.password
        }
        axios
            .put(rootAPI+`/users/${id}`, editUser)
            .then((response) => {
                setSubmitting(false);
                setResponseUser({
                    id:response.data.id,
                    staffCode: response.data.staffCode,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    username:response.data.username,
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
        type: Yup.string()
            .required('Required')
    });
    return (
        <div className={"container ps-5 d-block"}>
            <Row>
                <h1 className={"text-danger mb-5"}>Edit User</h1>
            </Row>
            <Row className={"mt-5"}>
                <Formik initialValues={initialValues}
                        onSubmit={onSubmit}
                        enableReinitialize={"true"}
                        validationSchema={ValidateSchema}>
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
                                    name="firstName"
                                    style={{backgroundColor: '#eff1f5'}}
                                    value={values.firstName}
                                    onChange={handleChange}
                                    onError={errors}
                                />
                                {errors.firstName && touched.firstName ? (
                                    <div className={"text-danger"} style={{paddingLeft:"25%"}}>User first name must be between 5-50 character</div>
                                ) : null}
                            </Row>
                            <Row className={"mb-3"}>
                                <p className={"w-25"}>Last Name</p>
                                <FormControl
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    className={"w-75"}
                                    name="lastName"
                                    style={{backgroundColor: '#eff1f5'}}
                                    value={values.lastName}
                                    onChange={handleChange}
                                />
                                {errors.firstName && touched.firstName ? (
                                    <div className={"text-danger"} style={{paddingLeft:"25%"}}>User last name must be between 5-50 character</div>
                                ) : null}
                            </Row>
                            <Row className="mb-3">
                                <p className={"w-25"} id="basic-addon1">Date of Birth</p>
                                <FormControl
                                    type={"date"}
                                    aria-describedby="basic-addon1"
                                    className={"w-75"}
                                    value={values.dob}
                                    onChange={handleChange}
                                />
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
                                        checked={gender === "Female"}
                                        onChange={() => setGender("Female")}
                                    >
                                    </FormCheck>
                                    <FormCheck
                                        inline
                                        type={"radio"}
                                        label={"Male"}
                                        className={"w-75"}
                                        name={"gender"}
                                        checked={gender === "Male"}
                                        onChange={() => setGender("Male")}
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
                                    value={values.joinedDate}
                                    onChange={handleChange}
                                />
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
                                    <div className={"text-danger"} style={{paddingLeft:"25%"}}>Must select type of user</div>
                                ) : null}
                            </Row>
                            <Button variant={"danger"} type={"submit"} className={"ms-5"} style={{float: 'right'}}>
                                Cancel
                            </Button>
                            <Button variant={"danger"} type="submit" style={{float: 'right'}}>
                                Save
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Row>
        </div>
    );
};

export default EditUser;