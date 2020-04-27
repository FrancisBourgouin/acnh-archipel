import React from "react";
import { useControlledForm } from '../../hooks/useControlledForm';

export default (props) => {
  const { handleSubmit } = props
  const [formValues, parsedFormData, handleInput, errors] = useControlledForm([
    {
      name: "name",
      placeholder: "Full Name",
      required: true,
    },
    {
      name: "avatarImage",
      placeholder: "Avatar Image URL",
      required: false,
    },
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

  return (
    <section>
      <h2>Enter your islander information</h2>
      <form onSubmit={event => handleSubmit(event, parsedFormData)}>
        {inputFields}
        <button type="submit">Next</button>
      </form>
    </section>
  );
}