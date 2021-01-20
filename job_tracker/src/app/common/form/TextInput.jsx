import React from "react";
import { Form, Label } from "semantic-ui-react";

const TextInput = ({
  input,
  width,
  type,
  placeholder,
  label,
  meta: { touched, error }
}) => {
  return (
    <Form.Field error={touched && !!error}>
      <Label ribbon color="blue">
        {label}
      </Label>
      <input {...input} placeholder={placeholder} type={type} />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default TextInput;
