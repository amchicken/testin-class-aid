import React from "react";
import { useSelector } from "react-redux";

function CourseHead() {
  const { courseAuthor, selected } = useSelector((state) => state.selectCourse);
  return (
    <div className="course-head">
      <h1>{selected.course}</h1>
      <h2>{selected.name}</h2>
      <div>
        <p>
          AUTHOR: <b>{courseAuthor.name}</b>
        </p>
        <p>
          CONTACT EMAIL: <b>{courseAuthor.email}</b>
        </p>
      </div>
    </div>
  );
}

export default CourseHead;
