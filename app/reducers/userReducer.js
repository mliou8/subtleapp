import { EDIT_USER_SUCCESS, EDIT_USER_FAIL } from 'actions/login/index';

const initialState = {
  currentUser: {},
  errorMsg: '',
}

export default function(state = initialState, action) {
  switch (action.type) {
    case EDIT_USER_SUCCESS:
      return { 
        ...state,
        currentUser: action.currentUser,
      };
    case EDIT_USER_FAIL:
      return { 
        ...state,
        errorMsg: '',
      };
    default:
      return state;
  }
}

