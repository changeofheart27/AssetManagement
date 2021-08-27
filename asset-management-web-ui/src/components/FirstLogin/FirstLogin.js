import 'bootstrap/dist/css/bootstrap.min.css';
import './FirstLogin.css'

import * as Yup from "yup";

import {Button, Form, FormCheck, FormControl, Row} from "react-bootstrap";
import { useEffect, useState } from "react";
import {useHistory, useParams} from 'react-router-dom';

import {ButtonGroup} from "react-bootstrap";
import { Formik } from 'formik';
import React from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';

const FirstLogin= ({props,loginSuccess,setResponseUser}) => {
  const username = localStorage.getItem('username')
  const token = localStorage.getItem('jwttoken')
    
  const headers = { 
    'Authorization': token
    
};
  const [showLoginSuccess, setShowLoginSuccess] = useState(false);
  const rootAPI = process.env.REACT_APP_SERVER_URL;
  const [submitError, setSubmitError] = useState("");
  const history = useHistory();  


    const initialValues = { newPassword:''};
  
    const ValidateSchema = Yup.object().shape({
     
      newPassword: Yup.string()
          .max(500)
          .required('Required')
          .typeError('New Password is required'),    
  });
  const onSubmit = (values, {setSubmitting}) => {
    let editUserPassword = {
        password: values.newPassword
    }
          axios
            .put(rootAPI+`/change-password/${username}`, editUserPassword,{headers})
            .then((response) => {
                setSubmitting(false);
                console.log("response :"+response)
               
            }).catch((error) => {
              localStorage.clear()
              window.location.href = "/login";
            });
    
        
        
} 

  
    return (
      <div className="body-changepassword first-login">
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
          
                            <Row className={"mb-4 row-first-login"}>
                                <p   className={"w-25 p-3"}>New Password</p>
                                <FormControl
                                    aria-label="New Password"
                                    aria-describedby="basic-addon1"
                                    className={"w-auto"}
                                    value={values.newPassword}
                                    name={"newPassword"}
                                    type = {"password"}
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
                              <Button variant={"danger"} type={"submit"} style={{float: 'right'}}  disabled={isSubmitting} on>
                                  Submit
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

export default FirstLogin;
