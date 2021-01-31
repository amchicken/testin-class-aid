import React, { useEffect } from "react";
import { Route } from "react-router-dom";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { loadCourse } from "../actions/courseAction";
// import { unloadCourse } from "../actions/selectedCourseAction";
//PAGE AND COMPONENT
import AddCoursePage from "./AddCoursePage";
import CourseDetail from "./CourseDetail";
import NavTop from "../components/NavTop";
import NavSide from "../components/NavSide";
import AuthorCourse from "../components/Home/AuthorCourse";
import AllCourse from "../components/Home/AllCourse";
import MyCourse from "../components/Home/MyCourse";

const Home = ({ location }) => {
  const dispatch = useDispatch();
  const { courses, mycourses } = useSelector((state) => state.course);
  const { user } = useSelector((state) => state.login);
  useEffect(() => {
    dispatch(loadCourse(user._id));
  }, [dispatch, user._id]);

  return (
    <div className="App">
      <NavTop />
      <NavSide />
      <div className="content">
        <Route path="/" exact>
          <MyCourse mycourses={mycourses} />
          {user.is_admin ? <AuthorCourse user={user} courses={courses} /> : ""}
          <AllCourse user={user} courses={courses} />
        </Route>
        <Route path="/course/:course" component={CourseDetail} />
        <Route path="/addNewCourse" component={AddCoursePage} />
      </div>
    </div>
  );
};

export default Home;
