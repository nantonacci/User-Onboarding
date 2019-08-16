import React, { useState, useEffect } from "react";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const OnboardingForm = ({ errors, touched, values, status }) => {
    
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (status) {
      setUsers([...users, status]);
    }
  }, [status]);
  
    return (
      <div className="onboarding-form">
        <Form>
          <Field component="input" type="text" name="name" placeholder="Name"></Field>
          {touched.name && errors.name && (
            <p className="errMsg">{errors.name}</p>
          )}

          <Field component="select" name="role">
            <option>Choose your role</option>
            <option value="Programmer">Programmer</option>
            <option value="Web Developer">Web Developer</option>
            <option value="Designer">Designer</option>
          </Field>

          <Field component="input" type="email" name="email" placeholder="Email"></Field>
            {touched.email && errors.email && 
              <p className="errMsg">{errors.email}</p>
            }

          <Field component="input" type="password" name="password" placeholder="Password"></Field>
              {touched.password && errors.password && (
                <p className="errMsg">{errors.password}</p>
              )}

          <label className="checkbox-container">
            Read Terms of Service?
            <Field type="checkbox" name="tos" checked={values.tos} />
                  {touched.tos && errors.tos && (
                    <p className="errMsg">{errors.tos}</p>
                  )}
                  <span className="checkmark" />
          </label>
          <button type="submit">SUBMIT</button>
        </Form>
        <div className="cardContainer">
        {users.map(user => (
          <p className="userCard" key={user.id}><span className="deets">Name:</span> {user.name} <span className="deets">Role:</span> {user.role} <span className="deets">Email:</span> {user.email}</p>
        ))}</div>
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
          password: Yup.string()
          .required("Safety first, fam")
          .min(8, "8 characters or more, pal"),
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

  
