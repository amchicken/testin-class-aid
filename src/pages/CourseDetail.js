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
    <div>
      {loading ? (
        <div>LOAING....</div>
      ) : (
        <div className="course-detail">
          {enrollStudent ? (
            <EnrollStudent setEnrollStudent={setEnrollStudent} URL={URL} />
          ) : (
            ""
          )}
          <StudentList enrollCourseHandle={enrollCourseHandle} URL={URL} />
          <div className="course-content-container">
            <div className="course-head">
              <h1>{selected.course}</h1>
              <h2>{selected.name}</h2>
              COURSE_AUTHOR:{courseAuthor.name}
              AUTHOR_EMAIL:{courseAuthor.email}
            </div>
            <div className="course-ranking">
              <h3>Ranking</h3>
              <div>rank:1 name point</div>
              <div>rank:2 name point</div>
              <div>rank:3 name point</div>
            </div>
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
