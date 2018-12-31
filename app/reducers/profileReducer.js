import {
  PROFILE_FETCHED,
  PROFILE_NOT_FOUND,
  PROFILE_ADD_FOLLOWER,
  PROFILE_REMOVE_FOLLOWER,
  PROFILE_UPDATED
} from 'actions/profile/index';

const initialState = {
  userProfile: { followers: [], following: [] },
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
        userProfile: action.profileInfo
      };
    case PROFILE_REMOVE_FOLLOWER:
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          followers: [state.userProfile.followers, action.userToUnfollowID]
        }
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
