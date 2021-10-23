import React, { useEffect } from 'react';
import './Signin.css'
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from './redux/actions/userActions';
import Errormsg from './Errormsg'
import Loadingmsg from './Loadingmsg'
import { useState } from 'react';
import { USER_UPDATE_PROFILE_RESET } from './redux/constants/userConstants';
import Button from '@material-ui/core/Button';

export default function Myprofile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const userSignin = useSelector((state) => state.UserSignin);
  const { userInfo } = userSignin;

  const userDetails = useSelector((state) => state.UserDetails);
  const { loading, error, user } = userDetails;

  const userUpdateProfile = useSelector((state) => state.UserUpdateProfile);
  const {success: successUpdate, error: errorUpdate, loading: loadingUpdate} = userUpdateProfile;

  const dispatch = useDispatch();

  useEffect(() => {
     if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, userInfo._id, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update profile
    if (password !== confirmPassword) {
        alert('Password and Confirm Password Are Not Matched');
      } else {
        dispatch(updateUserProfile({ userId: user._id, name, email, password }));
      }
  };
  return (
    <div className="signin">
      <form className="form" onSubmit={submitHandler}>
        <h2>User Profile</h2>
        {loading ? (
        <Loadingmsg/>
      ) : error ? (
        <Errormsg variant="danger">{error}</Errormsg>
      ) : (
          <>
            {loadingUpdate && <Loadingmsg/>}
            {errorUpdate && (
              <Errormsg variant="danger">{errorUpdate}</Errormsg>
            )}
            {successUpdate && (
              <Errormsg variant="danger">
                Profile Updated Successfully
              </Errormsg>
            )}
            <div>
              <label htmlFor="name">Name</label>
              <input
                className="inputfieldtext"
                id="name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                className="inputfieldtext"
                id="email"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                className="inputfieldtext"
                id="password"
                type="password"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="confirmPassword">confirm Password</label>
              <input
                className="inputfieldtext"
                id="confirmPassword"
                type="password"
                placeholder="Enter confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></input>
            </div>
            <div className="pink__button">
                <Button variant="contained" type="submit">Update</Button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

