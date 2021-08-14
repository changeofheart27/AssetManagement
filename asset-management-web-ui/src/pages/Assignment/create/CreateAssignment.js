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

const CreateAssignment = ({setResponseAssigment}) => {
    const rootAPI = process.env.REACT_APP_SERVER_URL;
    const [asset, setAsset] = useState([]);
    useEffect(() => {
        axios.get(rootAPI + "/assets").then((response) => {
            setAsset(response.data);
        });
    }, []);
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
            assignedDate: values.assignedDate,
            state: 5,
            note: values.note
        };

        axios.post(rootAPI + `/assignments`, create)
            .then((response) => {
                setSubmitting(false);
                setResponseAssigment({
                    id: response.data.id,
                    assetCode: response.data.assetCode,
                    assetName: response.data.assetName,
                    assignedDate: response.data.assignedDate,
                    state: 5,
                });
                history.push("/assignment");
            });
    };
    const [singleUser, setSingleUser] = useState({
        id: null,
        username: null
    })
    const [assetSelect, setAssetSelect]= useState({
        id: null,
        assetCode: null
    })
    useEffect(() => {
        console.log(singleUser)
    }, [singleUser])
    return (
        <div className={"container ps-5 d-block"}>
            <Row>
                <h1 className={"text-danger mb-5"}>Create New Assignment</h1>
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
                                <InputGroup>
                                    <p className={"w-25"}>User</p>
                                    <Form.Control
                                        disabled
                                        className={"bg-white"}
                                        aria-label="Username"
                                        name={"userID"}
                                        value={singleUser.username}
                                        onBlur={handleBlur}
                                        isValid={touched.userID && !errors.userID}
                                        isInvalid={touched.userID && errors.userID}
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
                                        disabled
                                        className={"bg-white"}
                                        aria-label="Username"
                                        name={"assetID"}
                                        value={assetSelect.assetCode}
                                        onBlur={handleBlur}
                                        isValid={touched.assetID && !errors.assetID}
                                        isInvalid={touched.assetID && errors.assetID}
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
                                <p className={"w-25"} id="basic-addon1">Assigned Date</p>
                                <FormControl
                                    type={"date"}
                                    aria-describedby="basic-addon1"
                                    className={"w-75"}
                                    name={"assignedDate"}
                                    onChange={handleChange}
                                    isValid={touched.installedDate && !errors.installedDate}
                                    isInvalid={touched.installedDate && errors.installedDate}
                                />
                            </Row>
                            <Row className="mb-3">
                                <p className={"w-25"}>Note</p>
                                <FormControl
                                    name={"note"}
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    className={"w-75"}
                                    style={{height: '5em'}}
                                    onChange={handleChange}
                                />
                            </Row>
                            <Button variant={"danger"} onClick={() => history.push('/assignment')} className={"ms-5"}
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