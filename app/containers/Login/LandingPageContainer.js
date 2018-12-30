import { connect } from 'react-redux'
import { facebookLogin, testLogin } from 'actions/login/index';
import LandingPage from 'screens/Login/LandingPage';


const mapStateToProps = (state, ownProps) => {
  return {
    authenticated: state.login.authenticated,
    userRegistered: state.login.userRegistered,
    userInfo: state.login.userInfo,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    facebookLogin: () => {
      dispatch(facebookLogin());
    },
    createUserProfile: userInfo => {
      dispatch(createUserProfile(userInfo));
    },
    fetchUserInfo: uid => {
      dispatch(fetchUserInfo(uid));
    }
  };
};

const LandingPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage)

export default LandingPageContainer