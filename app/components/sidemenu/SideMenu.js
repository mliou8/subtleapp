import React from 'react';
import {
  TouchableHighlight,
  View,
  ScrollView,
  Image,
  Platform,
  StyleSheet,
  Button,
  Dimensions,
  Text,
} from 'react-native';
import {
  RkStyleSheet,
  RkText,
  RkTheme,
} from 'react-native-ui-kitten';
import MenuOverlay from 'app/components/sidemenu/MenuOverlay';
import MenuRow from 'app/components/sidemenu/MenuRow';
import { Icon } from 'native-base';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height


const menuChoices = [
  {icon: 'bank', text:'BoardScreen'},
  {icon: 'sort-alpha-desc', text:'DatingScreen'},
  {icon: 'money', text:'RaveScreen'},
  {icon: 'comment-o', text:'BulletinScreen'},
];

export default class SideMenu extends React.Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: this.props.isOpen,
      selectedItem: 'About',
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }

  onMenuItemSelected = item =>
    this.setState({
      isOpen: false,
      selectedItem: item,
    });

  render() {
    const {
        navigation,
        onToggleMenu
    } = this.props

    return (
        <ScrollView style={styles.container}>
            <MenuOverlay
                onToggleMenu={onToggleMenu}
                navigation={navigation}
            />
            <View style={styles.menu}>
              {
                menuChoices.map((item)=> {
                  return (
                    <MenuRow icon={item.icon} text={item.text} />
                    )
                })
              }
            </View>
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position : 'absolute',
        left: 0,
        top: 0,
        width : width,
        height : height,
        paddingRight : 10,
        paddingBottom : 10,
        zIndex: 1,
    },
    menu: {
        flex: 1,
        backgroundColor: '#FFF',
        position : 'absolute',
        left: 0,
        top: 0,
        width : width * 0.65,
        height : height,
        paddingTop : 10,
        paddingLeft : 10,
        paddingRight : 10,
        paddingBottom : 10,
    },
    menuItem : {
        paddingTop : 10
    }
});

