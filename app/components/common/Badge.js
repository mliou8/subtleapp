import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import socialImages from "assets/images/social/exports.js";
import { WebBrowser } from "expo";

export default class Badge extends React.Component {
  constructor(props) {
    super(props);
    this.badgeTypePicker = this.badgeTypePicker.bind(this);
    this._handleBadgePress = this._handleBadgePress.bind(this);
  }
  _handleBadgePress = (badgeType, sourceName) => {
    switch (badgeType) {
      case "instagram":
        return WebBrowser.openBrowserAsync(
          `https://www.instagram.com/${sourceName}/`
        );
      case "youtube":
        return WebBrowser.openBrowserAsync(
          `https://www.youtube.com/${sourceName}/`
        );
      case "twitch":
        return WebBrowser.openBrowserAsync(
          `https://www.twitch.tv/${sourceName}/`
        );
      default:
        return "";
    }
  };
  badgeTypePicker = type => {
    switch (type) {
      case "youtube":
        return (
          <TouchableOpacity
            onPress={() => {
              this._handleBadgePress("youtube", badge.sourceName);
            }}
          >
            <Image
              style={styles.badge}
              source={socialImages.youtube}
              alt="badge"
            />
          </TouchableOpacity>
        );
      case "instagram":
        return (
          <TouchableOpacity
            onPress={() => {
              this._handleBadgePress("instagram", badge.sourceName);
            }}
          >
            <Image
              style={styles.badge}
              source={socialImages.instagram}
              alt="badge"
            />
          </TouchableOpacity>
        );
      case "twitch":
        return (
          <TouchableOpacity
            onPress={() => {
              this._handleBadgePress(badge.badgeType, badge.sourceName);
            }}
          >
            <Image
              style={styles.badge}
              source={socialImages.twitch}
              alt="badge"
            />
          </TouchableOpacity>
        );
      default:
        return "";
    }
  };

  render() {
    const badgeType = this.props.badgeType;
    return (
      <View style={styles.badgeContainer}>
        {this.badgeTypePicker(badgeType)}
        <TouchableOpacity
          onPress={() => {
            this._handleBadgePress(badgeType, this.props.sourceName);
          }}
        >
          <Text style={styles.badgeText}>{this.props.sourceName}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  badgeContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    borderRadius: 8,
    backgroundColor: "#F0F0F0",
    marginRight: 4,
    paddingRight: 5,
    alignContent: "center",
    justifyContent: "flex-start"
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
