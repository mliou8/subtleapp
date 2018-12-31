import { connect } from 'react-redux'
import SettingsScreen from 'screens/Profile/subscreens/SettingsScreen';

const mapStateToProps = (state, ownProps) => {
  return {
    userInfo: state.login.userInfo
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    
  }
}

const SettingsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsScreen)

export default SettingsContainer