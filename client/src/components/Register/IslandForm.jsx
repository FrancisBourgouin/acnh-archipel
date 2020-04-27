import React from "react";
import { useControlledForm } from '../../hooks/useControlledForm';

export default (props) => {
  const { handleSubmit } = props
  const [formValues, parsedFormData, handleInput, errors] = useControlledForm([
    {
      name: "name",
      placeholder: "Island Name",
      required: true,
    },
    {
      name: "nativeFruit",
      placeholder: "Island's Native Fruit",
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
      <h2>Great! Now enter your island information</h2>
      <form onSubmit={event => handleSubmit(event, parsedFormData)}>
        {inputFields}
        <button type="submit">Next</button>
      </form>
    </section>
  );
}