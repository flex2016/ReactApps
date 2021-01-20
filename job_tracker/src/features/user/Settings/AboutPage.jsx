import React, { useCallback } from "react";
import {
  Button,
  Divider,
  Form,
  Header,
  Segment,
  Label
} from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import { useDispatch } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import RadioInput from "../../../app/common/form/RadioInput";
import TextInput from "../../../app/common/form/TextInput";
import TextArea from "../../../app/common/form/TextArea";
import PlaceInput from "../../../app/common/form/PlaceInput";
import SelectInput from "../../../app/common/form/SelectInput";
import { updateProfile } from "../../user/userActions";

const interests = [
  { key: "frontEnd", text: "FrontEnd", value: "frontEnd" },
  { key: "backEnd", text: "BackEnd", value: "backEnd" },
  { key: "design", text: "Design", value: "design" },
  { key: "fullstack", text: "Fullstack", value: "fullstack" },
  { key: "uxui", text: "UX, UI", value: "uxui" },
  { key: "devOps", text: "DevOps", value: "devOps" }
];

const AboutPage = ({ pristine, submitting, handleSubmit }) => {
  const dispatch = useDispatch();
  const firebase = useFirebase();
  const handleUpdateProfile = useCallback(
    user => {
      return dispatch(updateProfile({ firebase }, user));
    },
    [firebase, dispatch]
  );
  return (
    <Segment>
      <Header dividing size="large" content="About Me" />
      <p>Complete your profile to get the most out of this site</p>
      <Form onSubmit={handleSubmit(handleUpdateProfile)}>
        <Form.Group inline>
          <Label ribbon color="blue">
            {" "}
            Tell us your status:{" "}
          </Label>
          <Field
            name="status"
            component={RadioInput}
            type="radio"
            value="employed"
            label="Employed"
          />
          <Field
            name="status"
            component={RadioInput}
            type="radio"
            value="student"
            label="Student"
          />
          <Field
            name="status"
            component={RadioInput}
            type="radio"
            value="searching"
            label="Searching"
          />
        </Form.Group>
        <Divider />
        {/* <Label ribbon color="blue">
          Tell us about yourself
        </Label> */}
        <Field
          name="about"
          component={TextArea}
          label="About Me"
          placeholder="About Me"
        />
        <Field
          name="interests"
          component={SelectInput}
          options={interests}
          value="interests"
          label="Interests"
          multiple={true}
          placeholder="Select your interests"
        />
        <Field
          width={8}
          name="occupation"
          type="text"
          label="Occupation"
          component={TextInput}
          placeholder="Occupation"
        />
        <Field
          width={8}
          name="origin"
          label="Current Location"
          options={{ types: ["(regions)"] }}
          component={PlaceInput}
          placeholder="Country of Origin"
        />
        <Divider />
        <Button
          disabled={pristine || submitting}
          size="large"
          positive
          content="Update Profile"
        />
      </Form>
    </Segment>
  );
};

export default reduxForm({
  form: "userProfile",
  enableReinitialize: true,
  destroyOnUnmount: false
})(AboutPage);
