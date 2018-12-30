import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import socialImages from "assets/images/social/exports.js";
import { WebBrowser } from "expo";

import { Button, Icon } from "native-base";

export default class Badge extends React.Component {
  constructor(props) {
    super(props);
    this.badgeTypePicker = this.badgeTypePicker.bind(this);
    this._handleBadgePress = this._handleBadgePress.bind(this);
  }
  _handleBadgePress = (badgeType, sourceName) => {
    if (badgeType === "twitch") {
      return WebBrowser.openBrowserAsync(
        `https://www.twitch.tv/${sourceName}/`
      );
    } else {
      return WebBrowser.openBrowserAsync(
        `https://www.${badgeType}.com/${sourceName}/`
      );
    }
  };

  badgeTypePicker = (type, sourceName) => {
    return (
      <Button
        small
        iconLeft
        light
        style={{
          marginTop: 2,
          paddingLeft: 0,
          paddingRight: 3,
          paddingBottom: 3
        }}
        onPress={() => {
          this._handleBadgePress(type, sourceName);
        }}
      >
        <Icon
          type="FontAwesome"
          name={type}
          style={{
            marginLeft: 3,
            paddingLeft: 3,
            paddingBottom: 3
          }}
        />
        <Text> {sourceName} </Text>
      </Button>
    );
  };

  render() {
    const badgeType = this.props.badgeType;
    return (
      <View>{this.badgeTypePicker(badgeType, this.props.sourceName)}</View>
    );
  }
}

const styles = StyleSheet.create({
  badgeContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    borderRadius: 6,
    backgroundColor: "#F0F0F0",
    marginRight: 4,
    paddingRight: 5,
    alignContent: "center",
    height: "10%",
    width: "28%"
  },
  badgeText: {
    display: "flex",
    fontSize: 12,
    includeFontPadding: false,
    lineHeight: 20,
    paddingBottom: 0,
    height: 20
  },
  badge: {
    borderRadius: 12.5,
    width: 25,
    height: 25
  }
});
