import React from "react";
import { RemoveCircle, AssignmentInd } from "@material-ui/icons";
import { Link } from "react-router-dom";

function StudentDetail({ name, canUnroll, removeStudent, _id }) {
  return (
    <button class="btn-share">
      <span class="btn-text">{name}</span>
      <ul class="social-icons">
        <li>
          <Link to="/">
            <AssignmentInd className="mysvg" />
          </Link>
        </li>
        <li>
          <button onClick={removeStudent} value={_id}>
            <RemoveCircle className="mysvg" />
          </button>
        </li>
      </ul>
    </button>
  );
}

export default StudentDetail;
