import {
  PROFILE_FETCHED,
  PROFILE_NOT_FOUND,
  PROFILE_UPDATED
} from 'actions/profile/index';

const initialState = {
  userProfile: {},
  errorMsg: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROFILE_FETCHED:
      return {
        ...state,
        userProfile: action.userProfile,
        userRegistered: true
      };
    case PROFILE_UPDATED:
      return {
        ...state,
        userProfile: action.updatedProfileInfo
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
