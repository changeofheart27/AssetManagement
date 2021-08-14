import React from 'react';
import { Formik } from 'formik';
import { useState } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Yup from "yup";
import {Button, Form, FormCheck, FormControl, Row} from "react-bootstrap";
const LoginFormPage = ({setCurrentUser}) => {
  
    
    const initialValues = { username:'', password:''};
    const [loginSuccess, setLoginSuccess] = useState(false);
    const ValidateSchema = Yup.object().shape({
      username: Yup.string()
          .max(10)
          .required('Required')
          .typeError('Username is required'),
      password: Yup.string()
          .max(15)
          .required('Required')
          .typeError('Password is required'),    
  });
    const onSubmit = (values, { setSubmitting }) => {
      axios.post('',{
        username: values.username,
        password: values.password
      })
      .then( response => {
        console.log (response.data.jwttoken)
        console.log (response.data.authorization)
        setLoginSuccess(true)
            setCurrentUser({
                token: response.data.jwttoken,
                authority: response.data.authorization
            });
        
      }).catch(error => {
        console.error();
      });
    }
    return (
    <div className={"container ps-5 d-block"} >
     <Row>
        <h1 className={"text-danger mb-5"}>Login</h1>
      </Row>
    <Row className={"mt-5"}>
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
                <p className={"w-25"}>Username</p>
                                <FormControl
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    className={"w-75"}
                                    name={"username"}
                                    onChange={handleChange}
                                    isValid={touched.username && !errors.username}
                                    isInvalid={touched.username && errors.username}
                                />
                                {errors.username && touched.username ? (
                                    <div className={"text-danger"} style={{paddingLeft: "25%"}}>{errors.username}</div>
                                ) : null}
                            </Row>
                            <Row className={"mb-3"}>
                                <p className={"w-25"}>Password</p>
                                <FormControl
                                    aria-label="Password"
                                    aria-describedby="basic-addon1"
                                    className={"w-75"}
                                    name={"password"}
                                    onChange={handleChange}
                                    isValid={touched.password && !errors.password}
                                    isInvalid={touched.password && errors.password}
                                />
                                {errors.password && touched.password ? (
                                    <div className={"text-danger"} style={{paddingLeft: "25%"}}>{errors.password}</div>
                                ) : null}
                            </Row>
                            
                            <Button variant={"danger"} type={"submit"} className={"ms-5"} style={{float: 'right'}}>
                                Cancel
                            </Button>
                          
                            <Button variant={"danger"} type={"submit"} style={{float: 'right'}} on>
                                Submit
                            </Button>
                            
                      </Form>
                  
              
          
          
        )
        } 
      </Formik>
    </Row>
   </div>
    );
}

export default LoginFormPage;
