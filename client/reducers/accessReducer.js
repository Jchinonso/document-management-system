import { LOGIN_SUCCESS, LOGOUT, CLIENT_LOGIN } from '../actions/types';
import initialState from './initialState';

export default function access(state = initialState.access, action) {
  switch (action.type) {
  case LOGIN_SUCCESS:
  case CLIENT_LOGIN:
    return {
      loggedIn: true,
      user: action.user
    };

  case LOGOUT:
    return initialState.access;

  default:
    return state;
  }
}
