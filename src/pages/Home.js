import React, { useEffect } from "react";
import { Route, Link } from "react-router-dom";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { loadCourse } from "../actions/courseAction";
//PAGE AND COMPONENT
import CourseDetail from "./CourseDetail";
import NavTop from "../components/NavTop";
import NavSide from "../components/NavSide";

const Home = () => {
  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.course);
  const { user } = useSelector((state) => state.login);
  useEffect(() => {
    dispatch(loadCourse());
  }, [dispatch]);

  return (
    <div>
      <NavTop />
      <div className="container">
        <NavSide />
        <div className="content">
          <Route path="/" exact>
            ALL COURSE
            <div className="course-continer">
              {user.is_admin ? (
                <Link to={`/addNewCourse`}>
                  <div className="course">Add new course</div>
                </Link>
              ) : (
                ""
              )}
              {courses.map((course) => (
                <Link to={`/course/${course.course}`} key={course._id}>
                  <div className="course">{course.name}</div>
                </Link>
              ))}
            </div>
          </Route>
          <Route path="/course/:course" component={CourseDetail} />
          <Route path="/addNewCourse" />
        </div>
      </div>
    </div>
  );
};

export default Home;
