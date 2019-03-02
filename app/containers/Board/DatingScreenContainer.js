import { connect } from 'react-redux'
import DatingScreen from 'screens/Dating/DatingScreen';
import { fetchPosts } from 'app/actions/posts/index';

const mapStateToProps = (state, ownProps) => {
  return {
    posts: state.posts.dating
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchPosts: (postType) => {
      dispatch(fetchPosts(postType));
    },
  }
}

const DatingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DatingScreen)

export default DatingContainer
