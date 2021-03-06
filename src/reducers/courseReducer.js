const initialState = {
  courses: [],
  mycourses: [],
  isLoading: true,
};

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_COURSE":
      return {
        ...state,
        courses: action.payload.courses,
        mycourses: action.payload.mycourses,
        isLoading: false,
      };
    case "LOADING_COURSE":
      return {
        ...state,
        isLoading: true,
      };
    default:
      return { ...state };
  }
};

export default courseReducer;
