import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import socialImages from '../assets/images/social/exports.js';

export default class Badge extends React.Component {
  constructor(props) {
    super(props)
    this.badgeTypePicker = this.badgeTypePicker.bind(this)
  }
  
  badgeTypePicker = (type) => {
    switch (type) {
      case 'youtube': 
        return (
          <Image 
            style={styles.badge} 
            source={socialImages.youtube} 
            alt="badge"
            />
        )
      case 'instagram': 
        return (
          <Image 
            style={styles.badge} 
            source={socialImages.instagram} 
            alt="badge"
            />
        )
      case 'twitch': 
          return (
            <Image 
              style={styles.badge} 
              source={socialImages.twitch} 
              alt="badge"
              />
            )
      default: return "";
    }
  }
  
  render() {
    const badgeType = this.props.badgeType
    return (
      <View style={styles.badgeContainer}>
        { this.badgeTypePicker(badgeType) }
        <Text style={styles.badgeText}>{this.props.sourceName}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  badgeContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
    marginRight: 4,
    paddingRight: 5,
    alignContent: 'center',
    justifyContent: 'flex-start'
  },
  badgeText: {
    display: 'flex',
    fontSize: 12,
    includeFontPadding: false,
    lineHeight: 20,
    paddingBottom: 0,
    height: 20,
  },
  badge: {
    borderRadius: 12.5,
    width: 25,
    height: 25,
  },
})