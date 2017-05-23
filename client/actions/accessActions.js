import axios from 'axios';
import jwt from 'jsonwebtoken';
import * as types from './types';
import setHeaderToken from '../utilities/setHeaderToken';
import { getDocuments } from './documentActions';
import { beginAjaxCall } from './ajaxStatusActions';
import { throwError } from '../utilities/errorHandler';

/**
* Dispatch action to login a user via the client
* @param {String} token
* @returns {Object} dispatch object
*/
export function clientLogin(token) {
  setHeaderToken(token);
  return {
    type: types.CLIENT_LOGIN,
    user: jwt.decode(token)
  };
}
/**
* Dispatch action to login a user
* @param {Object} userDetails
* @returns {Object} dispatch object
*/
export function login(userDetails) {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return axios.post('/users/login', userDetails)
      .then((res) => {
        const token = res.data.token;
        localStorage.setItem('jwToken', token);
        setHeaderToken(token);
        dispatch({
          type: types.LOGIN_SUCCESS,
          user: jwt.decode(token)
        });
      });
  };
}
/**
* Dispatch action to register or update a user
* @param {Object} userDetails
* @returns {Object} dispatch object
*/
export function signup(userDetails) {
  if (userDetails.id) {
    return (dispatch) => {
      dispatch(beginAjaxCall());
      return axios.put(`/users/${userDetails.id}`, userDetails)
        .then(() => {
          dispatch({
            type: types.PROFILE_UPDATE_SUCCESS
          });
        })
        .catch(error => throwError(error, dispatch));
    };
  }
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return axios.post('/users', userDetails)
      .then((res) => {
        const token = res.data.token;
        localStorage.setItem('jwToken', token);
        setHeaderToken(token);
        dispatch({
          type: types.LOGIN_SUCCESS,
          user: jwt.decode(token)
        });
      })
      .catch(error => throwError(error, dispatch));
  };
}

/**
* Dispatch action to logout a user
* @returns {Object} dispatch object
*/
export function logout() {
  return (dispatch) => {
    localStorage.removeItem('jwToken');
    setHeaderToken(null);
    dispatch({ type: types.LOGOUT });
    dispatch(getDocuments());
  };
}
