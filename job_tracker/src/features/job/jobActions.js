import { toastr } from "react-redux-toastr";
import { MORE_JOBS, FETCH_JOBS } from "./jobConstants";
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart
} from "../async/asyncActions";
import { createNewJob, objectToArray } from "../../app/common/util/helpers";
import firebase from "../../app/config/firebase";

export const createJob = ({ firebase, firestore }, job) => {
  return async (dispatch, getState) => {
    const user = firebase.auth().currentUser;
    const photoURL = getState().firebase.profile.photoURL;
    const newJob = createNewJob(user, photoURL, job);
    try {
      dispatch(asyncActionStart());
      let createdJob = await firestore.add("jobs", newJob);
      // await firestore.set(`event_attendee/${createdJob.id}_${user.uid}`, {
      //   jobId: createdJob.id,
      //   userUid: user.uid,
      //   jobDate: job.date,
      //   host: true
      // });
      toastr.success("Success!", "Job has been created");
      dispatch(asyncActionFinish());
      return createdJob;
    } catch (error) {
      dispatch(asyncActionFinish());
      toastr.error("Oops", "Something went wrong");
    }
  };
};

export const updateJob = ({ firestore }, job) => {
  return async (dispatch, getState) => {
    try {
      dispatch(asyncActionStart());
      await firestore.update(`jobs/${job.id}`, job);
      dispatch(asyncActionFinish());
      toastr.success("Success!", "Job has been updated");
    } catch (error) {
      dispatch(asyncActionFinish());
      toastr.error("Oops", "Something went wrong");
    }
  };
};

export const cancelToggle = ({ firestore }, cancelled, jobId) => async (
  dispatch,
  getState
) => {
  const message = cancelled
    ? "Are you sure you want to cancel the job?"
    : "This will reactivate the job - are you sure?Ì";
  try {
    toastr.confirm(message, {
      onOk: async () =>
        await firestore.update(`jobs/${jobId}`, {
          cancelled: cancelled
        })
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteJob = ({ firestore, history }, jobId) => async dispatch => {
  const message = "Are you sure you want to Delete the job?";

  try {
    dispatch(asyncActionStart());
    toastr.confirm(message, {
      onOk: async () =>
        await firestore.delete(`jobs/${jobId}`).then(history.push("/jobs"))
    });

    dispatch(asyncActionFinish());
  } catch (error) {
    dispatch(asyncActionFinish());
    console.log(error);
  }
};

export const getJobsForDashboard = lastJob => async (dispatch, getState) => {
  let today = new Date(Date.now());
  const firestore = firebase.firestore();
  const jobsRef = firestore.collection("jobs");
  try {
    dispatch(asyncActionStart());
    let startAfter =
      lastJob &&
      (await firestore
        .collection("jobs")
        .doc(lastJob.id)
        .get());
    let query;

    lastJob
      ? (query = jobsRef
          // .where("date", ">=", today)
          .orderBy("date", "desc")
          .startAfter(startAfter)
          .limit(20))
      : (query = jobsRef
          // .where("date", ">=", today)
          .orderBy("date", "desc")
          .limit(20));

    let querySnap = await query.get();

    if (querySnap.docs.length === 0) {
      dispatch(asyncActionFinish());
      return querySnap;
    }

    let jobs = [];

    for (let i = 0; i < querySnap.docs.length; i++) {
      let job = { ...querySnap.docs[i].data(), id: querySnap.docs[i].id };
      jobs.push(job);
    }

    dispatch({ type: FETCH_JOBS, payload: { jobs } });
    dispatch(asyncActionFinish());
    return querySnap;
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};

// export const getPagedJobs = ({ firestore }) => async (dispatch, getState) => {
//   dispatch(asyncActionStart());
//   const LIMIT = 2;
//   let nextJobSnapshot = null;
//   const {
//     firestore: {
//       data: { jobs: items }
//     }
//   } = getState();
//   if (items && Object.keys(items).length >= LIMIT) {
//     let itemsArray = objectToArray(items);
//     nextJobSnapshot = await firestore
//       .collection("jobs")
//       .doc(itemsArray[itemsArray.length - 1].id)
//       .get();
//     console.log(nextJobSnapshot);
//   }
//   console.log(firestore);

//   let querySnap = await firestore.get({
//     collection: "jobs",
//     limit: LIMIT,
//     orderBy: ["date"],
//     startAfter: nextJobSnapshot,
//     storeAs: "jobs"
//   });
//   // console.log(querySnap);
//   if (querySnap.docs.length < LIMIT) {
//     dispatch({ type: MORE_JOBS });
//   }
//   dispatch(asyncActionFinish());
// };
