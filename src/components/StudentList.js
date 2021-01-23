import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadSelectedCourse } from "../actions/selectedCourseAction";
import axios from "axios";
import { unenrollURL } from "../api";
import { loadCourse } from "../actions/courseAction";
import StudentDetail from "./StudentDetail";

function StudentList({ enrollCourseHandle, URL }) {
  const { selected, studentList } = useSelector((state) => state.selectCourse);
  const { mycourses } = useSelector((state) => state.course);
  const login = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const [canEnroll, setCanEnroll] = useState(true);

  function isCanEnroll() {
    mycourses.forEach((course) => {
      if (course._id === selected._id) setCanEnroll(false);
    });
  }

  function removeStudent(event) {
    event.preventDefault();
    const confirm = window.confirm("Remove this student?");
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
    }
    dispatch(loadCourse(login.user._id));
  }

  useEffect(() => {
    isCanEnroll();
  }, []);

  return (
    <div className="list-name">
      <ul>
        {studentList.map(function (student) {
          return (
            <li key={student._id}>
              <StudentDetail
                canUnroll={
                  login.user.is_admin || student._id === login.user._id
                }
                name={student.name}
                removeStudent={removeStudent}
                _id={student._id}
              />
            </li>
          );
        })}
      </ul>
      {canEnroll ? (
        <button className="enroll-btn" onClick={enrollCourseHandle}>
          Enroll
        </button>
      ) : (
        ""
      )}
    </div>
  );
}

export default StudentList;
