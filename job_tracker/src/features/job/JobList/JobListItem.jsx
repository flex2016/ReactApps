import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Table, Button, Header } from "semantic-ui-react";
import { format } from "date-fns";

const JobListItem = ({ job }) => {
  const auth = useSelector((state) => state.firebase.auth, []);
  const isCreater = job.userUid === auth.uid;

  return (
    <>
      {isCreater && (
        <>
          <Table.Row>
            <Table.Cell>{job.position}</Table.Cell>
            <Table.Cell>{format(job.date.toDate(), "M, d, yyyy")}</Table.Cell>
            <Table.Cell>{job.city}</Table.Cell>
            <Table.Cell>
              {job.status === "Interview" ? (
                <Header as="h5" color="yellow">
                  {job.status}
                </Header>
              ) : job.status === "Declined" ? (
                <Header as="h5" color="red">
                  {job.status}
                </Header>
              ) : (
                <Header as="h5" color="green">
                  {job.status}
                </Header>
              )}
            </Table.Cell>
            <Table.Cell>
              <Button
                as={Link}
                to={`/jobs/${job.id}`}
                color="blue"
                size="mini"
                content="View"
              />
            </Table.Cell>
            {/* <Table.Cell>
                <Button
                  icon="delete"
                  onClick={() => deleteJob(job.id)}
                  as="a"
                  color="red"
                  size="mini"
                />
              </Table.Cell> */}
          </Table.Row>
        </>
      )}
    </>
  );
};

export default JobListItem;
