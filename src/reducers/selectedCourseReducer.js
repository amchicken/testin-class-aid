const initialState = {
  selected: [],
  courseAuthor: {},
  studentList: [],
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
        isLoading: false,
      };
    case "LOADING_SELECTED_COURSE":
      return {
        ...state,
        isLoading: true,
      };
    default:
      return { ...state };
  }
};

export default selectedCourseReducer;
