import React, { useState, useEffect } from "react";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const OnboardingForm = ({ errors, touched, values, status }) => {
    
  
    return (
      <div className="onboarding-form">
        <Form>
          <Field component="input" type="text" name="name" placeholder="Name"></Field>


          <Field component="input" type="text" name="email" placeholder="Email"></Field>


          <Field component="input" type="text" name="password" placeholder="Password"></Field>


          <Field type="checkbox" name="tos" checked={values.tos} />

          
          <button>SUBMIT</button>
        </Form>
        
      </div>
    );
  };

export default OnboardingForm;