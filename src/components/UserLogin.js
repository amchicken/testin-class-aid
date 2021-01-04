import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { Login, Logout, ClearError } from "../actions/loginAction";

const UserLogin = () => {
  //SETUP
  const dispatch = useDispatch();
  let email = useRef(null);
  let password = useRef(null);
  const { isLogin, login_error } = useSelector((state) => state.login);

  //CLEAR EROR WHEN RE-RENDER
  useEffect(() => {
    dispatch(ClearError());
  }, [dispatch]);

  //EVENT HANDLE
  const loginHandle = (e) => {
    e.preventDefault();
    const loginEmail = email.current.value;
    const loginPassword = password.current.value;
    dispatch(Login(loginEmail, loginPassword));
  };
  const logoutHandle = (e) => {
    e.preventDefault();
    dispatch(Logout());
  };

  return (
    <div className="UserLogin">
      {isLogin ? (
        <button onClick={logoutHandle}>LOGOUT</button>
      ) : (
        <div className="login-container">
          <form className="wrap">
            <div>
              <h1>Login</h1>
            </div>
            {login_error && <div className="error">{login_error}</div>}
            <div>
              <p>Email</p>
              <input ref={email} type="text" required />
            </div>
            <div>
              <p>Password</p>
              <input ref={password} type="password" required />
            </div>
            <div className="login-button-group">
              <button onClick={loginHandle}>Login</button>
              <div>
                <p>Not a member? </p>
                <Link to="/signup">Signup</Link>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserLogin;
