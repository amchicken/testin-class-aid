import React, { useRef } from "react";
import { Link, Redirect } from "react-router-dom";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { Register } from "../actions/loginAction";

const Signup = () => {
  const dispatch = useDispatch();
  const { register_error } = useSelector((state) => state.login);

  const refEmail = useRef();
  const refPassword = useRef();
  const refName = useRef();
  const refAdmin = useRef();

  const adminCheck = () => {
    return Boolean(refAdmin.current.value === "true");
  };

  const signupHandle = async (e) => {
    e.preventDefault();
    const registerObject = {
      name: refName.current.value,
      email: refEmail.current.value,
      password: refPassword.current.value,
      is_admin: adminCheck(),
    };
    await dispatch(Register(registerObject));
  };

  return (
    <div className="login-container">
      <form className="wrap">
        <div>
          <h1>SignUp</h1>
          {register_error === "SUCCESS" ? <Redirect to="/login" /> : ""}
          {register_error && <div className="error">{register_error}</div>}
        </div>
        <div>
          <p>Name</p>
          <input ref={refName} type="text" required />
        </div>
        <div>
          <p>Email</p>
          <input ref={refEmail} type="text" required />
        </div>
        <div>
          <p>Password</p>
          <input ref={refPassword} type="password" required />
        </div>
        <div>
          <p>Role</p>
          <select ref={refAdmin}>
            <option value={false}>Student</option>
            <option value={true}>Teacher</option>
          </select>
        </div>
        <div className="login-button-group">
          <button type="submit" onClick={signupHandle}>
            Sign up
          </button>
          <div>
            <p>Already member? </p>
            <Link to="/login">Login</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
