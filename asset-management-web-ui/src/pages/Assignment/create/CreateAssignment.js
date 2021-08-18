import React, {useEffect, useState} from 'react';
import {Form, FormControl, Button, FormCheck, Row, InputGroup} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Formik} from "formik";
import axios from "axios";
import {useHistory} from "react-router-dom";
import * as Yup from 'yup'
import Popup from "reactjs-popup";
import SearchUser from "./SearchUser";
import SearchAsset from "./SearchAsset";
import moment from 'moment'
import SelectDate from "./SelectDate";

const CreateAssignment = ({setResponseAssigment}) => {
    const rootAPI = process.env.REACT_APP_SERVER_URL;
    const history = useHistory();
    const initialValues = {
        assetDTO: {
            assetID: null,
        },
        userDTO: {
            userID: null,
        },
        assignedDate: null,
        state: null,
        note: null
    }


    const onSubmit = (values, {setSubmitting}) => {
        let create = {
            assetDTO: {
                id: assetSelect.id,
            },
            userDTO: {
                id: singleUser.id,
            },
            assignedDate: moment(selectDate, "DD-MM-YYYY").format("YYYY-MM-DD"),
            state: 5,
            note: values.note,
            assignedBy: localStorage.getItem("username")
        };
        axios.post(rootAPI + `/assignments`, create)
            .then((response) => {
                setSubmitting(false);
                setResponseAssigment({
                    id: response.data.id,
                    assetCode: response.data.assetCode,
                    assetName: response.data.assetName,
                    username: response.data.username,
                    assignedDate: response.data.assignedDate,
                    state: 5,
                    note: response.data.note,
                });
                history.push("/assignment");
            });
    };
    const [singleUser, setSingleUser] = useState({
        id: null,
        username: null
    })
    const [assetSelect, setAssetSelect] = useState({
        id: null,
        assetCode: null,
        assetName: null,
    })
    const myDate = moment().format('DD/MM/YYYY');
    const [selectDate, setSelectDate] = useState(myDate);
    const validate = (singleUser, assetSelect) => {
        const errors = {};

        if (!singleUser.username) {
            errors.username = 'Require'
        }
        if (!assetSelect.assetCode) {
            errors.assetCode = 'require'
        }

        return errors;
    };
    const formValid = () => {
        if (singleUser.id === null) {
            return false;
        }
        if (assetSelect.id === null) {
            return false
        }
        return true;

    }
    return (
        <div className={"container ps-5 d-block"}>
            <Row>
                <h1 className={"text-danger mb-5"}>Create New Assignment</h1>
            </Row>
            <Row className={"mt-5"}>
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                >

                    {({
                          values,
                          errors,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          /* and other goodies */
                      }) => (
                        <Form onSubmit={handleSubmit}>
                            <Row className={"mb-3"}>
                                <InputGroup>
                                    <p className={"w-25"}>User</p>
                                    <Form.Control
                                        readOnly
                                        className={"bg-white"}
                                        aria-label="Username"
                                        name={"userID"}
                                        value={singleUser.username}
                                        onBlur={handleBlur}
                                    />
                                    <Popup
                                        trigger={
                                            <InputGroup.Text className={"bg-white"}><i className="bi bi-search"/>
                                            </InputGroup.Text>
                                        }
                                        position={"left top"}
                                        contentStyle={{width: "750px"}}
                                    >
                                        {close => <SearchUser close={close} setSingleUser={setSingleUser}/>}
                                    </Popup>
                                </InputGroup>
                            </Row>
                            <Row className="mb-3">
                                <InputGroup>
                                    <p className={"w-25"}>Asset</p>
                                    <Form.Control
                                        readOnly
                                        className={"bg-white"}
                                        aria-label="Username"
                                        name={"assetID"}
                                        value={assetSelect.assetCode}
                                        onBlur={handleBlur}
                                    />
                                    <Popup
                                        trigger={
                                            <InputGroup.Text className={"bg-white"}><i className="bi bi-search"/>
                                            </InputGroup.Text>
                                        }
                                        position={"left top"}
                                        contentStyle={{width: "750px"}}
                                    >
                                        {close => <SearchAsset close={close} setAssetSelect={setAssetSelect}/>}
                                    </Popup>
                                </InputGroup>
                            </Row>
                            <Row className="mb-3">
                                <InputGroup>
                                    <p className={"w-25"} id="basic-addon1">Assigned Date</p>
                                    <Form.Control
                                        readOnly
                                        aria-describedby="basic-addon1"
                                        className={"bg-white"}
                                        name={"assignedDate"}
                                        value={selectDate}
                                    />
                                    <Popup
                                        trigger={
                                            <InputGroup.Text className={"bg-white"}><i
                                                className="bi bi-calendar-event-fill"/>
                                            </InputGroup.Text>
                                        }
                                        position={"left top"}
                                        contentStyle={{width: "auto", padding:"0"}}
                                    >
                                        {close => <SelectDate setSelectDate={setSelectDate}/>}
                                    </Popup>

                                </InputGroup>
                            </Row>
                            <Row className="mb-3">
                                <InputGroup>
                                    <p className={"w-25"}>Note</p>
                                    <FormControl
                                        name={"note"}
                                        aria-describedby="basic-addon1"
                                        className={"w-75"}
                                        style={{height: '5em'}}
                                        onChange={handleChange}
                                    />
                                </InputGroup>
                            </Row>
                            <Button variant={"danger"} onClick={() => history.push('/assignment')} className={"ms-5"}
                                    style={{float: 'right'}}>
                                Cancel
                            </Button>
                            <Button
                                variant={"danger"}
                                type={"submit"}
                                style={{float: 'right'}}
                                disabled={!formValid()}
                            >
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