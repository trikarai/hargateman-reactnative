import { SET_COMMUNITIES, DETAIL_COMMUNITIES } from "../actions/community";

import Communities from "../../model/Communities";

const initialState = {
  availableCommunities: [],
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
    case DETAIL_COMMUNITIES:
      return {
        detailCommunity: action.communities,
      };
  }
  return state;
};
