const initialState = {
  selected: [],
  courseAuthor: {},
  users: [],
  studentList: [],
  enrollList: [],
  enrolled: false,
  isLoading: true,
};

const selectedCourseReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_SELECTED_COURSE":
      return {
        ...state,
        selected: action.payload.selected,
        courseAuthor: action.payload.courseAuthor,
        studentList: action.payload.studentList,
        enrolled: action.payload.enrolled,
        enrollList: action.payload.enrollList,
        isLoading: false,
      };
    case "LOADING_SELECTED_COURSE":
      return {
        ...state,
        isLoading: true,
      };
    case "UNLOAD_SELECTED_COURSE":
      return {
        ...state,
        selected: [],
        courseAuthor: {},
        users: [],
        studentList: [],
        enrollList: [],
        enrolled: false,
        isLoading: true,
      };
    case "ONLINE_ID":
      return {
        ...state,
        studentList: action.payload.studentList,
      };
    default:
      return { ...state };
  }
};

export default selectedCourseReducer;
