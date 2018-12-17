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
        },
        swipeEnabled: false,
        lazy: true,
    },
);

export default createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: LoginNavigator,
});
