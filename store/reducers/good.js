import { SET_GOODS } from "../actions/good";

const initialState = {
  goods: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GOODS:
      return {
        goods: action.goods,
      };

    default:
      return state;
  }
};
