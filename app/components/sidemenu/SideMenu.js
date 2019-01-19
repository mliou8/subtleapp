import React from 'react';
import {
  TouchableHighlight,
  View,
  ScrollView,
  Image,
  Platform,
  StyleSheet,
  Button,
} from 'react-native';
import {
  RkStyleSheet,
  RkText,
  RkTheme,
} from 'react-native-ui-kitten';
import { Icon } from 'native-base';

const menuChoices = ['BoardScreen', 'DatingScreen', 'RaveScreen', 'BulletinScreen'];

export default class SideMenu extends React.Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false,
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

  //This will go to that page.

  onMenuItemSelected = item =>
    this.setState({
      isOpen: false,
      selectedItem: item,
    });

  renderMenu = () => {
    return menuChoices.map(item => {
      return (
        <TouchableHighlight
          style={styles.container}
          key={item}
          underlayColor={RkTheme.current.colors.button.underlay}
          activeOpacity={1}
          onPress={() => this.onMenuItemPressed(item)}>
          <View style={styles.content}>
            <View style={styles.content}>
              <RkText
                style={styles.icon}
                rkType='moon primary xlarge'>{icon}
              </RkText>
              <RkText>{item}</RkText>
            </View>
            <RkText rkType='awesome secondaryColor small'>
              <Icon
                type="FontAwesome"
                name="angle-right"
                />
            </RkText>
          </View>
      </TouchableHighlight>
      )
    })
  }

  render = () => (
    <SideMenu
      style={styles.root}
      isOpen={this.state.isOpen}
      onChange={isOpen => this.updateMenuState(isOpen)}
      >
      <ScrollView
        showsVerticalScrollIndicator={false}>
        <View style={[styles.container, styles.content]}>
          <RkText rkType='logo'>UI Kitten</RkText>
        </View>
      {/*this is rendering the menus options*/}
        {this.renderMenu()}
      </ScrollView>
    </SideMenu>
  )
}

const styles = RkStyleSheet.create(theme => ({
  container: {
    height: 80,
    paddingHorizontal: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border.base,
  },
  root: {
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    backgroundColor: theme.colors.screen.base,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 13,
  },
}));
