import {
  EMAIL_RESETPASSWORD_FAIL,
  EMAIL_RESETPASSWORD_REQUEST,
  EMAIL_RESETPASSWORD_SUCCESS,
  RESETPASSWORD_FAIL,
  RESETPASSWORD_REQUEST,
  RESETPASSWORD_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_UPDATE_FAIL,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_SUCCESS,
} from "../constants/userConstants";
import axios from "axios";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../Config.js";

export const register = (name, email, password) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password } });
  console.log("####", API_BASE_URL + "api/users/register");
  try {
    const { data } = await axios.post(API_BASE_URL + "/api/users/register", {
      name,
      email,
      password,
    });
    console.log("%%%%", API_BASE_URL + "api/users/register");
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await axios.post(API_BASE_URL + "/api/users/signin", {
      email,
      password,
    });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailsUser = (userId) => async (dispatch, getState) => {
  dispatch({ type: USER_DETAILS_REQUEST, payload: userId });
  const {
    UserSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.get(API_BASE_URL + `/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_DETAILS_FAIL, payload: message });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: user });
  const {
    UserSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.put(
      API_BASE_URL + `/api/users/profile`,
      user,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: message });
  }
};

export const sendEmailForResetPassword = (email) => async (dispatch) => {
  dispatch({ type: EMAIL_RESETPASSWORD_REQUEST, payload: { email } });
  try {
    const { data } = await axios.post(
      API_BASE_URL + "/api/users/send-resetpassword-mail",
      {
        email,
      }
    );
    dispatch({ type: EMAIL_RESETPASSWORD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: EMAIL_RESETPASSWORD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const resetPassword = (email, otp, password) => async (dispatch) => {
  dispatch({ type: RESETPASSWORD_REQUEST, payload: { email } });
  try {
    const { data } = await axios.post(
      API_BASE_URL + "/api/users/reset-password",
      {
        email,
        otp,
        password,
      }
    );
    console.log("data :>> ", data);
    dispatch({ type: RESETPASSWORD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: RESETPASSWORD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartItems");
  dispatch({ type: USER_SIGNOUT });
  document.location.href = "/signin";
};

export const listUsers = () => async (dispatch, getState) => {
  dispatch({ type: USER_LIST_REQUEST });
  try {
    const {
      UserSignin: { userInfo },
    } = getState();
    const { data } = await axios.get(API_BASE_URL + "/api/users", {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_LIST_FAIL, payload: message });
  }
};

export const deleteUser = (userId) => async (dispatch, getState) => {
  dispatch({ type: USER_DELETE_REQUEST, payload: userId });
  const {
    UserSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.delete(API_BASE_URL + `/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: USER_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_DELETE_FAIL, payload: message });
  }
};

export const updateUser = (user) => async (dispatch, getState) => {
  dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: user });
  const {
    UserSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.put(
      API_BASE_URL + `/api/users/${user._id}`,
      user,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_UPDATE_FAIL, payload: message });
  }
};
