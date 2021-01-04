//Base URL
const base_url = "https://backend-class-aid.herokuapp.com/api/";
const user_url = "user/";
const course_url = "course/";
const enroll_url = "enroll/";

export const userDetailURL = () => `${base_url}${user_url}alluser`;
export const loginURL = () => `${base_url}${user_url}login`;
export const signupURL = () => `${base_url}${user_url}register`;
export const addCourseURL = () => `${base_url}${course_url}addCourse`;
export const getAllCourseURL = () => `${base_url}${enroll_url}`;
