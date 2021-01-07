import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadSelectedCourse } from "../actions/selectedCourseAction";

function CourseDetail({ match }) {
  const dispatch = useDispatch();
  const { studentList, courseAuthor, selected } = useSelector(
    (state) => state.selectCourse
  );

  const [loading, isLoading] = useState(true);

  const URL = match.params.course;

  useEffect(() => {
    dispatch(loadSelectedCourse(URL)).then(function () {
      isLoading(false);
    });
  }, [dispatch, URL]);

  return (
    <div className="course-detail">
      {loading ? (
        <div>LOAING....</div>
      ) : (
        <div>
          <div>
            COURSE_CODE:{selected.course}
            COURSE_NAME:{selected.name}
            COURSE_AUTHOR:{courseAuthor.name}
            AUTHOR_EMAIL:{courseAuthor.email}
          </div>
          <div>
            <ul>
              <li>lsie</li>
              {studentList.map((student) => (
                <li key={student._id}>{student.name}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseDetail;
