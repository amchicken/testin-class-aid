import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadSelectedCourse } from "../actions/selectedCourseAction";
import axios from "axios";
import { unenrollURL } from "../api";

import StudentDetail from "./StudentDetail";

function StudentList({ enrollCourseHandle, URL }) {
  const { selected, studentList } = useSelector((state) => state.selectCourse);
  const login = useSelector((state) => state.login);
  const dispatch = useDispatch();

  function removeStudent(event) {
    event.preventDefault();
    const confirm = window.confirm("Press a button!");
    console.log(event.target.value);
    if (confirm) {
      axios
        .post(
          unenrollURL(),
          {
            user_id: event.target.value,
            course_id: selected._id,
          },
          {
            headers: {
              "auth-token": login.token,
            },
          }
        )
        .then((res) => {
          console.log(res);
          dispatch(loadSelectedCourse(URL));
        })
        .catch((err) => console.log(err.response));
    } else console.log("REJECT");
  }

  return (
    <div className="list-name">
      <ul>
        {studentList.map(function (student) {
          const canUnroll = login.user.is_admin || login.user_id === student.id;
          return (
            <li key={student._id}>
              <StudentDetail
                canUnroll={canUnroll}
                name={student.name}
                removeStudent={removeStudent}
                _id={student._id}
              />
            </li>
          );
        })}
      </ul>
      <button onClick={enrollCourseHandle}>Enroll Student</button>
    </div>
  );
}

export default StudentList;
