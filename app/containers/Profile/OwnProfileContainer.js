import { connect } from 'react-redux'
import { facebookLogin, testLogin } from 'actions/login/index';
import OwnProfileScreen from 'screens/Profile/OwnProfileScreen';

const mapStateToProps = (state, ownProps) => {
  return {
    authenticated: state.login.authenticated,
    userInfo: state.login.userInfo,
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    
  };
}

const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OwnProfileScreen)

export default ProfileContainer