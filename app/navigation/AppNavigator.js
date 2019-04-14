import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import LoginPage from 'containers/Login/LoginPageContainer';
import InviteCodePage from 'containers/Login/InviteCodePageContainer';
import EULA from 'app/screens/Login/EULA';


const LoginNavigator = createStackNavigator(
    {
        LoginPage: LoginPage,
        InviteCodePage: InviteCodePage,
        EULAPage: EULA,
        MainScreen: { screen: MainTabNavigator },
    },
    {
        navigationOptions: {
            tabBarVisible: false,
            headerStyle: { display: 'none' },
            gesturesEnabled: false,
        },
        swipeEnabled: false,
        lazy: true,
    },
);

export default createSwitchNavigator({
    Main: LoginNavigator,
});
