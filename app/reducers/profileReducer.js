import {
  PROFILE_FETCHED,
  PROFILE_NOT_FOUND,
  USER_FOLLOWED,
  USER_UNFOLLOWED
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
    case USER_FOLLOWED:
      return {
        ...state,
        userProfile: { following: action.userToFollow }
      };
    case USER_UNFOLLOWED:
      return {
        ...state,
        userProfile: { following: action.userToUnfollow }
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
