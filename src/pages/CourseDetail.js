import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadSelectedCourse } from "../actions/selectedCourseAction";

function CourseDetail({ match }) {
  const dispatch = useDispatch();
  const { studentList, courseAuthor, selected } = useSelector(
    (state) => state.selectCourse
  );

  const URL = match.params.course;

  useEffect(() => {
    dispatch(loadSelectedCourse(URL));
  }, [dispatch, URL]);

  return (
    <div className="course-detail">
      <div>
        COURSE_CODE:{selected.course}
        COURSE_NAME:{selected.name}
        COURSE_AUTHOR:{courseAuthor.name}
        AUTHOR_EMAIL:{courseAuthor.email}
      </div>
      <div>
        <ul>
          <li>lsie</li>
          <li>{courseAuthor.name}</li>
          {studentList.map((student) => (
            <li key={student._id}>{student.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CourseDetail;
