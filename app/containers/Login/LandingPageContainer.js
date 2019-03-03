import { connect } from 'react-redux'
import { facebookLogin, checkCode } from 'actions/login/index';
import LoginPage from 'screens/Login/LoginPage';


const mapStateToProps = (state, ownProps) => {
  return {
    authenticated: state.login.authenticated
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    
  };
};

const LandingPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage)

export default LandingPageContainer