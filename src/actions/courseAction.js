import axios from "axios";
import { getAllCourseURL, classListURL, singleCourseDetailURL } from "../api";

export const loadCourse = (userId) => async (dispatch) => {
  dispatch({
    type: "LOADING_COURSE",
  });
  const courseDetail = await axios.get(getAllCourseURL());
  const myCourse = await axios.get(classListURL(userId));
  const ListOfCourse = [];
  await Promise.all(
    myCourse.data.map(async (course) => {
      await axios.get(singleCourseDetailURL(course.course_id)).then((res) => {
        ListOfCourse.push(res.data);
      });
    })
  );
  dispatch({
    type: "GET_ALL_COURSE",
    payload: {
      courses: courseDetail.data,
      mycourses: ListOfCourse,
    },
  });
};
