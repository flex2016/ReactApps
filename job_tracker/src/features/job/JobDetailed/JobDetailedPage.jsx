import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFirestoreConnect, useFirestore } from "react-redux-firebase";
import { Link } from "react-router-dom";
import { deleteJob } from "../jobActions";
import JobDetailedInfo from "./JobDetailedInfo";
import { Segment, Item, Header, Button, Grid, Icon } from "semantic-ui-react";
import { format } from "date-fns";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import NotFound from "../../../app/layout/NotFound";

const JobDetailedPage = ({ match: { params }, history }) => {
  const dispatch = useDispatch();
  const firestore = useFirestore();
  const handleDelete = useCallback(
    (jobId) => {
      dispatch(deleteJob({ firestore, history }, jobId));
    },
    [firestore, history, dispatch]
  );
  useFirestoreConnect(`jobs/${params.id}`);
  const job = useSelector(
    (state) =>
      (state.firestore.ordered.jobs &&
        state.firestore.ordered.jobs.filter(
          (job) => job.id === params.id
        )[0]) ||
      {},
    []
  );
  const auth = useSelector((state) => state.firebase.auth, []);
  // const authenticated = auth.isLoaded && !auth.isEmpty;
  const loadingJob = useSelector(
    (state) => state.firestore.status.requesting[`jobs/${params.id}`],
    []
  );

  if (loadingJob) return <LoadingComponent />;
  if (Object.keys(job).length === 0) return <NotFound />;

  const isCreater = job.userUid === auth.uid;

  return (
    <>
      {isCreater && (
        <Grid>
          <Grid.Column mobile={16} tablet={12} computer={10}>
            <Segment.Group>
              <Segment basic attached="top" style={{ padding: "0" }}>
                <Segment padded raised>
                  <Item.Group>
                    <Item>
                      <Item.Content>
                        <Header as="h1">{job.position}</Header>
                      </Item.Content>
                    </Item>
                  </Item.Group>
                </Segment>
              </Segment>
              <Segment attached>
                <Grid verticalAlign="middle">
                  <Grid.Column width={1}>
                    <Icon name="marker" size="large" color="teal" />
                  </Grid.Column>
                  <Grid.Column width={11}>
                    <span>{job.company}</span>
                  </Grid.Column>
                </Grid>
              </Segment>
              <Segment attached="bottom">
                {job.status === "Interview" ? (
                  <Button color="yellow">{job.status}</Button>
                ) : job.status === "Declined" ? (
                  <Button color="red">{job.status}</Button>
                ) : (
                  <Button color="green">{job.status}</Button>
                )}

                <Button
                  as={Link}
                  to={`/manage/${job.id}`}
                  color="orange"
                  floated="right"
                >
                  Edit Job
                </Button>
                <Button
                  onClick={() => {
                    handleDelete(job.id);
                  }}
                  type="button"
                  floated="right"
                  color={"red"}
                  content={"Delete Job"}
                />
              </Segment>
              <Segment attached="top">
                <Grid relaxed>
                  <Grid.Column width={1}>
                    <Icon size="large" color="teal" name="info" />
                  </Grid.Column>
                  <Grid.Column width={15}>
                    <p>{job.description}</p>
                  </Grid.Column>
                </Grid>
              </Segment>
              <Segment attached>
                <Grid verticalAlign="middle">
                  <Grid.Column width={1}>
                    <Icon name="calendar" size="large" color="teal" />
                  </Grid.Column>
                  <Grid.Column width={15}>
                    <span>{format(job.date.toDate(), "M, d, yyyy")}</span>
                  </Grid.Column>
                </Grid>
              </Segment>
              <Segment attached>
                <Grid relaxed verticalAlign="middle">
                  <Grid.Column width={1}>
                    <Icon name="linkify" size="large" color="teal" />
                  </Grid.Column>
                  <Grid.Column stretched width={15}>
                    <p>{job.jobUrl}</p>
                  </Grid.Column>
                </Grid>
              </Segment>
            </Segment.Group>
            <JobDetailedInfo job={job} />
          </Grid.Column>
        </Grid>
      )}
    </>
  );
};

export default JobDetailedPage;
