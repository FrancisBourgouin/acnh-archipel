import React from "react";
import { useQuery } from "urql";
import { islanderByEmail } from "../../graphqlQueries";
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
    {
      name: "inviteCode",
      placeholder: "Invite Code",
      required: false,
    },
  ]);
  const { email } = parsedFormData
  // const [islanderInfo, setIslanderInfo] = useState({})
  const [islanderResult, islanderQuery] = useQuery({
    query: islanderByEmail,
    variables: { email: email },
    pause: !email
  })
  // const fetchedIslanderResult = islanderResult.data && islanderResult.data.islander

  // useEffect(() => {
  //   console.log(fetchedIslanderResult)
  //   if (fetchedIslanderResult) {
  //     setIslanderInfo(fetchedIslanderResult)
  //   }

  // }, [fetchedIslanderResult])
  const invalidEmail = islanderResult.data &&
    islanderResult.data.islander &&
    islanderResult.data.islander.email === parsedFormData.email
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
        <button disabled={invalidEmail} type="submit">Next</button>
      </form>
      {
        invalidEmail &&
        <span>EMAIL ALREADY IN USE</span>
      }
    </section>
  );
}