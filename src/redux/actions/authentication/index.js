import { AUTH_MODES } from '../../../constants/common';
import { loggedIn } from '../../../helpers';
import * as types from './actionsTypes';
import Axios from 'axios';
import { failureError } from '../generic';
import { LOGIN_URL, REG_URL, LOGOUT_URL, USER_URL } from '../../../constants';


const getAuthURL = type => type === AUTH_MODES.LOGIN ? LOGIN_URL : REG_URL;

export const postAuthSuccess = payload => ({
  type: types.AUTH_REQUEST,
  payload
});
export const getUserSuccess = payload => ({
  type: types.USER_INFO,
  payload
});


export const authUser = (data, type) => async dispatch => {
  try {
    const res = await Axios.post(getAuthURL(type), data);
    dispatch(postAuthSuccess(res.data));
  } catch (err) {
    dispatch(failureError(err.message));
  }
};

export const logoutUser = () => async dispatch => {
  try {
    await Axios.get(LOGOUT_URL);
    localStorage.removeItem('token');
    dispatch(getUserSuccess({ username: '' }));
  } catch (err) {
    dispatch(failureError(err.message));
  }
};

export const userInfo = () => async dispatch => {
  try {
    const res = await Axios.post(USER_URL, { token: loggedIn });
    dispatch(getUserSuccess(res.data));
  } catch (err) {
    dispatch(failureError(err.message));
  }
};


export const sendLoginRequest = (data) => async (dispatch) => {
  await dispatch(authUser(data, AUTH_MODES.LOGIN));
};

export const sendRegisterRequest = (data) => async (dispatch) => {
  await dispatch(authUser(data, AUTH_MODES.REGISTER));
};

export const sendLogoutRequest = () => async (dispatch) => {
  await dispatch(logoutUser());
};

export const getUserInfo = () => async (dispatch) => {
  await dispatch(userInfo());
};
