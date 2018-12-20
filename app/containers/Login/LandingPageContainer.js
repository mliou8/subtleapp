import { connect } from 'react-redux'
import { facebookLogin, testLogin } from 'actions/login/index';
import LandingPage from 'screens/Login/LandingPage';

const mapStateToProps = (state, ownProps) => {
  return {
    authenticated: state.authenticated
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    testLogin: () => {dispatch(testLogin)},
    facebookLogin: () => {dispatch(facebookLogin)},
  }
}

const LandingPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage)

export default LandingPageContainer