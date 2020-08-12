import {
  CREATE_GROUP,
  SET_AVAIL_GROUP,
  SET_MEMBERSHIP_GROUP,
} from "../actions/group";

const initialState = {
  groups: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_AVAIL_GROUP:
      return {
        groups: action.groups,
      };
    case SET_MEMBERSHIP_GROUP:
      return {
        groups: action.groups,
      };
    default:
      return state;
  }
};
