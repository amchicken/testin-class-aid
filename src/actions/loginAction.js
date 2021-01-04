import axios from "axios";
import { loginURL, signupURL } from "../api";
import { Redirect } from "react-router";
//IMPORT DECODE JWT
import jwtDecode from "jwt-decode";

export const Login = (email, password) => async (dispatch) => {
  await axios
    .post(loginURL(), { email, password })
    .then((res) => {
      const decoded = jwtDecode(res.data);
      dispatch({
        type: "USER_LOGIN",
        payload: {
          user: decoded,
          token: res.data,
        },
      });
      //SET LOCALSTORAGE
      localStorage.setItem("token", res.data);
      localStorage.setItem("user", JSON.stringify(decoded));
    })
    .catch(({ response }) => {
      // console.log(response.data);
      dispatch({
        type: "ERROR_LOGIN",
        payload: {
          error: response.data,
        },
      });
    });
};

export const RefreshLogin = () => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  dispatch({
    type: "USER_LOGIN",
    payload: {
      user: user,
      token: token,
      isLogin: true,
    },
  });
};

export const Register = (name, email, password) => async (dispatch) => {
  await axios
    .post(signupURL(), { name, email, password })
    .then((res) => {
      return true;
    })
    .catch((err) => {
      dispatch({
        type: "ERROR_REGISTER",
        payload: {
          register_error: err.response.data,
        },
      });
      return false;
    });
};

export const Logout = () => async (dispatch) => {
  localStorage.clear();
  dispatch({
    type: "USER_LOGOUT",
  });
};

export const ClearError = () => async (dispatch) => {
  dispatch({
    type: "CLEAR_ERROR",
  });
};
