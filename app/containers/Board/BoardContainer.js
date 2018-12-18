import { connect } from 'react-redux'
import BoardScreen from 'screens/Board/BoardScreen';

const mapStateToProps = (state, ownProps) => {
  return {
    authenticated: state.login.authenticated
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