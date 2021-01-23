import React from "react";
import { Link } from "react-router-dom";

function AuthorCourse({ courses, user }) {
  return (
    <div>
      AUTHOR COURSE
      <div className="course-continer">
        {courses.map((course) => {
          if (user._id === course.author_id)
            return (
              <Link to={`/course/${course.course}`} key={course._id}>
                <div className="course">
                  <h2>{course.course}</h2>
                  <span>{course.name}</span>
                </div>
              </Link>
            );
          else return "";
        })}
      </div>
    </div>
  );
}

export default AuthorCourse;
