// model class
import StoreGood from "../../model/store/good/StoreGood";
// action set
export const SET_GOODS = "SET_GOODS";

import baseUri from "../../config/baseUri";
import axios from "axios";

export const fetchGoods = (storeId) => {
  return async (dispacth, getState) => {
    const token = getState().auth.credentials.token;
    try {
      const response = await axios.get(
        baseUri.api + "/user/personal-stores/" + storeId + "/goods",
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
            new StoreGood(
              element.id,
              element.name,
              element.stock,
              element.price,
              element.condition,
              element.listed,
              element.createdTime,
              element.product
            )
          );
        });
      }
      dispacth({ type: SET_GOODS, goods: loadedData });
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

export const addGood = (
  storeId,
  name,
  description,
  faq,
  price,
  stock,
  shippingWeight,
  minimumOrder,
  condition
) => {
  return async (dispacth, getState) => {
    const token = getState().auth.credentials.token;
    try {
      const response = await axios.post(
        baseUri.api + "/user/personal-stores/" + storeId + "/goods",
        {
          name: name,
          description: description,
          faq: faq,
          price: price,
          stock: stock,
          shippingWeight: shippingWeight,
          minimumOrder: minimumOrder,
          condition: condition,
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
