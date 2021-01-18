import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RemoveCircle, AssignmentInd } from "@material-ui/icons";
import { loadSelectedCourse } from "../actions/selectedCourseAction";
import axios from "axios";
import { unenrollURL } from "../api";
import TestComponent from "./TestComponent";

function StudentList({ enrollCourseHandle, URL }) {
  const { selected, studentList } = useSelector((state) => state.selectCourse);
  const login = useSelector((state) => state.login);
  const dispatch = useDispatch();

  function removeStudent(event) {
    const confirm = window.confirm("Press a button!");
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
        {studentList.map((student, index) => (
          <li key={student._id}>
            <div>
              <div>{student.name}</div>
              <div>
                <AssignmentInd />
                {login.user.is_admin || login.user._id === student._id ? (
                  <button onClick={removeStudent} value={student._id}>
                    remove
                    {/* <RemoveCircle /> */}
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
      <TestComponent></TestComponent>
      <button onClick={enrollCourseHandle}>Enroll Student</button>
    </div>
  );
}

export default StudentList;
