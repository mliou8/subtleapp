import { connect } from 'react-redux'
import { facebookLogin, checkCode } from 'actions/login/index';
import LandingPage from 'screens/Login/LandingPage';


const mapStateToProps = (state, ownProps) => {
  return {
    authenticated: state.login.authenticated,
    userRegistered: state.login.userRegistered,
    userInfo: state.login.userInfo,
    modalOpen: state.login.modalOpen,
    inviteError: state.login.inviteError,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    facebookLogin: () => {
      dispatch(facebookLogin());
    },
    checkCode: (code) => {
      dispatch(checkCode(code));
    }
  };
};

const LandingPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage)

export default LandingPageContainer