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
  const { selected, studentList, courseAuthor } = useSelector(
    (state) => state.selectCourse
  );
  const { user } = useSelector((state) => state.user);
  const login = useSelector((state) => state.login);
  const [nameList, setnameList] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const selectRef = useRef(null);
  function filterName() {
    let list = studentList.map(function (item) {
      return item._id;
    });
    list.push(courseAuthor._id);
    const target = user.filter(function (item) {
      return !list.includes(item._id);
    });
    setnameList(target);
  }
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
        dispatch(loadSelectedCourse(URL));
        close();
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  useEffect(() => {
    dispatch(loadDetail()).then(function () {
      filterName();
      setisLoading(false);
    });
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
                {nameList.map((single) => (
                  <option key={single._id} value={single._id}>
                    {single.name}
                  </option>
                ))}
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
