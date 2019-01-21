import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import LandingPage from 'containers/Login/LandingPageContainer';

const LoginNavigator = createStackNavigator(
    {
        LandingPage: LandingPage,
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
