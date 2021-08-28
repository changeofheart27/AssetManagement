import React, {useState, useEffect} from "react";
import {
    Form,
    FormControl,
    Button,
    FormCheck,
    Row,
    InputGroup,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {Formik} from "formik";
import axios from "axios";
import {useHistory, useParams} from "react-router-dom";
import * as Yup from "yup";
import Popup from "reactjs-popup";
import SearchUser from "../create/SearchUser";
import SearchAsset from "../create/SearchAsset";
import SearchAssetAntD from "../create/SearchAssetMTU";
import SearchUserAntD from "../create/SearchUserAntD";

const EditAssignment = ({setResponseAssigment}) => {
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
        assignedBy: null,
        state: null,
        note: null,
    });
    const [singleUser, setSingleUser] = useState({
        id: null,
        username: null,
    });
    const [assetSelect, setAssetSelect] = useState({
        id: null,
        assetName: null,
        assetCode: null,
    });
    useEffect(() => {
        axios.get(rootAPI + `/assignments/${id}`).then(function (response) {
            setAsset(response.data);
            setSingleUser(response.data.userDTO);
            setAssetSelect(response.data.assetDTO);
        });
    }, [id]);
    const initialValues = {
        id: id,
        assetDTO: {
            id: assetSelect.id,
            assetName: assetSelect.assetName,
            assetCode: assetSelect.assetCode,
        },
        userDTO: {
            id: singleUser.id,
            username: singleUser.username,
        },
        assignedDate: asset.assignedDate,
        assignedBy: localStorage.getItem("username"),
        state: asset.state,
        note: asset.note,
    };
    const onSubmit = (values, {setSubmitting}) => {
        let edit = {
            id: id,
            assetDTO: values.assetDTO,
            userDTO: values.userDTO,
            assignedDate: values.assignedDate,
            assignedBy: values.assignedBy,
            state: values.state,
            note: values.note,
        };
        axios.put(rootAPI + `/assignments/${id}`, edit).then((response) => {
            setSubmitting(false);
            setResponseAssigment({
                id: response.data.id,
                assetDTO: response.data.assetDTO,
                userDTO: response.data.userDTO,
                assignedDate: response.data.assignedDate,
                assignedBy: response.data.assignedBy,
                state: 5,
                note: response.data.note,
            });
            history.push("/assignment");
        });
    };

    return (
        <div className={"container ps-5 d-block"}>
            <Row>
                <h1 className={"text-danger mb-5"}>Edit Assignment</h1>
            </Row>
            <Row className={"mt-5"}>
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    enableReinitialize={"true"}
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
                                <InputGroup>
                                    <p className={"w-25"}>User</p>
                                    <Form.Control
                                        disabled
                                        className={"bg-white"}
                                        aria-label="Username"
                                        name={"userID"}
                                        value={values.userDTO.username}
                                        onBlur={handleBlur}
                                    />
                                    <Popup
                                        trigger={
                                            <InputGroup.Text className={"bg-white"}>
                                                <i className="bi bi-search"/>
                                            </InputGroup.Text>
                                        }
                                        position={"left top"}
                                        contentStyle={{width: "750px"}}
                                        modal
                                    >
                                        {(close) => (
                                            <SearchUserAntD close={close} setSingleUser={setSingleUser}/>
                                        )}
                                    </Popup>
                                </InputGroup>
                            </Row>
                            <Row className="mb-3">
                                <InputGroup>
                                    <p className={"w-25"}>Asset</p>
                                    <Form.Control
                                        disabled
                                        className={"bg-white"}
                                        aria-label="Assetname"
                                        name={"assetID"}
                                        value={values.assetDTO.assetName}
                                        onBlur={handleBlur}
                                    />
                                    <Popup
                                        trigger={
                                            <InputGroup.Text className={"bg-white"}>
                                                <i className="bi bi-search"/>
                                            </InputGroup.Text>
                                        }
                                        position={"left top"}
                                        contentStyle={{width: "750px"}}
                                        modal
                                    >
                                        {(close) => (
                                            <SearchAssetAntD
                                                close={close}
                                                setAssetSelect={setAssetSelect}
                                            />
                                        )}
                                    </Popup>
                                </InputGroup>
                            </Row>
                            <Row className="mb-3">
                                <p className={"w-25"} id="basic-addon1">
                                    Assigned Date
                                </p>
                                <FormControl
                                    type={"date"}
                                    aria-describedby="basic-addon1"
                                    className={"w-75"}
                                    name={"assignedDate"}
                                    onChange={handleChange}
                                    value={values.assignedDate}
                                    onBlur={handleBlur}
                                />
                            </Row>
                            <Row className="mb-3">
                                <p className={"w-25"}>Note</p>
                                <FormControl
                                    name={"note"}
                                    aria-describedby="basic-addon1"
                                    className={"w-75"}
                                    value={values.note}
                                    onBlur={handleBlur}
                                    style={{height: "5em"}}
                                    onChange={handleChange}
                                />
                            </Row>
                            <Button
                                variant={"light"}
                                onClick={() => history.push("/assignment")}
                                className={"ms-5"}
                                style={{float: "right"}}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant={"danger"}
                                type={"submit"}
                                style={{float: "right"}}
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
export default EditAssignment;
