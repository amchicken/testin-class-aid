import React from "react";
import { useDispatch } from "react-redux";
import { loadSelectedCourse } from "../../actions/selectedCourseAction";
import { loadCourse } from "../../actions/courseAction";
import axios from "axios";
import { enrollURL } from "../../api";

function SingleEnrollButton({ URL, login, selected }) {
  const dispatch = useDispatch();
  function enrollHandle(e) {
    e.preventDefault();
    axios
      .post(
        enrollURL(),
        {
          user_id: login.user._id,
          course_id: selected._id,
        },
        {
          headers: {
            "auth-token": `${login.token}`,
          },
        }
      )
      .then((response) => {
        dispatch(loadSelectedCourse(URL, login.user._id));
        dispatch(loadCourse(login.user._id));
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  return <button onClick={enrollHandle}>Enroll</button>;
}

export default SingleEnrollButton;
