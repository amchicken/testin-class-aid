import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadSelectedCourse } from "../actions/selectedCourseAction";

import CourseContent from "../components/CourseDetail/CourseContent";
import EnrollStudent from "../components/EnrollStudent";
import StudentList from "../components/StudentList";
import StudentSelect from "../components/StudentSelect";
import Loading from "../components/Loading";
import CourseHead from "../components/CourseDetail/CourseHead";
import SingleEnrollButton from "../components/CourseDetail/SingleEnrollButton";

function CourseDetail({ match }) {
  const URL = match.params.course;
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);
  const { enrolled, selected } = useSelector((state) => state.selectCourse);
  const [enrollStudent, setEnrollStudent] = useState(false);
  const [studentSelect] = useState(false);

  function enrollCourseHandle() {
    setEnrollStudent(true);
  }

  useEffect(() => {
    dispatch(loadSelectedCourse(URL, login.user._id));
  }, [dispatch, login.user._id, URL]);

  return (
    <div className="course-select-container">
      {selected.isLoading ? <Loading fullscreen={true} /> : ""}
      {enrolled ? (
        <div className="course-detail">
          {enrollStudent ? (
            <EnrollStudent setEnrollStudent={setEnrollStudent} URL={URL} />
          ) : (
            ""
          )}
          {studentSelect ? <StudentSelect student="test" /> : ""}
          <StudentList enrollCourseHandle={enrollCourseHandle} URL={URL} />
          <CourseContent />
        </div>
      ) : (
        <div className="force-enroll">
          <CourseHead />
          <SingleEnrollButton URL={URL} selected={selected} login={login} />
        </div>
      )}
    </div>
  );
}

export default CourseDetail;
