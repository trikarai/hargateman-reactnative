import { SET_THREADS, SET_THREADS_COMMENTS } from "../actions/thread";

const initialState = {
  threads: [],
  comments: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_THREADS:
      return {
        threads: action.threads,
      };
    case SET_THREADS_COMMENTS:
      return {
        comments: action.threads,
      };
    default:
      return state;
  }
};
