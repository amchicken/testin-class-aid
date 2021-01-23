import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loadSelectedCourse } from "../actions/selectedCourseAction";

import CourseContent from "../components/CourseDetail/CourseContent";
import EnrollStudent from "../components/EnrollStudent";
import StudentList from "../components/StudentList";
import StudentSelect from "../components/StudentSelect";
import Loading from "../components/Loading";

function CourseDetail({ match }) {
  const URL = match.params.course;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [enrollStudent, setEnrollStudent] = useState(false);
  const [studentSelect, setStudentSelect] = useState(false);
  const [studentId, setStudentId] = useState(null);

  function enrollCourseHandle() {
    setEnrollStudent(true);
  }

  useEffect(() => {
    dispatch(loadSelectedCourse(URL)).then(function () {
      setLoading(false);
    });
  }, [dispatch, URL]);

  return (
    <div>
      {loading ? (
        <Loading fullscreen={true} />
      ) : (
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
      )}
    </div>
  );
}

export default CourseDetail;
