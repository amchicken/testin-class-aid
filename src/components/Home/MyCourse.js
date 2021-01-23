import React from "react";
import { Link } from "react-router-dom";

function MyCourse({ mycourses }) {
  return (
    <div>
      MY COURSE
      <div className="course-continer">
        {mycourses.map((course) => (
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

export default MyCourse;
