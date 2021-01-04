const initialState = {
  user: [],
  isLoading: true,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_USER":
      return {
        ...state,
        user: action.payload.user,
        isLoading: false,
      };
    case "LOADING_GET_ALL_USER":
      return {
        ...state,
        isLoading: true,
      };
    default:
      return { ...state };
  }
};

export default userReducer;
