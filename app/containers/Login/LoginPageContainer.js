import { connect } from 'react-redux';
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

const LoginPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage)

export default LoginPageContainer
