import {
  PROFILE_FETCHED,
  PROFILE_NOT_FOUND,
  PROFILE_ADD_FOLLOWER,
  PROFILE_REMOVE_FOLLOWER
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
    case PROFILE_ADD_FOLLOWER:
      return {
        ...state,
        userProfile: { ...state.userProfile, followers: action.userToFollowID }
      };
    case PROFILE_REMOVE_FOLLOWER:
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          followers: state.userProfile.followers.filter(item => {
            if (item.uid !== action.userToUnfollowID) {
              return item;
            }
          })
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
