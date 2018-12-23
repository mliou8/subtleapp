import {
  USER_PROFILE_CREATED,
  CREATE_PROFILE_ERROR,
  PROFILE_FETCHED,
  PROFILE_NOT_FOUND
} from "actions/profile/index";

const initialState = {
  userProfile: {},
  errorMsg: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROFILE_FETCHED:
      return {
        ...state,
        userProfile: action.userProfile,
        userRegistered: true
      };
    case CREATE_PROFILE_ERROR:
      return {
        ...state,
        userRegistered: false,
        errorMsg: action.errorMsg
      };
    case PROFILE_NOT_FOUND:
      return {
        ...state,
        userRegistered: false,
        errorMsg: action.errorMsg
      };
    default:
      return state;
  }
}
