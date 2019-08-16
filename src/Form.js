import React, { useState, useEffect } from "react";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const OnboardingForm = ({ errors, touched, values, status }) => {
    
  const [newPerson, setNewPerson] = useState([]);

  useEffect(() => {
    if (status) {
      setNewPerson([...newPerson, status]);
    }
  }, [status]);
  
    return (
      <div className="onboarding-form">
        <Form>
          <Field component="input" type="text" name="name" placeholder="Name"></Field>
          {touched.name && errors.name && (
            <p>{errors.name}</p>
          )}

          <Field component="select" name="role">
            <option>Choose your role</option>
            <option value="programmer">Programmer</option>
            <option value="webdev">Web Developer</option>
            <option value="designer">Designer</option>
          </Field>

          <Field component="input" type="email" name="email" placeholder="Email"></Field>
            {touched.email && errors.email && 
              <p>{errors.email}</p>
            }

          <Field component="input" type="password" name="password" placeholder="Password"></Field>
              {touched.password && errors.password && (
                <p>{errors.password}</p>
              )}

          <label>
            Read Terms of Service?
            <Field type="checkbox" name="tos" checked={values.tos} />
                  {touched.tos && errors.tos && (
                    <p>{errors.tos}</p>
                  )}
          </label>
          <button type="submit">SUBMIT</button>
        </Form>
        
      </div>
    );
  };

  export default withFormik({
      mapPropsToValues({name, role, email, password, tos}){
          return {
              name: name || "",
              role: role || "",
              email: email || "",
              password: password || "",
              tos: tos || false
          };
      },
      validationSchema: Yup.object().shape({
          name: Yup.string().required("Gotta have your name, buddy"),
          email: Yup.string().email().required("Need your email, friendo"),
          password: Yup.string().required("Safety first, fam"),
          tos: Yup.boolean()
          .oneOf([true], "Gotta review, homie")
          .required()
      }),
      handleSubmit(values, {setStatus, resetForm}){
          axios
            .post("https://reqres.in/api/users", values)
            .then(res => {
              console.log("handleSubmit: then: res: ", res)
              setStatus(res.data);
              resetForm();
            })
            .catch(err => console.error("handleSubmit: catch: err: ", err));
      }
  })(OnboardingForm);

  
