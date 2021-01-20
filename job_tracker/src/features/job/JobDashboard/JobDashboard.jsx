import React, { Component, createRef } from "react";
import { connect } from "react-redux";

import { Grid, Loader } from "semantic-ui-react";
import JobList from "../JobList/JobList";

import { deleteJob, getJobsForDashboard } from "../jobActions";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import JobActivity from "../JobActivity/JobActivity";
import { firestoreConnect } from "react-redux-firebase";

const query = [
  {
    collection: "activity",
    orderBy: ["timestamp", "desc"],
    limit: 5
  }
];

const mapState = state => ({
  jobs: state.jobs.jobs,
  loading: state.async.loading,
  activities: state.firestore.ordered.activity,
  userUid: state.firebase.auth.uid
});

const actions = {
  getJobsForDashboard,
  deleteJob
};

class JobDashboard extends Component {
  contextRef = createRef();

  state = {
    moreJobs: false,
    loadingInitial: true,
    loadedJobs: []
  };

  async componentDidMount(userUid) {
    let next = await this.props.getJobsForDashboard(userUid);

    if (next && next.docs && next.docs.length >= 1) {
      this.setState({
        moreJobs: true,
        loadingInitial: false
      });
    }
  }

  componentDidUpdate(prevProps) {
    // let jobs = this.props.getJobsForDashboard();
    if (this.props.jobs !== prevProps.jobs) {
      this.setState({
        loadedJobs: [...this.state.loadedJobs, ...this.props.jobs]
      });
    }
  }

  getNextJobs = async userUid => {
    const { jobs } = this.props;
    let lastJob = jobs && jobs[jobs.length - 1];
    console.log(lastJob);
    let next = await this.props.getJobsForDashboard(lastJob, userUid);

    if (next && next.docs && next.docs.length <= 1) {
      this.setState({
        moreJobs: false
      });
    }
  };
  render() {
    const { deleteJob, loading, activities, userUid } = this.props;
    const { moreJobs, loadedJobs } = this.state;
    if (this.state.loadingInitial) return <LoadingComponent inverted={true} />;

    return (
      <div>
        <Grid>
          <Grid.Column mobile={10} tablet={10} computer={10}>
            <div ref={this.contextRef}>
              <JobList
                loading={loading}
                moreJobs={moreJobs}
                getNextJobs={this.getNextJobs}
                jobs={loadedJobs}
                deleteJob={deleteJob}
              />
            </div>
          </Grid.Column>
          <Grid.Column mobile={6} tablet={6} computer={6}>
            <JobActivity
              userUid={userUid}
              activities={activities}
              contextRef={this.contextRef}
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Loader active={loading} />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
export default connect(
  mapState,
  actions
)(firestoreConnect(query)(JobDashboard));

// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useFirestore } from "react-redux-firebase";
// import { Grid, Loader } from "semantic-ui-react";
// import JobList from "../JobList/JobList";
// import { getPagedJobs } from "../jobActions";
// import LoadingComponent from "../../../app/layout/LoadingComponent";
// import JobActivity from "../JobActivity/JobActivity";
// import { objectToArray } from "../../../app/common/util/helpers";

// const JobDashboard = () => {
//   const dispatch = useDispatch();
//   const firestore = useFirestore();

//   const [loadingInitial, setLoadingInitial] = useState(true);

//   const jobs = useSelector(
//     state => objectToArray(state.firestore.data.jobs) || []
//   );

//   const moreJobs = useSelector(state => state.jobs.moreJobs);
//   const loading = useSelector(state => state.async.loading);
//   // console.log(jobs);
//   useEffect(() => {
//     const getJobs = async () => {
//       await dispatch(getPagedJobs({ firestore }));
//     };
//     if (jobs.length === 0) {
//       getJobs().then(() => {
//         setLoadingInitial(false);
//       });
//     } else {
//       setLoadingInitial(false);
//     }
//   }, [dispatch, firestore, jobs]);

//   const handleGetNextJobs = async userUid => {
//     await dispatch(getPagedJobs({ firestore }));
//   };

//   if (loadingInitial) return <LoadingComponent />;

//   return (
//     <div>
//       <Grid>
//         <Grid.Column width={10}>
//           <div>
//             <JobList
//               loading={loading}
//               moreJobs={moreJobs}
//               getNextJobs={handleGetNextJobs}
//               jobs={jobs}
//             />
//           </div>
//         </Grid.Column>
//         <Grid.Column width={6}>
//           <JobActivity />
//         </Grid.Column>
//         <Grid.Column width={10}>
//           <Loader active={loading} />
//         </Grid.Column>
//       </Grid>
//     </div>
//   );
// };

// export default JobDashboard;
