import { createDrawerNavigator } from 'react-navigation';
import RaveScreen from "app/screens/Board/RaveScreen";
import BulletinScreen from "app/screens/Board/BulletinScreen";
import DatingScreen from "app/screens/Board/DatingScreen";
import BoardScreen from "app/screens/Board/BoardScreen";
import SideMenu from "app/components/sidemenu/SideMenu";


const DrawerNavigator = createDrawerNavigator(
  {
    Home: BoardScreen,
    Rave: RaveScreen,
  	Bulletin: BulletinScreen,
  	Dating: DatingScreen,
  },
  {
    initialRouteName: "Home",
    drawerPosition: "left",
    contentComponent: SideMenu,
  }
);

export default DrawerNavigator;