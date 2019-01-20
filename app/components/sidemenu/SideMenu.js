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
  {icon: 'bank', text: 'Board', screen: 'Home'},
  {icon: 'sort-alpha-desc', text: 'Dating', screen: 'Dating'},
  {icon: 'money', text: 'Raves', screen: 'Rave'},
  {icon: 'comment-o', text: 'Bulletin', screen: 'Bulletin'},
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
      selectedItem: item,
    });

  render() {
    const {
        navigation,
        onToggleMenu
    } = this.props

    return (
        <ScrollView style={styles.container}>
            <View style={styles.menu}>
              {
                menuChoices.map((item)=> {
                  return (
                    <MenuRow
                      key={item.screen}
                      icon={item.icon}
                      text={item.text}
                      screen={item.screen}
                      navigation={navigation}
                      />
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
        width : width * 0.5,
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

