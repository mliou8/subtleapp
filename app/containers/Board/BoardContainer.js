import { connect } from 'react-redux'
import { facebookLogin } from 'actions/login/index';
import BoardScreen from 'screens/Board/BoardScreen';

const mapStateToProps = (state, ownProps) => {
  return {
    authenticated: state.authenticated
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  }
}

const BoardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardScreen)

export default BoardContainer