import React from "react";

import ChattingSection from "../ChattingSection";
import CourseHead from "./CourseHead";

function CourseContent() {
  return (
    <div className="course-content-container">
      <CourseHead />
      <div className="course-ranking">
        <h3>Ranking</h3>
        <div className="ranking">
          <div className="rank">
            <h4>RANK 2</h4>
            <p>
              name <b>point</b>
            </p>
          </div>
          <div className="rank">
            <h4>RANK 1</h4>
            <p>
              name <b>point</b>
            </p>
          </div>
          <div className="rank">
            <h4>RANK 3</h4>
            <p>
              name <b>point</b>
            </p>
          </div>
        </div>
      </div>
      <div className="course-chat-container">
        <ChattingSection></ChattingSection>
      </div>
    </div>
  );
}

export default CourseContent;
