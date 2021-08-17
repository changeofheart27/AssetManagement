import React, {useState, useEffect} from 'react'
import { Form, FormControl, Button, FormCheck, Row, InputGroup } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Formik } from "formik";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import * as Yup from "yup";
import Popup from 'reactjs-popup';
import SearchUser from '../create/SearchUser';
import SearchAsset from '../create/SearchAsset';

const EditAssignment = ({ setResponseAssigment }) => {
    const rootAPI = process.env.REACT_APP_SERVER_URL;
    let {id} = useParams();
    const history = useHistory();
    const [asset, setAsset] = useState({
        assetDTO: {
            assetID: null,
        },
        userDTO: {
            userID: null,
        },
        assignedDate: null,
        state: null,
        note: null
    });
    const [singleUser, setSingleUser] = useState({
        id: null,
        username: null
    })
    const [assetSelect, setAssetSelect]= useState({
        id: null,
        assetName: null
    })
    useEffect(() => {
        axios.get(rootAPI + `/assignments/${id}`)
            .then(function (response) {
                setAsset(response.data);
                setSingleUser(response.data.userDTO);
                setAssetSelect(response.data.assetDTO);
            });
    }, [id])
    const initialValues = {
        id: id,
        assetDTO: {
            id: assetSelect.id,
            assetName: assetSelect.assetName,
        },
        userDTO: {
            id: asset.userDTO.id,
            username: asset.userDTO.username,
        },
        assignedDate: asset.assignedDate,
        state: 5,
        note: asset.note
    }
    const onSubmit = (values, {setSubmitting}) => {
        let edit = {
            id: id,
            assetDTO: {
                id: values.assetDTO.id,
                assetName: values.assetDTO.assetName,
            },
            userDTO: {
                id: values.userDTO.id,
            },
            assignedDate: values.assignedDate,
            state: 5,
            note: values.note
        };
        axios.put(rootAPI + `/assignments/${id}`, edit)
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
                history.push("/assignments");
            });
    };
    
    return (
        <div className={"container ps-5 d-block"}>
            <Row>
                <h1 className={"text-danger mb-5"}>Edit Assignment</h1>
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
                                        value={values.userDTO.username}
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
                                        value={values.assetDTO.assetName}
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
                                    value={values.assignedDate}
                                    onBlur={handleBlur}
                                    isValid={touched.assignedDate && !errors.assignedDate}
                                    isInvalid={touched.assignedDate && errors.assignedDate}
                                />
                                {errors.assignedDate && touched.assignedDate ? (
                                    <div className={"text-danger"} style={{paddingLeft:"25%"}}>{errors.assignedDate}</div>
                                ) : null}
                            </Row>
                            <Row className="mb-3">
                                <p className={"w-25"}>Note</p>
                                <FormControl
                                    name={"note"}
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    className={"w-75"}
                                    onChange={handleChange}
                                    value={values.note}
                                    onBlur={handleBlur}
                                    style={{ height: '5em' }}
                                    onChange={handleChange}
                                />
                            </Row>
                            <Button variant={"danger"} onClick={() => history.push('/assignment')} className={"ms-5"}
                                style={{ float: 'right' }}>
                                Cancel
                            </Button>
                            <Button variant={"danger"} type={"submit"} style={{ float: 'right' }} on>
                                Save
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Row>
        </div>
    )
}
export default EditAssignment;