const initialState = {
  user: {},
  token: null,
  login_error: null,
  register_error: null,
  isLogin: false,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isLogin: true,
      };
    case "ERROR_LOGIN":
      return {
        ...state,
        login_error: action.payload.error,
        isLogin: false,
      };

    case "USER_LOGOUT":
      return {
        ...state,
        user: {},
        token: null,
        login_error: null,
        isLogin: false,
      };
    case "USER_REGISTER":
      return {
        ...state,
      };
    case "ERROR_REGISTER":
      return {
        ...state,
        register_error: action.payload.register_error,
      };

    case "CLEAR_ERROR":
      return {
        ...state,
        login_error: null,
        register_error: null,
      };
    default:
      return { ...state };
  }
};

export default loginReducer;
