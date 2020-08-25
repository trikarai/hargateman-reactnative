import { SET_STORES } from "../actions/store";

const initialState = {
  stores: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_STORES:
      return {
        stores: action.store,
      };
    default:
      return state;
  }
};
