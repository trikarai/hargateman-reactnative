import axios from "axios";
import baseUri from "../../config/baseUri";

export const CREATE_GROUP = "CREATE_GROUP";
export const SET_AVAIL_GROUP = "SET_AVAIL_GROUP";
export const SET_MEMBERSHIP_GROUP = "SET_MEMBERSHIP_GROUP";

import BaseModel from "../../model/baseModel";
import GroupApplication from "../../model/community/group/GroupApplication";
import GroupMembership from "../../model/community/group/GroupMembership";

export const createGroup = (communityId, name, decription, admin) => {
  return async (dispatch, getState) => {
    const token = getState().auth.credentials.token;
    try {
      const response = await axios.post(
        baseUri.api + "/user/as-community-admin/" + communityId + "/groups",
        {
          name: name,
          decription: decription,
          listOfMemberIdForAdmin: admin,
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

export const fetchGroup = (communityId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.credentials.token;
    try {
      const response = await axios.get(
        baseUri.api + "/user/as-community-member/" + communityId + "/groups",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const resData = await response.data;
      console.log(resData);
      const loadedGroups = [];
      if (resData.data.list) {
        const array = resData.data.list;
        array.forEach((element) => {
          loadedGroups.push(new BaseModel(element.id, element.name));
        });
      }
      dispatch({
        type: SET_AVAIL_GROUP,
        groups: loadedGroups,
      });
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

export const applyGroup = (communityId, groupId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.credentials.token;
    try {
      const response = await axios.post(
        baseUri.api +
          "/user/community-memberships/" +
          communityId +
          "/group-applications",
        {
          groupId: groupId,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const resData = await response.data;
      console.log(response);
    } catch (err) {
      console.log(err);
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
export const cancelGroup = (communityId, groupId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.credentials.token;
    try {
      const response = await axios.patch(
        baseUri.api +
          "/user/community-memberships/" +
          communityId +
          "/group-applications/" +
          groupId +
          "/cancel",
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const resData = await response.data;
      console.log(response);
    } catch (err) {
      console.log(err);
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

export const fetchGroupMembership = (communityId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.credentials.token;
    try {
      const response = await axios.get(
        baseUri.api +
          "/user/community-memberships/" +
          communityId +
          "/group-memberships",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const resData = await response.data;
      console.log(resData);
      const loadedGroups = [];
      if (resData.data.list) {
        const array = resData.data.list;
        array.forEach((element) => {
          loadedGroups.push(
            new GroupMembership(
              element.group.id,
              element.group.name,
              element.anAdmin,
              element.active,
              element.joinTime
            )
          );
        });
      }
      dispatch({
        type: SET_MEMBERSHIP_GROUP,
        groups: loadedGroups,
      });
    } catch (err) {
      console.log(err);
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

export const fetchGroupApplications = (communityId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.credentials.token;
    try {
      const response = await axios.get(
        baseUri.api +
          "/user/community-memberships/" +
          communityId +
          "/group-applications",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const resData = await response.data;
      console.log(resData);
      const loadedGroups = [];
      if (resData.data.list) {
        const array = resData.data.list;
        array.forEach((element) => {
          loadedGroups.push(
            new GroupApplication(
              element.id,
              element.group.id,
              element.group.name,
              element.notes,
              element.concluded,
              element.appliedTime
            )
          );
        });
      }
      dispatch({
        type: SET_MEMBERSHIP_GROUP,
        groups: loadedGroups,
      });
    } catch (err) {
      console.log(err);
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
