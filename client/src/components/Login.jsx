import React from "react";
import Axios from 'axios'
import { useControlledForm } from '../hooks/useControlledForm'

export default (props) => {
  const [formValues, parsedFormData, handleInput, errors] = useControlledForm([
    {
      name: "email",
      placeholder: "Email address",
      type: "email",
      required: true,
    },
    {
      name: "password",
      placeholder: "Password",
      type: "password",
      required: true,
    },
  ]);
  const inputFields = formValues.map((formInput) => {
    const { name, placeholder, type, required, value } = formInput;

    return (
      <input
        {...{
          key: name,
          name,
          value: value,
          placeholder,
          onChange: handleInput,
          type,
          required,
        }}
      />
    );
  });



  const handleSubmit = e => {
    e.preventDefault()
    Axios
      .post('/auth/login', parsedFormData)
      .then(res => props.setUser(res.data))
      .catch(err => props.setUser({}))
  }
  return (
    <section>
      <h1>Login Component</h1>
      <form onSubmit={handleSubmit}>
        {inputFields}
        <button type="submit">Login</button>
      </form>
    </section>
  );
};
