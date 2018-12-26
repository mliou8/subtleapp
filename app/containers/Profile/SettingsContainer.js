import { connect } from 'react-redux'
import SettingsScreen from 'screens/Profile/subscreens/SettingsScreen';

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.login.facebookUser,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
}

const SettingsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsScreen)

export default SettingsContainer