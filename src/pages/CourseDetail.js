import React from "react";

function CourseDetail({ match }) {
  return <div className="course-detail">{match.params.name}</div>;
}

export default CourseDetail;
