import { act, renderHook } from "@testing-library/react-hooks";
import { useControlledForm } from "../hooks/useControlledForm";

it("should initialise the with the passed form inputs", () => {
  // GIVEN
  const formInput = [
    {
      name: "firstName",
      value: "Bob",
      placeholder: "First Name",
      required: true,
    },
    {
      name: "lastName",
      placeholder: "Last Name",
    },
  ];

  // WHEN
  const { result } = renderHook(() => {
    return useControlledForm(formInput);
  });

  const [formValues, parsedFormData, handleInput, errors] = result.current;

  // THEN
  const expectedFormValues = [
    {
      name: "firstName",
      placeholder: "First Name",
      required: true,
      type: "text",
      value: "Bob",
    },
    {
      name: "lastName",
      placeholder: "Last Name",
      required: false,
      type: "text",
      value: "",
    },
  ];
  const expectedParseFormData = { firstName: "Bob", lastName: "" };
  const expectedErrors = [];

  expect(result.current[0]).toStrictEqual(expectedFormValues);
  expect(result.current[1]).toStrictEqual(expectedParseFormData);
  expect(result.current[3]).toStrictEqual(expectedErrors);
});

it("should update the form input field with the new value", () => {
  // GIVEN
  const formInput = [
    {
      name: "firstName",
      value: "Bob",
      placeholder: "First Name",
      required: true,
    },
  ];

  // WHEN
  const { result } = renderHook(() => useControlledForm(formInput));

  const [formValues, parsedFormData, handleInput, errors] = result.current;

  act(() => handleInput({ target: { name: "firstName", value: "Alice" } }));

  // THEN
  const expectedFormValues = [
    {
      name: "firstName",
      placeholder: "First Name",
      required: true,
      type: "text",
      value: "Alice",
    },
  ];
  const expectedParseFormData = { firstName: "Alice" };
  const expectedErrors = [];

  expect(result.current[0]).toStrictEqual(expectedFormValues);
  expect(result.current[1]).toStrictEqual(expectedParseFormData);
  expect(result.current[3]).toStrictEqual(expectedErrors);
});

it("should set an error when a null value is set for a required field", () => {
  // GIVEN
  const formInput = [
    {
      name: "firstName",
      value: "Bob",
      placeholder: "First Name",
      required: true,
    },
  ];

  // WHEN
  const { result } = renderHook(() => useControlledForm(formInput));

  const [formValues, parsedFormData, handleInput, errors] = result.current;

  act(() => handleInput({ target: { name: "firstName", value: null } }));

  // THEN
  const expectedFormValues = [
    {
      name: "firstName",
      placeholder: "First Name",
      required: true,
      type: "text",
      value: null,
    },
  ];
  const expectedParseFormData = { firstName: null };
  const expectedErrors = [{ name: "firstName", placeholder: "First Name" }];

  expect(result.current[0]).toStrictEqual(expectedFormValues);
  expect(result.current[1]).toStrictEqual(expectedParseFormData);
  expect(result.current[3]).toStrictEqual(expectedErrors);
});
