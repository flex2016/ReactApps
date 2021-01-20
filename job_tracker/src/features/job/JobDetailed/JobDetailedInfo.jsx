import React, { useState } from "react";
import { Segment, Grid, Icon, Button } from "semantic-ui-react";
import JobDetailedMap from "./JobDetailedMap";

const JobDetailedInfo = ({ job }) => {
  const [isMapOpen, showMapToggle] = useState(false);
  return (
    <Segment.Group>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="marker" size="large" color="teal" />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>{job.venue}</span>
          </Grid.Column>
          <Grid.Column width={4}>
            <Button
              onClick={() => showMapToggle(!isMapOpen)}
              color="teal"
              size="tiny"
              content={isMapOpen ? "Hide map" : "Show map"}
            />
          </Grid.Column>
        </Grid>
      </Segment>
      {isMapOpen && (
        <JobDetailedMap
          lat={job.companyLatLng.lat}
          lng={job.companyLatLng.lng}
        />
      )}
    </Segment.Group>
  );
};

export default JobDetailedInfo;
