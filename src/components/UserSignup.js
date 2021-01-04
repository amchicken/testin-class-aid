import React, { useRef, useState } from "react";
import { Link, Redirect } from "react-router-dom";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { ClearError, Register } from "../actions/loginAction";

const Signup = () => {
  const dispatch = useDispatch();
  const { register_error } = useSelector((state) => state.login);

  const refEmail = useRef();
  const refPassword = useRef();
  const refName = useRef();
  const [register, setRegister] = useState(null);

  const signupHandle = (e) => {
    e.preventDefault();
    const registerEmail = refEmail.current.value;
    const registerPassword = refPassword.current.value;
    const registerName = refName.current.value;
    const success = dispatch(
      Register(registerName, registerEmail, registerPassword)
    );
    if (success) setRegister("SUCCESS");
  };

  console.log(`component ${register_error}`);
  return (
    <div className="login-container">
      <form className="wrap">
        <div>
          <h1>SignUp</h1>
          {register && <Redirect to="/login" />}
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
        <div className="login-button-group">
          <button type="submit" onClick={signupHandle}>
            Sign up
          </button>
          <div>
            <p>Already member? </p>
            <Link to="/login">login</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
