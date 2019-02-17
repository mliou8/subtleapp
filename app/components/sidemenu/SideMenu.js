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
  Text
} from 'react-native';
import { RkStyleSheet, RkText, RkTheme } from 'react-native-ui-kitten';
import MenuOverlay from 'app/components/sidemenu/MenuOverlay';
import MenuRow from 'app/components/sidemenu/MenuRow';
import { Icon } from 'native-base';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const menuChoices = [
  { icon: 'comment-o', text: 'Home', screen: 'Home' },
  { icon: 'sort-alpha-desc', text: 'Dating', screen: 'Dating' },
  { icon: 'photo', text: 'Selfies', screen: 'Selfies' }
];

export default class SideMenu extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: this.props.isOpen,
      selectedItem: 'About'
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }

  onMenuItemSelected = item =>
    this.setState({
      selectedItem: item
    });

  render() {
    const { navigation, onToggleMenu } = this.props;

    return (
      <View style={styles.menu}>
        {menuChoices.map(item => {
          return (
            <MenuRow
              key={item.screen}
              icon={item.icon}
              text={item.text}
              screen={item.screen}
              navigation={navigation}
            />
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: width,
    height: height,
    paddingRight: 10,
    paddingBottom: 10
  },
  menu: {
    flex: 1,
    backgroundColor: '#242424',
    position: 'absolute',
    left: 0,
    top: 0,
    width: width * 0.5,
    height: height,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10
  },
  menuItem: {
    paddingTop: 10
  }
});
