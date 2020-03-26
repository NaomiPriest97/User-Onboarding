import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const UserForm = ({ values, touched, errors, status }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log("status has changed!!", status);
    status && setUsers(users => [...users, status]);
  }, [status]);

  return (
    <div className="users-form">
      <Form>
        <label htmlFor="name">
          {" "}
          Name
          <Field
            id="name"
            type="text"
            name="name"
            placeholder="Name"
          />
          {touched.name && errors.name && (
            <p className="errors">{errors.name}</p>
          )}
        </label>
        <label htmlFor="email">
          {" "}
          Email
          <Field id="email" type="text" name="email" placeholder="Email" />
          {touched.email && errors.email && (
            <p className="errors">{errors.email}</p>
          )}
        </label>

        <label htmlFor="password">
          Password
          <Field
            
            className="food-select"
            id="password"
            type="password"
            name="password"
            placeholder="Password"
          />
          {touched.password && errors.password && (
              <p className="errors">{errors.password}</p>
          )}
        </label>

        <label htmlFor="Role">
                Role
            <Field
                component="select"
                className="role-select"
                id="Role"
                type="dropdown"
                name="Role"
                placeholder="Role"
                >
                <option>Choose an option </option>
                <option value="frontend">Front End Developer</option>
                <option value="backend">Back End Developer</option>
                <option value="engineer">Engineer</option>
            </Field>
            </label>

        <label htmlFor="terms" className="checkbox-container">
          Terms of Service
          <Field
            id="terms"
            type="checkbox"
            name="terms"
            checked={values.terms}
          />
          {touched.terms && errors.password && (
              <p className="errors">{errors.terms}</p>
            )}
          <span className="checkmark" />
        </label>

       
       
        <button type="submit">Submit!</button>
      </Form>
      <pre>{JSON.stringify(values, null, 2)}</pre>
      {users.map(user=> (
        <ul key={user.id}>
          <li>Name: {user.name}</li>
          <li>Email: {user.email}</li>
          <li>Password: {user.password}</li>
          <li>Role: {user.role}</li>
        </ul>
      ))}
    </div>
  );
};


const FormikForm = withFormik({
  mapPropsToValues({ name, email, password, role, terms }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      role: role || "",
      terms: terms || false,
      
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().required(),
    password: Yup.string().required(),
    terms: Yup.string().required(),
    role: Yup.string().required(),
  }),
  handleSubmit(values, { setStatus, resetForm }) {
    console.log("submitting", values);
    axios.post("https://reqres.in/api/users/", values).then(response => {
      console.log("success", response);
      setStatus(response.data);
      resetForm();
    });
  }
})(UserForm);

export default FormikForm;
