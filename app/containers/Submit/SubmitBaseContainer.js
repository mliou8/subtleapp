import { connect } from 'react-redux';
import SubmitBase from '../../screens/Submit/SubmitBase';

const mapStateToProps = (state, ownProps) => {
  return {
    userInfo: state.login.userInfo,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubmitBase);
