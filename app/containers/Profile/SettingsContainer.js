import { connect } from 'react-redux';
import SettingsScreen from 'screens/Profile/subscreens/SettingsScreen';
import { addNetwork, removeNetwork, userLogout } from 'actions/login/index';

const mapStateToProps = (state, ownProps) => {
  return {
    userInfo: state.login.userInfo
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addNetwork: (networkObj, userInfo) => {
      dispatch(addNetwork(networkObj, userInfo));
    },
    removeNetwork: (networkObj, userInfo) => {
      dispatch(removeNetwork(networkObj, userInfo));
    },
    logOut: () => {
      dispatch(userLogout());
    }
  };
};

const SettingsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsScreen);

export default SettingsContainer;
