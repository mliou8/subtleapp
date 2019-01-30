import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import RaveScreen from "app/screens/Board/RaveScreen";
import BulletinScreen from "app/screens/Board/BulletinScreen";
import { BoardScreen, BoardNavOptions } from "app/screens/Board/BoardScreen";
import DatingScreen from "app/screens/Dating/DatingScreen";
import DatingFullScreen from "app/screens/Dating/DatingFullScreen";
import MainTabNavigator from "./MainTabNavigator";
import SideMenu from "app/components/sidemenu/SideMenu";

const DatingStack = createStackNavigator({
  Dating: DatingScreen,
  DatingFullScreen: DatingFullScreen,
});

const DrawerNavigator = createDrawerNavigator(
  {
    Home: BoardScreen,
    Rave: RaveScreen,
  	Bulletin: BulletinScreen,
  	Dating: {screen: DatingStack},
  },
  {
    initialRouteName: "Home",
    drawerPosition: "left",
    contentComponent: SideMenu,
  }
);


export default DrawerNavigator;
