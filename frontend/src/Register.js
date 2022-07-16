import React, { useEffect, useState } from "react";
import "./Register.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { register } from "./redux/actions/userActions";
import Loadingmsg from "./Loadingmsg";
import Errormsg from "./Errormsg";
import Button from "@material-ui/core/Button";
import { FiEye, FiEyeOff } from "react-icons/fi";

function Register() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const UserRegister = useSelector((state) => state.UserRegister);
  const { userInfo, loading, error } = UserRegister;

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords doesn't match");
    } else {
      dispatch(register(name, email, password));
    }
  };

  const handleClickShowPassword = (e) => {
    setShowPassword(!showPassword);
  };

  const handleClickConfirmShowPassword = (e) => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, redirect, history]);

  return (
    <div className="signin">
      <>
        <form className="form" onSubmit={submitHandler}>
          <h2>Create Account</h2>
          {loading && <Loadingmsg />}
          {error && <Errormsg>{error}</Errormsg>}
          <div>
            <label htmlFor="name">Name</label>
            <div className="inputfielddiv">
              <input
                className="inputfield"
                type="text"
                id="name"
                placeholder="Enter name"
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <div className="inputfielddiv">
              <input
                className="inputfield"
                type="email"
                id="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <div className="inputfielddiv">
              <input
                className="inputfield"
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
              <span className="p-viewer">
                {showPassword ? (
                  <FiEye onClick={handleClickShowPassword} />
                ) : (
                  <FiEyeOff onClick={handleClickShowPassword} />
                )}
              </span>
            </div>
          </div>
          <div>
            <label htmlFor="confirmpassword">Confirm Password</label>
            <div className="inputfielddiv">
              <input
                className="inputfield"
                type={showConfirmPassword ? "text" : "password"}
                id="confirmpassword"
                placeholder="Enter password again"
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></input>
              <span className="p-viewer">
                {showConfirmPassword ? (
                  <FiEye onClick={handleClickConfirmShowPassword} />
                ) : (
                  <FiEyeOff onClick={handleClickConfirmShowPassword} />
                )}
              </span>
            </div>
          </div>
          <div className="pink__button">
            <Button variant="contained" type="submit">
              Continue
            </Button>
          </div>

          <div className="signin__footer">
            <span>Already have an account?</span>{" "}
            <Link
              to={`/signin?redirect=${redirect}`}
              className="link link__pink"
            >
              Login
            </Link>
          </div>
        </form>
      </>
    </div>
  );
}

export default Register;
