import { connect } from 'react-redux';
import SubmitBase from '../../screens/Submit/SubmitBase';

const mapStateToProps = (state, ownProps) => {
  return {
    ...state,
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
