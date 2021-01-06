import React, { useEffect } from "react";
import { Route, Link } from "react-router-dom";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { loadCourse } from "../actions/courseAction";
//PAGE AND COMPONENT
import Profile from "../components/Profile";
import CourseDetail from "./CourseDetail";
//IMPORT ICON
import { Home as HomeIcon, Inbox } from "@material-ui/icons/";

const Home = () => {
  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.course);

  useEffect(() => {
    dispatch(loadCourse());
  }, [dispatch]);

  return (
    <div>
      <nav className="top-nav">
        <Link to="/">
          <div id="logo">CLASS-AID</div>
        </Link>
        <Profile />
      </nav>
      <div className="container">
        <nav className="side-nav">
          <ul>
            <li>
              <HomeIcon />
            </li>
            <li>
              <Inbox />
            </li>
          </ul>
        </nav>
        <div className="content">
          <Route path="/" exact>
            ALL COURSE
            <div className="course-continer">
              {courses.map((course) => (
                <Link to={`/course/${course.course}`} key={course._id}>
                  <div className="course">{course.name}</div>
                </Link>
              ))}
            </div>
          </Route>
          <Route path="/course/:course" component={CourseDetail} />
        </div>
      </div>
    </div>
  );
};

export default Home;
