import {
  FACEBOOK_LOGIN_SUCCESS,
  AUTH_SUCCESS,
  AUTH_FAIL,
  LOGOUT_SUCCESS
} from "actions/login/index";

const initialState = {
  authenticated: false,
  facebookUser: {},
  errorMsg: ""
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
    default:
      return state;
  }
}
