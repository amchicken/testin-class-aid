import React from "react";
import { RemoveCircle, AssignmentInd } from "@material-ui/icons";
import { Link } from "react-router-dom";
function StudentDetail({ name, canUnroll, removeStudent, _id, online }) {
  return (
    <div className="btn-share">
      <span className="btn-text">
        <h4>{name}</h4>
        <span>{online ? "ONLINE" : "OFFLIEN"}</span>
      </span>
      <ul className="social-icons">
        <li>
          <Link to="/">
            <AssignmentInd className="mysvg" />
          </Link>
        </li>

        {canUnroll ? (
          <li>
            <button onClick={removeStudent} value={_id}>
              <RemoveCircle className="mysvg" />
            </button>
          </li>
        ) : (
          ""
        )}
      </ul>
    </div>
  );
}

export default StudentDetail;
