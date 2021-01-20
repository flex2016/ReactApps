import { createReducer } from "../../app/common/util/reducerUtils";
import {
  CREATE_JOB,
  UPDATE_JOB,
  DELETE_JOB,
  FETCH_JOBS,
  MORE_JOBS
} from "./jobConstants";

const initialState = {
  jobs: [],

  moreJobs: true
};

const createJob = (state, payload) => {
  return [...state, payload.job];
};

const updateJob = (state, payload) => {
  return [...state.filter(job => job.id !== payload.job.id), payload.job];
};

const deleteJob = (state, payload) => {
  return [...state.filter(job => job.id !== payload.jobId)];
};

const fetchJobs = (state, payload) => {
  return {
    ...state,
    jobs: payload.jobs
  };
};

export const moreJobs = state => {
  return {
    ...state.jobs,
    moreJobs: false
  };
};

export default createReducer(initialState, {
  [CREATE_JOB]: createJob,
  [UPDATE_JOB]: updateJob,
  [DELETE_JOB]: deleteJob,
  [FETCH_JOBS]: fetchJobs,
  [MORE_JOBS]: moreJobs
});
