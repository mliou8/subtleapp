import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import LoginPage from 'containers/Login/LandingPageContainer';
import InviteCodePage from 'containers/Login/InviteCodePageContainer';


const LoginNavigator = createStackNavigator(
    {
        LoginPage: LoginPage,
        InviteCodePage: InviteCodePage,
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
