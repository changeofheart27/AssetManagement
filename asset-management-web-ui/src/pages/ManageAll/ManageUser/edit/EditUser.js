import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Form, FormCheck, FormControl, Row} from "react-bootstrap";
import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {Formik} from 'formik';
import axios from "axios";
import * as Yup from "yup";
import {differenceInYears} from "date-fns";
import differenceInDays from 'date-fns/differenceInDays/index.js';
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
            .required('Required')
            .typeError('First name is required'),
        lastName: Yup.string()
            .max(50)
            .required('Required')
            .typeError('Last name is required'),
        type: Yup.string()
            .required('Required')
            .typeError('Please select type'),
        dob: Yup.date()
            .required()
            .typeError('DOB is required')
            .test("dob", "Should be greater than 18", function (value) {
                return differenceInYears(new Date(), new Date(value)) >= 18;
            }),
        joinedDate: Yup.date()
            .required()
            .typeError('Joined Date is required')
            .min(Yup.ref('dob'),"Should be greater than DOB")
            .test("dob", "Should be greater than DOB", function (value) {
                return differenceInDays(new Date(value), new Date(this.parent.dob)) != 0;
        }),
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
                                    isValid={touched.firstName && !errors.firstName}
                                    isInvalid={touched.firstName && errors.firstName}
                                />
                                {errors.firstName && touched.firstName ? (
                                    <div className={"text-danger"} style={{paddingLeft:"25%"}}>{errors.firstName}</div>
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
                                    isValid={touched.lastName && !errors.lastName}
                                    isInvalid={touched.lastName && errors.lastName}
                                />
                                {errors.lastName && touched.lastName ? (
                                    <div className={"text-danger"} style={{paddingLeft:"25%"}}>{errors.lastName}</div>
                                ) : null}
                            </Row>
                            <Row className="mb-3">
                                <p className={"w-25"} id="basic-addon1">Date of Birth</p>
                                <FormControl
                                    type={"date"}
                                    aria-describedby="basic-addon1"
                                    name={"dob"}
                                    className={"w-75"}
                                    value={values.dob}
                                    onChange={handleChange}
                                    isValid={touched.dob && !errors.dob}
                                    isInvalid={touched.dob && errors.dob}
                                />
                                {errors.dob && touched.dob ? (
                                    <div className={"text-danger"} style={{paddingLeft:"25%"}}>{errors.dob}</div>
                                ) : null}
                            </Row>
                            <Row className={"mb-3"}>
                                <p id="basic-addon1" className={"w-25"}>Gender</p>
                                <div className={"container-lg w-75"}>
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
                                    isValid={touched.joinedDate && !errors.joinedDate}
                                    isInvalid={touched.joinedDate && errors.joinedDate}
                                />
                                {errors.joinedDate && touched.joinedDate ? (
                                    <div className={"text-danger"} style={{paddingLeft: "25%"}}>{errors.joinedDate}</div>
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
                                    isValid={touched.type && !errors.type}
                                    isInvalid={touched.type && errors.type}
                                >
                                    <option selected></option>
                                    <option>Admin</option>
                                    <option>Staff</option>
                                </Form.Select>
                                {errors.type && touched.type ? (
                                    <div className={"text-danger"} style={{paddingLeft:"25%"}}>{errors.type}</div>
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