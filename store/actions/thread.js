// action set
export const SET_THREADS = "SET_THREADS";
export const SET_THREADS_COMMENTS = "SET_THREADS_COMMENTS";

import CommunityThread from "../../model/community/thread/CommunityThread";
import ThreadComment from "../../model/community/thread/ThreadComment";

import baseUri from "../../config/baseUri";
import axios from "axios";

export const fetchThreads = (communityId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.credentials.token;
    try {
      const response = await axios.get(
        baseUri.api +
          "/user/as-community-member/" +
          communityId +
          "/community-threads",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const resData = await response.data;
      console.log(resData);
      const loadedData = [];
      if (resData.data.list) {
        const array = resData.data.list;
        array.forEach((element) => {
          loadedData.push(
            new CommunityThread(
              element.id,
              element.title,
              element.submitTime,
              element.communityMembership.id,
              element.communityMembership.user.id,
              element.communityMembership.user.name,
              element.closed
            )
          );
        });
      }
      dispatch({
        type: SET_THREADS,
        threads: loadedData,
      });
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

export const fetchComments = (communityId, threadId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.credentials.token;

    try {
      const response = await axios.get(
        baseUri.api +
          "/user/as-community-member/" +
          communityId +
          "/community-threads/" +
          threadId +
          "/community-thread-posts",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const resData = await response.data;
      console.log(resData);
      const loadedComments = [];
      if (resData.data.list) {
        const array = resData.data.list;
        array.forEach((element) => {
          loadedComments.push(
            new ThreadComment(
              element.id,
              element.communityMembership.id,
              element.communityMembership.user.id,
              element.communityMembership.user.name,
              element.content,
              element.submitTime
            )
          );
        });
      }
      dispatch({ type: SET_THREADS_COMMENTS, threads: loadedComments });
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

export const postComment = (communityId, threadId, content) => {
  return async (dispatch, getState) => {
    const token = getState().auth.credentials.token;
    try {
      const response = await axios.post(
        baseUri.api +
          "/user/community-memberships/" +
          communityId +
          "/community-thread-posts/submit-new",
        {
          communityThreadId: threadId,
          content: content,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const resData = await response.data;
      console.log(resData);
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
export const postThread = (communityId, title, content) => {
  return async (dispatch, getState) => {
    const token = getState().auth.credentials.token;
    try {
      const response = await axios.post(
        baseUri.api +
          "/user/community-memberships/" +
          communityId +
          "/community-threads",
        {
          title: title,
          content: content,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const resData = await response.data;
      console.log(resData);
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
