import axios from "axios";
import { selectedCourseURL, singelUserDetailURL } from "../api";

export const loadSelectedCourse = (courseId) => async (dispatch) => {
  dispatch({
    type: "LOADING_SELECTED_COURSE",
  });
  const courseDetail = await axios.get(selectedCourseURL(courseId));
  const StudentList = await getStudentNameList(courseDetail.data.studentList);
  dispatch({
    type: "GET_SELECTED_COURSE",
    payload: {
      selected: courseDetail.data.classDetail,
      courseAuthor: {
        name: courseDetail.data.authorName.name,
        email: courseDetail.data.authorName.email,
      },
      studentList: StudentList,
    },
  });
};

async function getStudentNameList(list) {
  let student = [];
  list.map(async (e) => {
    await axios.get(singelUserDetailURL(e.user_id)).then((res) => {
      student.push({ _id: res.data._id, name: res.data.name });
    });
  });
  return student;
}
