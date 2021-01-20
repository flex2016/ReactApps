import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { Form, Segment, Button, Label, Divider } from "semantic-ui-react";
import { reduxForm, Field } from "redux-form";
import { combineValidators, isRequired } from "revalidate";
import TextInput from "../../../app/common/form/TextInput";
import { registerUser, socialLogin } from "../authActions";
import SocialLogin from "../SocialLogin/SocialLogin";

const validate = combineValidators({
  displayName: isRequired("Display Name"),
  email: isRequired("Email"),
  password: isRequired("Password"),
});

const RegisterForm = ({ handleSubmit, error, invalid, submitting }) => {
  const dispatch = useDispatch();
  const firebase = useFirebase();
  const firestore = useFirestore();
  const handleregister = useCallback(
    (user) => {
      dispatch(registerUser({ firebase, firestore }, user));
    },
    [firebase, firestore, dispatch]
  );
  const handleSocialLogin = useCallback(
    (provider) => {
      return dispatch(socialLogin({ firebase, firestore }, provider));
    },
    [firebase, firestore, dispatch]
  );
  return (
    <div>
      <Form
        size="large"
        autoComplete="off"
        onSubmit={handleSubmit(handleregister)}
      >
        <Segment>
          <Field
            name="displayName"
            type="text"
            component={TextInput}
            placeholder="Known As"
            label=" Display Name"
          />
          <Field
            name="email"
            type="text"
            component={TextInput}
            placeholder="Email"
            label="Email"
          />
          <Field
            name="password"
            type="password"
            component={TextInput}
            placeholder="Password"
            label="Password"
          />
          {error && (
            <Label basic color="red">
              {error}
            </Label>
          )}
          <Button
            loading={submitting}
            fluid
            size="large"
            color="twitter"
            disabled={invalid || submitting}
          >
            Register
          </Button>
          <Divider horizontal>Or</Divider>
          <SocialLogin socialLogin={handleSocialLogin} />
        </Segment>
      </Form>
    </div>
  );
};

export default reduxForm({ form: "registerForm", validate })(RegisterForm);
