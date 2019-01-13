import {
  USER_MESSAGES_FETCHED,
  USER_CONVERSATION_FETCHED,
  //   USER_MESSAGE_SENT,
  //   USER_MESSAGE_DELETED,
  USER_CONVERSATION_N0T_FOUND,
  CONVERSATION_UPDATED
} from 'actions/messages/index';

const initialState = {
  currentMessages: {},
  currentConversation: {},
  errorMsg: '',
  fetched: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_MESSAGES_FETCHED:
      return {
        ...state,
        currentMessages: action.userMsgs
      };
    case USER_CONVERSATION_FETCHED:
      return {
        ...state,
        currentConversation: action.userConversation,
        fetched: true
      };
    // case USER_MESSAGE_SENT:
    //   return {
    //     ...state,
    //     userProfile: { ...state.userProfile, followers: action.newMessage }
    //   };
    // case USER_MESSAGE_DELETED:
    //   return {
    //     ...state,
    //     currentConversation: {
    //       ...state.currentConversation,
    //       followers: [state.userProfile.followers, action.userToUnfollowID]
    //     }
    //   };
    case CONVERSATION_UPDATED:
      return {
        ...state,
        currentConversation: action.updatedConversation
      };
    case USER_CONVERSATION_N0T_FOUND:
      return {
        ...state,
        errorMsg: action.errorMsg
      };
    default:
      return state;
  }
}
