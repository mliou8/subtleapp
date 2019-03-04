import { connect } from 'react-redux'
import InviteCodePage from 'screens/Login/InviteCodePage';


const mapStateToProps = (state, ownProps) => {
  return {
    authenticated: state.login.authenticated
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    
  };
};

const InviteCodePageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InviteCodePage)

export default InviteCodePageContainer