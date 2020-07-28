import PRODUCT from "../../data/dummy-data";

const initialState = {
  availableProducts: PRODUCT,
  userProducts: PRODUCT,
};

export default (state = initialState, action) => {
  return state;
};
