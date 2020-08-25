// model class
import PersonalStore from "../../model/store/PersonalStore";

// action set
export const SET_STORES = "SET_STORES";

import baseUri from "../../config/baseUri";
import axios from "axios";

export const fetchStores = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.credentials.token;
    try {
      const response = await axios.get(baseUri.api + "/user/personal-stores", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const resData = await response.data;
      console.log(resData);
      const loadedData = [];
      if (resData.data.list) {
        const array = resData.data.list;
        array.forEach((element) => {
          loadedData.push(new PersonalStore(element.id, element.name));
        });
      }
      dispatch({ type: SET_STORES, store: loadedData });
    } catch (error) {
      console.log(error);
      const errorResData = await error.response.data;
      let message = "Something went wrong!";
      const errorId = errorResData.meta.error_detail;
      if (errorId) {
        throw new Error(errorId);
      } else {
        throw new Error(message);
      }
    }
  };
};
