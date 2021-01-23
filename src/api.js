//Base URL
const base_url = "http://localhost:3000/api/";
// const base_url = "https://backend-class-aid.herokuapp.com/api/";
const user_url = "user/";
const course_url = "course/";
const enroll_url = "enroll/";

export const userDetailURL = () => `${base_url}${user_url}alluser`;
export const singelUserDetailURL = (id) => `${base_url}${user_url}detail/${id}`;
export const loginURL = () => `${base_url}${user_url}login`;
export const signupURL = () => `${base_url}${user_url}register`;
export const addCourseURL = () => `${base_url}${course_url}add`;
export const getAllCourseURL = () => `${base_url}${enroll_url}`;
export const selectedCourseURL = (classId) =>
  `${base_url}${enroll_url}class/${classId}`;
export const enrollURL = () => `${base_url}${enroll_url}enrollCourse`;
export const unenrollURL = () => `${base_url}${enroll_url}unenroll`;
export const classListURL = (id) => `${base_url}${enroll_url}student/${id}`;
export const singleCourseDetailURL = (id) =>
  `${base_url}${course_url}detail/${id}`;
