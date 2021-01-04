import axios from "axios";
import { userDetailURL } from "../api";

export const loadDetail = () => async (dispatch) => {
  dispatch({
    type: "LOADING_GET_ALL_USER",
  });
  const detailData = await axios.get(userDetailURL());
  dispatch({
    type: "GET_ALL_USER",
    payload: {
      user: detailData.data,
    },
  });
};
