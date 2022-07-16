import React, { useEffect, useState } from "react";
import "./Signin.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Errormsg from "./Errormsg";
import Button from "@material-ui/core/Button";
import BounceLoader from "react-spinners/BounceLoader";
import { color } from "./utils";
import _ from "lodash";
import "react-toastify/dist/ReactToastify.css";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { resetPassword } from "./redux/actions/userActions";

function Passwordform({ email }) {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const ResetPassword = useSelector((state) => state.ResetPassword);
  const { resetPassword, loading } = ResetPassword;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(resetPassword(email, parseInt(otp), password));
  };

  const handleClickShowPassword = (e) => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="signin">
        <form className="form" autoComplete="off" onSubmit={submitHandler}>
          <h2>Reset Password</h2>
          <div>
            <label htmlFor="otp">Enter Code</label>
            <div className="inputfielddiv">
              <input
                className="inputfield"
                type="number"
                id="otp"
                placeholder="Enter Code"
                onChange={(e) => setOtp(e.target.value)}
                required
              ></input>
            </div>
          </div>
          <div>
            <label htmlFor="password">New Password</label>
            <div className="inputfielddiv">
              <input
                className="inputfield"
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
                required
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

          <div className="pink__button">
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </div>
          {loading && (
            <div className="loader__center">
              <BounceLoader color={color} loading={loading} size={60} />
            </div>
          )}
        </form>
      </div>
    </>
  );
}

export default Passwordform;
