import { createReducer } from "../../app/common/util/reducerUtils";
import { GET_USER_JOBS } from "./userConstants";

const initialState = {
  jobs: []
};

const getUserJobs = (state, payload) => {
  return {
    ...state,
    jobs: payload.jobs
  };
};

export default createReducer(initialState, {
  [GET_USER_JOBS]: getUserJobs
});
