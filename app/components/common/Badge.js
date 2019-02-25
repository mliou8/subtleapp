import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import socialImages from 'assets/images/social/exports.js';
import { WebBrowser } from 'expo';

import { Button, Icon, Text } from 'native-base';

export default class Badge extends React.Component {
  constructor(props) {
    super(props);
    this.badgeTypePicker = this.badgeTypePicker.bind(this);
    this._handleBadgePress = this._handleBadgePress.bind(this);
  }
  _handleBadgePress = (source, sourceUrl) => {
    if (source === 'twitch') {
      return WebBrowser.openBrowserAsync(`https://www.twitch.tv/${sourceUrl}/`);
    } else {
      return WebBrowser.openBrowserAsync(
        `https://www.${source}.com/${sourceUrl}/`
      );
    }
  };

  badgeTypePicker = (source, sourceUrl, count) => {
    return (
      <Button
        iconLeft
        light
        style={styles.badgeButton}
        onPress={() => {
          this._handleBadgePress(source, sourceUrl);
        }}
      >
        <Icon
          type="FontAwesome"
          name={source.toLowerCase()}
          style={styles.badgeIcon}
        >
          <Text style={styles.badgeButtonText}> {sourceUrl}</Text>
          {/* <Text style={styles.badgeButtonText}>{count}</Text> */}
        </Icon>
      </Button>
    );
  };

  render() {
    const badgeType = this.props.badgeType;
    return (
      <View>
        {this.badgeTypePicker(
          badgeType,
          this.props.sourceName,
          this.props.count
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  badgeButton: {
    marginTop: 2,
    paddingLeft: 0,
    paddingRight: 3,
    paddingBottom: 3,
    backgroundColor: '#242424'
    // borderRightWidth: 3,
    // borderRightColor: 'white'
  },
  badgeIcon: {
    marginLeft: 3,
    paddingLeft: 3,
    paddingBottom: 3,
    color: 'white'
  },
  badgeButtonText: {
    fontFamily: 'poppins',
    color: 'white',
    fontSize: 15,
    paddingLeft: 10
  }
});
