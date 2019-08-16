import {
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_OUT_SUCCESS,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN_ERROR:
      console.log('login error');
      return {
        ...state,
        authError: 'Login failed'
      };
    case SIGN_IN_SUCCESS:
      console.log('login success');
      return {
        ...state, authError: null
      };
    case SIGN_OUT_SUCCESS:
      console.log('sign out success');
      return state;
    case SIGN_UP_SUCCESS:
      console.log('signup success');
      return {
        ...state, authError: null
      };
    case SIGN_UP_ERROR:
      console.log('signup error');
      return {
        ...state,
        authError: action.err.message
      };

    default:
      return state;
  }
};
