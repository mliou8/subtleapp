import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import LoginPage from 'containers/Login/LandingPageContainer';

const LoginNavigator = createStackNavigator(
    {
        LoginPage: LoginPage,
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
