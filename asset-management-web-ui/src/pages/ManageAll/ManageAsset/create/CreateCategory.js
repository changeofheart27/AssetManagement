import React, { useState } from "react";
import {Form, FormControl, Button, Row} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {Formik} from "formik";
import axios from "axios";
import {useHistory} from "react-router-dom";

const CreateCategory = () => {
    const rootAPI = process.env.REACT_APP_SERVER_URL;
    const history = useHistory();
    const [errorMsg, setErrorMsg] = useState(null);
    const initialValues = {
        name: null,
        prefix: null
    };
    const onSubmit = (values, {setSubmitting}) => {
        let create = {
            name: values.name,
            prefix: values.prefix
        };
        axios
            .post(rootAPI + `/categories`, create)
            .then((response) => {
                setSubmitting(false);
                history.push("/asset/createasset");
            })
            .catch(error => {
                if (error.response.status === 400) {
                    console.log("ERROR!");
                    setErrorMsg("Category is already existed. Please enter a different category");
                }
            });
    };
    return (
      <div className={"container ps-5 d-block"}>
        <Row>
          <h1 className={"text-danger mb-5"}>Create New Category</h1>
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
              <Form onSubmit={handleSubmit} className={"col-7"}>
                <Row className={"mb-3"}>
                  <p className={"w-25"}>Name</p>
                  <FormControl
                    aria-label="Name"
                    aria-describedby="basic-addon1"
                    className={"w-75"}
                    name={"name"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onError={errors}
                  />
                </Row>
                <Row className={"mb-3"}>
                  <p className={"w-25"}>Prefix</p>
                  <FormControl
                    name={"prefix"}
                    aria-label="Prefix"
                    aria-describedby="basic-addon1"
                    className={"w-75"}
                    onChange={handleChange}
                    maxLength={2}
                  />
                </Row>
                <Row className={"justify-content-end"}>
                  <Button
                    variant={"danger"}
                    type={"submit"}
                    style={{ width: "100px" }}
                    on
                  >
                    SAVE
                  </Button>
                  <Button
                    variant={"secondary"}
                    onClick={() => history.push("/asset/createasset")}
                    className={"ms-5"}
                    style={{ width: "100px" }}
                  >
                    CANCEL
                  </Button>
                </Row>
              </Form>
            )}
          </Formik>
        </Row>
        {errorMsg && (
          <div class="col-7 alert alert-danger mt-5 text-center"role="alert">
            {errorMsg}
          </div>
        )}
      </div>
    );
};

export default CreateCategory;
