import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import { firestoreConnect, isEmpty } from "react-redux-firebase";
import { connect } from "react-redux";

import UserDetailedHeader from "./UserDetailedHeader";
import UserDetailedSidebar from "./UserDetailedSidebar";
import UserDetailedPhotos from "./UserDetailedPhotos";
import UserDetailedJobs from "./UserDetailedJobs";
import UserDetailedDescription from "./UserDetailedDescription";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { userDetailedQuery } from "../userQueries";
import { getUserJobs } from "../userActions";

const mapState = (state, ownProps) => {
  let userUid = null;
  let profile = {};

  if (ownProps.match.params.id === state.auth.uid) {
    profile = state.firebase.profile;
  } else {
    profile =
      !isEmpty(state.firestore.ordered.profile) &&
      state.firestore.ordered.profile[0];
    userUid = ownProps.match.params.id;
  }
  return {
    profile,
    userUid,
    jobs: state.user.jobs,
    jobsLoading: state.async.loading,
    auth: state.firebase.auth,
    photos: state.firestore.ordered.photos,
    requesting: state.firestore.status.requesting
  };
};

const actions = {
  getUserJobs
};

class UserDetailedPage extends Component {
  async componentDidMount() {
    let jobs = await this.props.getUserJobs(this.props.userUid);
  }

  changeTab = (e, data) => {
    this.props.getUserJobs(this.props.userUid, data.activeIndex);
  };
  render() {
    const {
      profile,
      photos,
      auth,
      match,
      requesting,
      jobsLoading,
      jobs
    } = this.props;
    const isCurrentUser = auth.uid === match.params.id;
    const loading = Object.values(requesting).some(a => a === true);
    if (loading) return <LoadingComponent />;

    return (
      <Grid>
        <UserDetailedHeader profile={profile} isCurrentUser={isCurrentUser} />
        <UserDetailedDescription profile={profile} />
        {/* <UserDetailedSidebar isCurrentUser={isCurrentUser} /> */}
        {photos && <UserDetailedPhotos photos={photos} />}
        <UserDetailedJobs
          isCurrentUser={isCurrentUser}
          jobs={jobs}
          jobsLoading={jobsLoading}
          changeTab={this.changeTab}
        />
      </Grid>
    );
  }
}

export default connect(
  mapState,
  actions
)(
  firestoreConnect((auth, userUid) => userDetailedQuery(auth, userUid))(
    UserDetailedPage
  )
);

// import React, { useEffect, useMemo } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useFirestoreConnect, useFirebase } from "react-redux-firebase";
// import { Grid } from "semantic-ui-react";
// import UserDetailedHeader from "./UserDetailedHeader";
// import UserDetailedSidebar from "./UserDetailedSidebar";
// import UserDetailedPhotos from "./UserDetailedPhotos";
// import UserDetailedJobs from "./UserDetailedJobs";
// import UserDetailedDescription from "./UserDetailedDescription";
// import LoadingComponent from "../../../app/layout/LoadingComponent";
// import { getUserJobs } from "../userActions";
// import { objectToArray } from "../../../app/common/util/helpers";

// const UserDetailedPage = ({ match: { params } }) => {
//   const dispatch = useDispatch();
//   const firebase = useFirebase();
//   const isCurrentUser = firebase.auth().currentUser.uid === params.id;
//   const userProfileQuery = useMemo(
//     () => ({
//       collection: "users",
//       doc: params.id,
//       storeAs: "userProfile"
//     }),
//     [params.id]
//   );

//   const userPhotosQuery = useMemo(
//     () => ({
//       collection: "users",
//       doc: params.id,
//       subcollections: [{ collection: "photos" }],
//       storeAs: "photos"
//     }),
//     [params.id]
//   );
//   useFirestoreConnect(userProfileQuery); // needs to be query object so can either get profile from store
//   useFirestoreConnect(userPhotosQuery); // needs to be query object so can store as

//   const profile = useSelector(
//     state =>
//       (state.firestore.ordered.userProfile &&
//         state.firestore.ordered.userProfile[0]) ||
//       {}
//   );
//   const photos = useSelector(
//     state => state.firestore.ordered.photos && state.firestore.ordered.photos
//   );
//   const userJobs = useSelector(
//     state => objectToArray(state.jobs.userJobs) || []
//   );
//   console.log(userJobs);
//   const requesting = useSelector(state => state.firestore.status.requesting);
//   const jobsLoading = useSelector(state => state.async.loading);

//   useEffect(() => {
//     dispatch(getUserJobs(params.id));
//   }, [dispatch, params]);

//   const handleChangeTab = async (e, data) => {
//     console.log(data);
//     dispatch(getUserJobs(params.id, data.activeIndex));
//   };
//   const loading = Object.values(requesting).some(a => a === true);
//   if (loading) return <LoadingComponent />;
//   return (
//     <Grid>
//       <UserDetailedHeader profile={profile} />
//       <UserDetailedDescription profile={profile} />
//       <UserDetailedSidebar isCurrentUser={isCurrentUser} />
//       {photos && <UserDetailedPhotos photos={photos} />}
//       <UserDetailedJobs
//         isCurrentUser={isCurrentUser}
//         jobs={userJobs}
//         jobsLoading={jobsLoading}
//         changeTab={handleChangeTab}
//       />
//     </Grid>
//   );
// };

// export default UserDetailedPage;
