import React from "react";
import { RemoveCircle, AssignmentInd } from "@material-ui/icons";
import { Link } from "react-router-dom";

function StudentDetail({ name, canUnroll, removeStudent, _id }) {
  return (
    <button className="btn-share">
      <span className="btn-text">{name}</span>
      <ul className="social-icons">
        <li>
          <Link to="/">
            <AssignmentInd className="mysvg" />
          </Link>
        </li>

        {canUnroll ? (
          <li>
            <button key={_id} onClick={removeStudent} value={_id}>
              <RemoveCircle className="mysvg" />
            </button>
          </li>
        ) : (
          ""
        )}
      </ul>
    </button>
  );
}

export default StudentDetail;
