import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
//REDUX
import { useDispatch, useSelector } from "react-redux";
import { RefreshLogin } from "./actions/loginAction";
//PAGE AND COMPONENT
import Home from "./pages/Home";
import UserLogin from "./components/UserLogin";
import UserSignup from "./components/UserSignup";
//CSS
import "./styles/app.scss";

const App = () => {
  const { isLogin } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      localStorage.getItem("token") !== null &&
      localStorage.getItem("user") !== null
    ) {
      dispatch(RefreshLogin());
    }
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Switch>
          {isLogin ? (
            <div>
              <Redirect to="/" />
              <Route path={["/", "/course/:name"]}>
                <Home />
              </Route>
            </div>
          ) : (
            <div>
              <Redirect to="/login" />
              <Route path={["/login", "/signup"]} exact>
                <Route path="/login" exact>
                  <UserLogin />
                </Route>
                <Route path="/signup" exact>
                  <UserSignup />
                </Route>
              </Route>
            </div>
          )}
        </Switch>
      </Router>
    </div>
  );
};

export default App;
