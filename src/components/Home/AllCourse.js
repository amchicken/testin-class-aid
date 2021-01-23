import React from "react";
import { Link } from "react-router-dom";

function AllCourse({ courses, user }) {
  return (
    <div>
      ALL COURSE
      <div className="course-continer">
        {user.is_admin ? (
          <Link to={`/addNewCourse`}>
            <div className="course">
              <h1>Add new course</h1>
            </div>
          </Link>
        ) : (
          ""
        )}
        {courses.map((course) => (
          <Link to={`/course/${course.course}`} key={course._id}>
            <div className="course">
              <h2>{course.course}</h2>
              <span>{course.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AllCourse;
