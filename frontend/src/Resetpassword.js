import React, { useEffect, useState } from "react";
import "./Signin.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { sendEmailForResetPassword, signin } from "./redux/actions/userActions";
import Errormsg from "./Errormsg";
import Button from "@material-ui/core/Button";
import BounceLoader from "react-spinners/BounceLoader";
import { color } from "./utils";
import _ from "lodash";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Passwordform from "./Passwordform";

function Resetpassword() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const SendResetPassword = useSelector((state) => state.SendResetPassword);
  const { resetPassword, loading } = SendResetPassword;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(sendEmailForResetPassword(email));
  };

  return (
    <>
      <div className="signin">
        {resetPassword ? (
          <Passwordform email={email} />
        ) : (
          <form className="form" onSubmit={submitHandler}>
            <h2>Reset Password</h2>
            <div>
              <label htmlFor="email">Email</label>
              <div className="inputfielddiv">
                <input
                  className="inputfield"
                  type="email"
                  id="email"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                ></input>
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
            <section className="signin__footer">
              <div className="signin__footer__left">
                <span>New Customer?</span>{" "}
                <Link to={`/register`} className="link link__pink">
                  Create your account
                </Link>
              </div>
            </section>
          </form>
        )}
      </div>
    </>
  );
}

export default Resetpassword;
