import axios from "axios";
import { selectedCourseURL, singelUserDetailURL, userDetailURL } from "../api";

export const loadSelectedCourse = (id, student_id) => async (dispatch) => {
  dispatch({
    type: "LOADING_SELECTED_COURSE",
  });
  const CourseData = await axios.get(selectedCourseURL(id));
  const UserData = await axios.get(userDetailURL());
  let ListOfUser = [];
  let ListId = [];
  let enrollList = [];
  let enrolled = false;

  await Promise.all(
    CourseData.data.studentList.map(async (singleName) => {
      await axios.get(singelUserDetailURL(singleName.user_id)).then((res) => {
        ListOfUser.push({ ...res.data, online: false });
        ListId.push(res.data._id);
        if (student_id === res.data._id) enrolled = true;
      });
    })
  );

  await Promise.all(
    UserData.data.map(async (user) => {
      if (!ListId.includes(user._id)) enrollList.push(user);
    })
  );

  if (student_id === CourseData.data.authorName._id) enrolled = true;
  dispatch({
    type: "GET_SELECTED_COURSE",
    payload: {
      selected: CourseData.data.classDetail,
      courseAuthor: CourseData.data.authorName,
      users: UserData.data,
      studentList: ListOfUser,
      enrollList,
      enrolled,
    },
  });
};

export const unloadCourse = () => async (dispatch) => {
  dispatch({
    type: "UNLOAD_SELECTED_COURSE",
  });
};

export const onlineStatus = (login, users) => async (dispatch) => {
  const userOnline = users.map(function (user) {
    if (login._id === user._id) user.online = true;
    return user;
  });

  console.log(userOnline);

  dispatch({
    type: "ONLINE_ID",
    payload: {
      studentList: userOnline,
    },
  });
};
