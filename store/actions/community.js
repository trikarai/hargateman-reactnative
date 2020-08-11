// Class Model
import Communities from "../../model/Communities";
import CommunitiesApplications from "../../model/CommunitiesApplications";
import CommunitiesMembership from "../../model/CommunitiesMembership";
import CommunityApplicant from "../../model/CommunityApplicant";
import CommunityMember from "../../model/CommunityMember";

// action set
export const SET_COMMUNITIES = "SET_COMMUNITIES";
export const DETAIL_COMMUNITIES = "DETAIL_COMMUNITIES";
export const CREATE_COMMUNITIES = "CREATE_COMMUNITIES";

export const SET_COMMUNITIES_APP = "SET_COMMUNITIES_APP";
export const CANEL_COMMUNITIES_APP = "CREATE_COMMUNITIES";

export const SET_COMMUNITIES_MEMBERSHIP = "SET_COMMUNITIES_MEMBERSHIP";
export const SET_COMMUNITIES_MEMBERS = "SET_COMMUNITIES_MEMBERS";
export const SET_COMMUNITIES_APP_ADMIN = "SET_COMMUNITIES_APP_ADMIN";

import baseUri from "../../config/baseUri";

import axios from "axios";

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

export const fecthCommunityApplications = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.credentials.token;
    try {
      const response = await axios.get(
        baseUri.api + "/user/community-applications",
        { headers: { Authorization: "Bearer " + token } }
      );
      const resData = await response.data;
      const array = resData.data.list;
      const loadedCommunities = [];
      // console.log(resData);
      array.forEach((element) => {
        loadedCommunities.push(
          new CommunitiesApplications(
            element.id,
            element.community.id,
            element.community.name,
            element.notes
          )
        );
      });
      // console.log(loadedCommunities);
      dispatch({ type: SET_COMMUNITIES_APP, communities: loadedCommunities });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};
export const fecthCommunityMemberships = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.credentials.token;
    try {
      const response = await axios.get(
        baseUri.api + "/user/community-memberships",
        { headers: { Authorization: "Bearer " + token } }
      );
      const resData = await response.data;
      const array = resData.data.list;
      const loadedCommunities = [];
      array.forEach((element) => {
        loadedCommunities.push(
          new CommunitiesMembership(
            element.community.id,
            element.community.id,
            element.community.name,
            element.anAdmin,
            element.joinTime,
            element.active
          )
        );
      });
      dispatch({
        type: SET_COMMUNITIES_MEMBERSHIP,
        communities: loadedCommunities,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};
export const fecthCommunityApplicants = (id) => {
  return async (dispatch, getState) => {
    const token = getState().auth.credentials.token;
    try {
      const response = await axios.get(
        baseUri.api +
          "/user/as-community-admin/" +
          id +
          "/community-applications",
        { headers: { Authorization: "Bearer " + token } }
      );
      const resData = await response.data;
      const array = resData.data.list;
      const loadedCommunities = [];
      array.forEach((element) => {
        loadedCommunities.push(
          new CommunityApplicant(
            element.id,
            element.user.id,
            element.user.name,
            element.appliedTime
          )
        );
      });
      dispatch({
        type: SET_COMMUNITIES_APP_ADMIN,
        communities: loadedCommunities,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const fecthCommunityMembers = (id) => {
  return async (dispatch, getState) => {
    const token = getState().auth.credentials.token;
    try {
      const response = await axios.get(
        baseUri.api +
          "/user/as-community-member/" +
          id +
          "/community-memberships",
        { headers: { Authorization: "Bearer " + token } }
      );
      const resData = await response.data;
      const array = resData.data.list;
      const loadedMembers = [];
      array.forEach((element) => {
        loadedMembers.push(
          new CommunityMember(
            element.id,
            element.member.id,
            element.member.name,
            element.joinTime,
            element.anAdmin,
            element.active
          )
        );
      });
      dispatch({
        type: SET_COMMUNITIES_MEMBERS,
        communities: loadedMembers,
      });
    } catch (err) {
      const errorResData = await err.response.data;
      console.log(errorResData);
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

export const acceptCommunityApplicants = (communityId, id) => {
  return async (dispatch, getState) => {
    const token = getState().auth.credentials.token;
    const response = await fetch(
      baseUri.api +
        "/user/as-community-admin/" +
        communityId +
        "/community-applications/" +
        id +
        "/accept",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: {},
      }
    );
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
    console.log(resData);
  };
};
export const rejectCommunityApplicants = (communityId, id) => {
  return async (dispatch, getState) => {
    const token = getState().auth.credentials.token;
    try {
      const response = await axios.patch(
        baseUri.api +
          "/user/as-community-admin/" +
          communityId +
          "/community-applications/" +
          id +
          "/reject",
        {},
        { headers: { Authorization: "Bearer " + token } }
      );
      const resData = await response.data;
      console.log(resData);
    } catch (err) {
      const errorResData = await err.response.data;
      console.log(errorResData);
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
export const setAdminCommunityMember = (communityId, id) => {
  return async (dispatch, getState) => {
    const token = getState().auth.credentials.token;
    try {
      const response = await axios.patch(
        baseUri.api +
          "/user/as-community-admin/" +
          communityId +
          "/community-memberships/" +
          id +
          "/set-as-admin",
        {},
        { headers: { Authorization: "Bearer " + token } }
      );
    } catch (err) {
      const errorResData = await err.response.data;
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

export const leaveCommunities = (id) => {
  return async (dispatch, getState) => {
    const token = getState().auth.credentials.token;
    const response = await axios.patch(
      baseUri.api + "/user/community-memberships/" + id + "/leave",
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    if (response.status !== 200) {
      let message = "Something went wrong!";
      throw new Error(message);
    }
    console.log(response);
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
    dispatch({ type: DETAIL_COMMUNITIES, communities: resData.data });
  };
};

export const createCommunities = (name) => {
  return async (dispatch, getState) => {
    const token = getState().auth.credentials.token;
    try {
      const response = await axios.post(
        baseUri.api + "/user/communities",
        {
          name: name,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
    } catch (err) {
      const errorResData = await err.response.data;
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

export const applyCommunities = (id) => {
  return async (dispatch, getState) => {
    const token = getState().auth.credentials.token;
    const response = await axios.post(
      baseUri.api + "/user/community-applications",
      { communityId: id },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    if (response.status !== 200) {
      let message = "Something went wrong!";
      throw new Error(message);
    }

    console.log(response);
  };
};

export const cancelCommunityApplication = (id) => {
  return async (dispatch, getState) => {
    const token = getState().auth.credentials.token;
    const response = await axios.patch(
      baseUri.api + "/user/community-applications/" + id + "/cancel",
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    if (response.status !== 200) {
      let message = "Something went wrong!";
      throw new Error(message);
    }
    console.log(response);
    dispatch({ type: null });
  };
};
