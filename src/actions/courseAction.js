import axios from "axios";
import { getAllCourseURL } from "../api";

export const loadCourse = () => async (dispatch) => {
  dispatch({
    type: "LOADING_COURSE",
  });
  const courseDetail = await axios.get(getAllCourseURL());
  dispatch({
    type: "GET_ALL_COURSE",
    payload: {
      courses: courseDetail.data,
    },
  });
};
