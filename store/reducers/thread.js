import { SET_THREADS } from "../actions/thread";

const initialState = {
  threads: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_THREADS:
      return {
        threads: action.threads,
      };
    default:
      return state;
  }
};
