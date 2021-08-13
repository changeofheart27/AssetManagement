import React from 'react';
import { Formik } from 'formik';
import { useState } from "react";
import axios from 'axios';
const LoginFormPage = ({setCurrentUser}) => {
  
    
    const initialValues = { username:'', password:''};
    const [loginSuccess, setLoginSuccess] = useState(false);
    const validateValues = values => {
      const errors = {};
      if(!values.username){
        errors.username = 'Required username';
      }else if (values.username.length < 5) {
        errors.username = "*Password must be greater than 5 characters long.";
      }
      if(!values.password){
        errors.password = 'Required password';
      }else if (values.password.length < 8) {
        errors.password = "*Password must be 8 characters long.";
      }
    }
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
    <div >
     <h1>Login !</h1>
     <Formik
       initialValues={initialValues}
       validate={validateValues}
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
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                           <label for="username">Username</label>
                            <input
                              
                              type="username"
                              name="username"
                              className="form-control"
                              placeholder = "username"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.username}
                              required/>
                            {errors.username && touched.username && errors.username}
                        </div>  
                        <div className="form-group">
                           <label for="password">Password</label>
                           <input
                            type="password"
                            name="password"
                            className="form-control"
                            
                            placeholder =" password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            required/>
                          {errors.password && touched.password && errors.password}
                        </div>
                        
                          <div className="modal-footer">
                            <button className = "edit-button"  style={{margin : 15, display: "block" }} type="submit" disabled={isSubmitting}>
                              Submit
                            </button>
                          </div>
                     </form>
                
            
         
        
       )
      } 
     </Formik>
   </div>
    );
}

export default LoginFormPage;