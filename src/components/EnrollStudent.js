import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadSelectedCourse } from "../actions/selectedCourseAction";
import { loadDetail } from "../actions/userAction";
import { enrollURL } from "../api";
import axios from "axios";
import CourseHead from "./CourseDetail/CourseHead";
import Loading from "./Loading";

function EnrollStudent({ setEnrollStudent, URL }) {
  const dispatch = useDispatch();
  function close() {
    setEnrollStudent(false);
  }
  const { selected, courseAuthor, enrollList } = useSelector(
    (state) => state.selectCourse
  );
  const login = useSelector((state) => state.login);
  const [isLoading, setisLoading] = useState(true);
  const selectRef = useRef(null);

  function enrollHandle(e) {
    e.preventDefault();
    axios
      .post(
        enrollURL(),
        {
          user_id: selectRef.current.value,
          course_id: selected._id,
        },
        {
          headers: {
            "auth-token": `${login.token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        dispatch(loadSelectedCourse(URL, login.user._id));
        close();
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  useEffect(() => {
    dispatch(loadDetail());
    setisLoading(false);
  }, [dispatch, isLoading]);

  return (
    <div className="student-enroll-container">
      {isLoading ? (
        <Loading fullscreen={false} />
      ) : (
        <div>
          <button className="close topright" onClick={close}>
            X
          </button>
          <h2 className="enroll-topic">Enroll student</h2>
          <form>
            <CourseHead />
            <div className="student-selecter-container">
              <label htmlFor="student">Student</label>
              <select name="student" ref={selectRef}>
                {enrollList.map((user) => {
                  if (user._id !== courseAuthor._id)
                    return (
                      <option key={user._id} value={user._id}>
                        {user.name}
                      </option>
                    );
                  else return "";
                })}
              </select>
            </div>
            <button onClick={enrollHandle}>Enrollled</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default EnrollStudent;
