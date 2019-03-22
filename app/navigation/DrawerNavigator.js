import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import BulletinScreen from 'app/screens/Board/BulletinScreen';
import DatingScreen from 'app/containers/Dating/DatingScreenContainer';
import DatingFullScreen from 'app/screens/Dating/DatingFullScreen';
import MainTabNavigator from './MainTabNavigator';
import SideMenu from 'app/components/sidemenu/SideMenu';
import SelfiesScreen from '../screens/Selfies/SelfiesScreen';

const DatingStack = createStackNavigator({
  Dating: DatingScreen,
  DatingFullScreen: DatingFullScreen
});

const SelfieStack = createStackNavigator({
  Selfies: SelfiesScreen
});

const DrawerNavigator = createDrawerNavigator(
  {
    Home: BulletinScreen,
    Bulletin: BulletinScreen,
    Dating: { screen: DatingStack },
    Selfies: { screen: SelfiesScreen }
  },
  {
    initialRouteName: 'Home',
    drawerPosition: 'left',
    contentComponent: SideMenu,
    drawerBackgroundColor: '#242424'
  }
);

export default DrawerNavigator;
