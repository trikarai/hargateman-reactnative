import Communities from "../../model/Communities";

export const SET_COMMUNITIES = "SET_COMMUNITIES";
export const DETAIL_COMMUNITIES = "DETAIL_COMMUNITIES";
export const CREATE_COMMUNITIES = "CREATE_COMMUNITIES";

import baseUri from "../../config/baseUri";

export const fetchCommunities = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.credentials.token;
    try {
      const response = await fetch(baseUri.api + "/user/communities", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (!response.ok) {
        throw new Error("Error");
      }

      const resData = await response.json();
      const array = resData.data.list;
      const loadedCommunities = [];

      array.forEach((element) => {
        loadedCommunities.push(
          new Communities(element.id, element.id, element.name)
        );
      });
      dispatch({ type: SET_COMMUNITIES, communities: loadedCommunities });
    } catch (err) {
      throw err;
    }
  };
};

export const detailCommunities = (id) => {
  return async (dispatch, getState) => {
    const token = getState().auth.credentials.token;
    const response = await fetch(baseUri.api + "/user/communities/" + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const resData = await response.json();
    console.log(resData);
    dispatch({ type: DETAIL_COMMUNITIES, communities: resData.data });
  };
};

export const createCommunities = (name) => {
  return async (dispatch, getState) => {
    const token = getState().auth.credentials.token;
    const response = await fetch(baseUri.api + "/user/communities", {
      method: "POST",
      body: JSON.stringify({
        name,
      }),
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (!response.ok) {
      const errorResData = await response.json();
      console.log(errorResData);
      let message = "Something went wrong!";
      const errorId = errorResData.meta.error_detail;
      if (errorId) {
        throw new Error(errorId);
      } else {
        throw new Error(message);
      }
    }

    const resData = await response.json();
    dispatch({ type: CREATE_COMMUNITIES });
  };
};
