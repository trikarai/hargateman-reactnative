import {
  SET_COMMUNITIES,
  SET_COMMUNITIES_APP,
  SET_COMMUNITIES_APP_ADMIN,
  SET_COMMUNITIES_MEMBERSHIP,
  SET_COMMUNITIES_MEMBERS,
  DETAIL_COMMUNITIES,
} from "../actions/community";

const initialState = {
  availableCommunities: [],
  applicationsCommunities: [],
  membershipCommunities: [],
  membersCommunities: [],
  detailCommunity: {
    id: "",
    name: "",
    description: "",
    creator: {
      name: "",
    },
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_COMMUNITIES:
      return {
        availableCommunities: action.communities,
      };
    case SET_COMMUNITIES_APP:
      return {
        applicationsCommunities: action.communities,
      };
    case SET_COMMUNITIES_APP_ADMIN:
      return {
        applicationsCommunities: action.communities,
      };
    case SET_COMMUNITIES_MEMBERSHIP:
      return {
        membershipCommunities: action.communities,
      };
    case SET_COMMUNITIES_MEMBERS:
      return {
        membersCommunities: action.communities,
      };
    case DETAIL_COMMUNITIES:
      return {
        detailCommunity: action.communities,
      };
    default:
      return state;
  }
};
