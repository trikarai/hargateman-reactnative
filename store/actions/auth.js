import { AsyncStorage } from "react-native";

export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const AUTHENTICATE = "AUTHENTICATE";

export const authenticate = (credentials, data) => {
  return {
    type: AUTHENTICATE,
    credentials: credentials,
    data: data,
  };
};

export const signup = (name, phone, email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "http://10.0.2.2/bara-ht/public/api/guest/user-signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          phone: phone,
          name: name,
        }),
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
    dispatch({
      type: SIGNUP,
    });
  };
};
export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "http://10.0.2.2/bara-ht/public/api/guest/user-login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
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
    console.log(resData.credentials);
    dispatch({
      type: AUTHENTICATE,
      credentials: resData.credentials,
      data: resData.data,
    });
    saveDataToStorage(resData.credentials, resData.data);
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};

const saveDataToStorage = (credentials, data) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      credentials: credentials,
      data: data,
    })
  );
};
