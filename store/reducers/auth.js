import { AUTHENTICATE, LOGOUT } from "../actions/auth";

const initialState = {
  credentials: null,
  data: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        credentials: action.credentials,
        data: action.data,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
