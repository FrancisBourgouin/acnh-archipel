import React from "react";
import { useControlledForm } from '../../hooks/useControlledForm';

export default (props) => {
  const { handleSubmit, archipelago } = props
  const [formValues, parsedFormData, handleInput, errors] = useControlledForm([
    {
      name: "name",
      placeholder: "Archipelago Name",
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
      {!archipelago && <h2>Great! Now enter your archipelago information</h2>}
      {archipelago && <h3>You are already invited to the {archipelago.name} archipelago, great !</h3>}
      {!archipelago && <form onSubmit={event => handleSubmit(event, parsedFormData)}>
        {inputFields}
        <button type="submit">Register</button>
      </form>}
    </section>
  );
}