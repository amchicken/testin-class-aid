import React, { useEffect } from "react";
//Redux
import { useDispatch, useSelector } from "react-redux";
// import { loadDetail } from "../actions/userAction";
import { loadCourse } from "../actions/courseAction";
import UserLogin from "../components/UserLogin";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(loadDetail());
    dispatch(loadCourse());
  }, [dispatch]);
  //Get that data back
  const { courses } = useSelector((state) => state.course);
  return (
    <div>
      <UserLogin />
      {courses.map((course) => (
        <div key={course._id}>{course.name}</div>
      ))}
    </div>
  );
};

export default Home;
