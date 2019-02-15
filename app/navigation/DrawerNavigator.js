import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import RaveScreen from 'app/screens/Board/RaveScreen';
import BulletinScreen from 'app/screens/Board/BulletinScreen';
import { BoardScreen, BoardNavOptions } from 'app/screens/Board/BoardScreen';
import DatingScreen from 'app/screens/Dating/DatingScreen';
import DatingFullScreen from 'app/screens/Dating/DatingFullScreen';
import MainTabNavigator from './MainTabNavigator';
import SideMenu from 'app/components/sidemenu/SideMenu';
import SelfiesScreen from '../screens/Selfies/SelfiesScreen';

const DatingStack = createStackNavigator({
  Dating: DatingScreen,
  DatingFullScreen: DatingFullScreen
});

//originally I wasnt sure if tehre would be nav from this location or not
//like a fullscreen view of selfie or something
//or selfies near you?
//it can just be thrown in drawer nav if there wont be.
const SelfieStack = createStackNavigator({
  SelfiesScreen: SelfiesScreen
});

const DrawerNavigator = createDrawerNavigator(
  {
    Home: BoardScreen,
    Rave: RaveScreen,
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
