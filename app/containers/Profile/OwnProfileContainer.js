import { connect } from 'react-redux'
import { facebookLogin, testLogin } from 'actions/login/index';
import OwnProfileScreen from 'screens/Login/OwnProfileScreen';

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.login.facebookUser
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
}

const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OwnProfileScreen)

export default ProfileContainer