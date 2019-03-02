import {
  POSTS_FETCH
} from 'app/actions/posts/index';

const initialState = {
  dating: [],
  selfies: [],
  bulletin: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case POSTS_FETCH:
      const type = action.postType
      return {
        ...state,
        [type]: action.posts,
      };
    default:
      return state;
  }
}
