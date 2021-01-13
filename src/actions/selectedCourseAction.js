import axios from "axios";
import { selectedCourseURL, singelUserDetailURL } from "../api";

export const loadSelectedCourse = (id) => async (dispatch) => {
  dispatch({
    type: "LOADING_SELECTED_COURSE",
  });
  const CourseData = await axios.get(selectedCourseURL(id));
  const ListOfUser = [];
  await Promise.all(
    CourseData.data.studentList.map(async (singleName) => {
      await axios.get(singelUserDetailURL(singleName.user_id)).then((res) => {
        ListOfUser.push(res.data);
      });
    })
  );
  dispatch({
    type: "GET_SELECTED_COURSE",
    payload: {
      selected: CourseData.data.classDetail,
      courseAuthor: CourseData.data.authorName,
      studentList: ListOfUser,
    },
  });
};
