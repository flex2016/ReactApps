/*global google*/
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useFirestoreConnect,
  useFirebase,
  useFirestore,
} from "react-redux-firebase";
import { reduxForm, Field, initialize } from "redux-form";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import {
  combineValidators,
  composeValidators,
  isRequired,
  hasLengthGreaterThan,
} from "revalidate";
import { Segment, Form, Button, Grid, Header } from "semantic-ui-react";
import { createJob, updateJob, deleteJob } from "../jobActions";

import TextInput from "../../../app/common/form/TextInput";
import TextArea from "../../../app/common/form/TextArea";
import SelectInput from "../../../app/common/form/SelectInput";
import DateInput from "../../../app/common/form/DateInput";
import PlaceInput from "../../../app/common/form/PlaceInput";

const validate = combineValidators({
  position: isRequired({ message: "The position title is required" }),
  company: isRequired({ message: "The company is required" }),
  city: isRequired({ message: "The location is required" }),
  status: isRequired({ message: "The status is required" }),
  description: composeValidators(
    isRequired({ message: "Please enter a job description" }),
    hasLengthGreaterThan(10)({
      message: "Description needs to be at least 10 characters",
    })
  )(),
  date: isRequired("date"),
});

const options = [
  { key: "applied", text: "Applied", value: "Applied" },
  { key: "declined", text: "Declined", value: "Declined" },
  { key: "interview", text: "Interview", value: "Interview" },
];

const JobForm = ({
  change,
  history,
  match: { params },
  invalid,
  submitting,
  pristine,
  handleSubmit,
  location,
}) => {
  const dispatch = useDispatch();
  const firebase = useFirebase();
  const firestore = useFirestore();
  const [cityLatLng, setCityLatLng] = useState({});
  const [companyLatLng, setCompanyLatLng] = useState({});
  const loading = useSelector((state) => state.async.loading);
  useFirestoreConnect(`jobs/${params.id}`);
  const job = useSelector(
    (state) =>
      (state.firestore.ordered.jobs &&
        state.firestore.ordered.jobs.filter((e) => e.id === params.id)[0]) ||
      {}
  );

  useEffect(() => {
    if (Object.keys(job).length > 0) {
      dispatch(initialize("jobForm", job));
    }
  }, [dispatch, job]);

  const handleCitySelect = (selectedCity) => {
    geocodeByAddress(selectedCity)
      .then((results) => getLatLng(results[0]))
      .then((latlng) => {
        setCityLatLng(latlng);
      })
      .then(() => {
        change("city", selectedCity);
      });
  };

  const handleCompanySelect = (selectedCompany) => {
    geocodeByAddress(selectedCompany)
      .then((results) => getLatLng(results[0]))
      .then((latlng) => {
        setCompanyLatLng(latlng);
      })
      .then(() => {
        change("company", selectedCompany);
      });
  };

  const handleFormSubmit = async (values) => {
    values.companyLatLng = companyLatLng;
    if (job.id) {
      dispatch(updateJob({ firestore }, values));
      history.push(`/jobs/${job.id}`);
    } else {
      let createdJob = await dispatch(
        createJob({ firebase, firestore }, values)
      );
      history.push(`/jobs/${createdJob.id}`);
    }
  };

  const isCreateJob = location.pathname === "/createJob";
  return (
    <div>
      <Grid>
        <Grid.Column mobile={16} tablet={12} computer={10}>
          <Segment>
            <Header color="black" size="huge" dividing content="Job details" />
            <Form onSubmit={handleSubmit(handleFormSubmit)} autoComplete="off">
              <Field
                name="date"
                component={DateInput}
                dateFormat="dd LLL yyyy"
                placeholder="Date Applied"
                label="Date Applied"
              />
              <Field
                name="position"
                component={TextInput}
                placeholder="Job Postion"
                label="Job Postion"
              />
              <Field
                name="city"
                component={PlaceInput}
                options={{ types: ["(cities)"] }}
                onSelect={handleCitySelect}
                placeholder="City"
                label="City"
              />
              <Field
                name="company"
                component={PlaceInput}
                options={{
                  location: new google.maps.LatLng(cityLatLng),
                  radius: 1000,
                  types: ["establishment"],
                }}
                onSelect={handleCompanySelect}
                placeholder="Company Name"
                label="Company Name"
              />

              <Field
                name="jobUrl"
                component={TextInput}
                placeholder="Job Link"
                label="Job Link"
              />
              <Field
                name="status"
                component={SelectInput}
                options={options}
                placeholder="Status"
                label="Status"
              />
              <Field
                name="description"
                component={TextArea}
                rows={6}
                placeholder="Description"
                label="Description"
              />

              <Button
                disabled={invalid || submitting || pristine}
                loading={loading}
                positive
                type="submit"
              >
                Submit
              </Button>
              <Button onClick={history.goBack} type="button">
                Cancel
              </Button>

              {isCreateJob ? null : (
                <Button
                  onClick={() => {
                    deleteJob(job.id);
                    setTimeout(() => {
                      history.push("/jobs");
                    }, 2500);
                  }}
                  type="button"
                  floated="right"
                  color={"red"}
                  content={"Delete Job"}
                />
              )}
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default reduxForm({
  form: "jobForm",
  validate,
})(JobForm);
