import { connect } from 'react-redux'
import { facebookLogin, checkCode } from 'actions/login/index';
import LoginPage from 'screens/Login/LoginPage';


const mapStateToProps = (state, ownProps) => {
  return {
    ready : state.login.ready,
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
)(LoginPage)

export default LandingPageContainer