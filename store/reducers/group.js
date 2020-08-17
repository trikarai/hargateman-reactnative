import {
  CREATE_GROUP,
  SET_AVAIL_GROUP,
  SET_MEMBERSHIP_GROUP,
  SET_MEMBERS_GROUP,
  SET_ADMIN_APPLICANT_GROUP,
} from "../actions/group";

const initialState = {
  groups: [],
  applicants: [],
  members: [],
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
    case SET_ADMIN_APPLICANT_GROUP:
      return {
        applicants: action.groups,
      };
    case SET_MEMBERS_GROUP:
      return {
        members: action.groups,
      };
    default:
      return state;
  }
};
