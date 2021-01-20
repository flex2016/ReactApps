import React from "react";
import { Segment, Header, Grid, Card, Tab } from "semantic-ui-react";
import { Link } from "react-router-dom";
import format from "date-fns/format";

const panes = [
  { menuItem: "All Jobs", pane: { key: "All" } },
  { menuItem: "Interviewing", pane: { key: "Interview" } },
  { menuItem: "Declined", pane: { key: "Declined" } }
];

const UserDetailedJobs = ({ jobs, jobsLoading, changeTab, isCurrentUser }) => {
  return (
    <Grid.Column width={16}>
      <Segment attached loading={jobsLoading}>
        <Header icon="calendar" content="Jobs" />
        <Tab
          onTabChange={(e, data) => changeTab(e, data)}
          panes={panes}
          menu={{ secondary: true, pointing: true }}
        />
        <br />
        <Card.Group itemsPerRow={3}>
          {jobs &&
            isCurrentUser &&
            jobs.map(job => (
              <Card as={Link} to={`/jobs/${job.id}`} key={job.id}>
                {/* <Image src={`/assets/categoryImages/${job.category}.jpg`} /> */}
                <Card.Content>
                  <Card.Header textAlign="center">{job.position}</Card.Header>
                  <Card.Meta textAlign="center">
                    <div>
                      {format(job.date && job.date.toDate(), "M, d, yyyy")}
                    </div>
                  </Card.Meta>
                  <Card.Description content={job.company} />
                </Card.Content>
              </Card>
            ))}
        </Card.Group>
      </Segment>
    </Grid.Column>
  );
};

export default UserDetailedJobs;
