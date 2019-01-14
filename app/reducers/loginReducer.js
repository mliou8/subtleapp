import {
  FACEBOOK_LOGIN_SUCCESS,
  AUTH_SUCCESS,
  AUTH_FAIL,
  LOGOUT_SUCCESS,
  USER_PROFILE_CREATED,
  CREATE_PROFILE_ERROR,
  USER_INFO_FETCHED,
  USER_INFO_NOT_FOUND,
  USER_UPDATED,
  EDIT_USER_FAIL,
  OPEN_MODAL,
  CLOSE_MODAL,
  INVITE_ERROR,
} from 'actions/login/index';

const initialState = {
  authenticated: false,
  userInfo: {},
  errorMsg: '',
  modalOpen: false,
  inviteError: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
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
      };
    case CREATE_PROFILE_ERROR:
      return {
        ...state,
        errorMsg: action.errorMsg
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        authenticated: false,
        userInfo: {},
      };
    case USER_INFO_FETCHED:
      return {
        ...state,
        userInfo: action.userProfile,
      };
    case USER_INFO_NOT_FOUND:
      return {
        ...state,
        errorMsg: action.errorMsg
      };
    case USER_UPDATED:
      return {
        ...state,
        userInfo: action.userInfo
      };
    case OPEN_MODAL:
      return {
        ...state,
        modalOpen: true
      }
    case CLOSE_MODAL:
      return {
        ...state,
        modalOpen: false
      }
    case INVITE_ERROR:
      return {
        ...state,
        inviteError: true
      }
    case EDIT_USER_FAIL:
      return { 
        ...state,
        errorMsg: '',
      };
    default:
      return state;
  }
}
