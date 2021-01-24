import axios from "axios";
import { selectedCourseURL, singelUserDetailURL } from "../api";

export const loadSelectedCourse = (id, student_id) => async (dispatch) => {
  dispatch({
    type: "LOADING_SELECTED_COURSE",
  });
  const CourseData = await axios.get(selectedCourseURL(id));
  let ListOfUser = [];
  let enrolled = false;
  await Promise.all(
    CourseData.data.studentList.map(async (singleName) => {
      await axios.get(singelUserDetailURL(singleName.user_id)).then((res) => {
        ListOfUser.push(res.data);
        if (student_id === res.data._id) enrolled = true;
      });
    })
  );
  if (student_id === CourseData.data.authorName._id) enrolled = true;
  dispatch({
    type: "GET_SELECTED_COURSE",
    payload: {
      selected: CourseData.data.classDetail,
      courseAuthor: CourseData.data.authorName,
      studentList: ListOfUser,
      enrolled,
    },
  });
};
