import axios from "axios";
import { selectedCourseURL, singelUserDetailURL } from "../api";

export const loadSelectedCourse = (id) => async (dispatch) => {
  dispatch({
    type: "LOADING_SELECTED_COURSE",
  });
  const CourseData = await axios.get(selectedCourseURL(id));
  const ListOfUser = await tooManyName(CourseData.data.studentList);
  dispatch({
    type: "GET_SELECTED_COURSE",
    payload: {
      selected: CourseData.data.classDetail,
      courseAuthor: CourseData.data.authorName,
      studentList: ListOfUser,
    },
  });
};

function tooManyName(list) {
  return new Promise((resovle) => {
    let studentName = [];
    list.map(async (singleName) => {
      const nameList = await axios(singelUserDetailURL(singleName.user_id));
      studentName.push(nameList.data);
    });
    setTimeout(function () {
      resovle(studentName);
    }, 1000);
  });
}
