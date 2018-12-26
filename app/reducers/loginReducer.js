import {
  FACEBOOK_LOGIN_SUCCESS,
  AUTH_SUCCESS,
  AUTH_FAIL,
  LOGOUT_SUCCESS,
  USER_PROFILE_CREATED,
  CREATE_PROFILE_ERROR
} from 'actions/login/index';

const initialState = {
  authenticated: false,
  facebookUser: {},
  userProfile: {},
  errorMsg: '',
  userRegistered: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FACEBOOK_LOGIN_SUCCESS:
      return {
        ...state,
        facebookUser: action.facebookUser,
        authenticated: true
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        authenticated: true
      };
    case AUTH_FAIL:
      return {
        ...state,
        authenticated: false,
        errorMsg: action.errorMsg
      };
    case USER_PROFILE_CREATED:
      return {
        ...state,
        userRegistered: true,
        userProfile: action.userProfile
      };
    case CREATE_PROFILE_ERROR:
      return {
        ...state,
        userRegistered: false,
        errorMsg: action.errorMsg
      };
    default:
      return state;
  }
}
