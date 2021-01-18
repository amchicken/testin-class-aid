import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadSelectedCourse } from "../actions/selectedCourseAction";

import EnrollStudent from "../components/EnrollStudent";
import StudentList from "../components/StudentList";
import ChattingSection from "../components/ChattingSection";

function CourseDetail({ match }) {
  const URL = match.params.course;
  const dispatch = useDispatch();
  const { courseAuthor, selected } = useSelector((state) => state.selectCourse);
  const [loading, setLoading] = useState(true);
  const [enrollStudent, setEnrollStudent] = useState(false);

  function enrollCourseHandle() {
    setEnrollStudent(true);
  }

  useEffect(() => {
    dispatch(loadSelectedCourse(URL)).then(function () {
      setLoading(false);
    });
  }, [dispatch, URL]);

  return (
    <div className="course-detail">
      {loading ? (
        <div>LOAING....</div>
      ) : (
        <div className="course-split">
          {enrollStudent ? (
            <EnrollStudent setEnrollStudent={setEnrollStudent} URL={URL} />
          ) : (
            ""
          )}
          <StudentList enrollCourseHandle={enrollCourseHandle} URL={URL} />
          <div className="course-content-container">
            <div>
              <h1>{selected.course}</h1>
              <h2>{selected.name}</h2>
            </div>
            <div>
              COURSE_AUTHOR:{courseAuthor.name}
              AUTHOR_EMAIL:{courseAuthor.email}
            </div>
            <div>Ranking</div>
            <div className="course-chat-container">
              <ChattingSection></ChattingSection>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseDetail;
