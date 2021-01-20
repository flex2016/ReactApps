import React, { Fragment } from "react";
import { Table } from "semantic-ui-react";
import JobListItem from "./JobListItem";
import InfiniteScroll from "react-infinite-scroller";

const JobList = ({ jobs, deleteJob, getNextJobs, loading, moreJobs }) => {
  return (
    <Fragment>
      <Table striped>
        <Fragment>
          <Table.Header size="huge">
            <Table.Row>
              <Table.HeaderCell>Position</Table.HeaderCell>
              <Table.HeaderCell>Date Applied</Table.HeaderCell>
              <Table.HeaderCell>Location</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
              {/* <Table.HeaderCell></Table.HeaderCell> */}
            </Table.Row>
          </Table.Header>
        </Fragment>
        {jobs && jobs.length !== 0 && (
          <InfiniteScroll
            element={"tbody"}
            pageStart={0}
            loadMore={getNextJobs}
            hasMore={!loading && moreJobs}
            initialLoad={false}
          >
            {jobs &&
              jobs.map(job => (
                <JobListItem key={job.id} job={job} deleteJob={deleteJob} />
              ))}
          </InfiniteScroll>
        )}
      </Table>
    </Fragment>
  );
};
export default JobList;
