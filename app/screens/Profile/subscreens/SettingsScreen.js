
import React from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  RkText,
  RkStyleSheet,
  RkTheme,
} from 'react-native-ui-kitten';
import FindFriends from 'app/components/profile/FindFriends';
import { removeNetwork } from 'db/profile/index';

export default class Settings extends React.Component {
  static navigationOptions = {
    title: 'Settings'.toUpperCase(),
  };
  
  constructor(props) {
    super(props);
    this.state = {
      sendPush: true,
      shouldRefresh: false,
      socialNetworks: this.props.socialNetworks,
    };
  }
  
  renderSocialNetworks = () => {
      return this.state.socialNetworks.map((socialNetwork, idx) => {
        return (
          <View style={styles.row} key={idx}>
            <FindFriends
              text={socialNetwork.sourceName}
              iconType={socialNetwork.badgeType}
              selected={this.state.facebookEnabled}
              onPress={this.onFindFriendsFacebookButtonPressed}
            />
          </View>
        )
      })
    };
    
  onPresstoRemove = (value) => {
    this.setState({ sendPush: value });
  };

  onRefreshAutomaticallySettingChanged = (value) => {
    this.setState({ shouldRefresh: value });
  };

  render = () => (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <View style={[styles.row, styles.heading]}>
          <RkText rkType='primary header6'>PROFILE SETTINGS</RkText>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.rowButton}>
            <RkText rkType='header6'>Edit Profile</RkText>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.rowButton}>
            <RkText rkType='header6'>Change Password</RkText>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <RkText rkType='header6'>Send Push Notifications</RkText>
        </View>
        <View style={styles.row}>
          <RkText rkType='header6'>Refresh Automatically</RkText>
        </View>
      </View>
      <View style={styles.section}>
        <View style={[styles.row, styles.heading]}>
          <RkText rkType='primary header6'>FIND FRIENDS</RkText>
        </View>
        <View style={styles.row}>
          <FindFriends
            text='Twitter'
            iconType={'twitter'}
            selected={this.state.twitterEnabled}
            onPress={this.onFindFriendsTwitterButtonPressed}
          />
        </View>
        <View style={styles.row}>
          <FindFriends
            text='Google'
            iconType={'google'}
            selected={this.state.googleEnabled}
            onPress={this.onFindFriendsGoogleButtonPressed}
          />
        </View>
        
      </View>
      <View style={styles.section}>
        <View style={[styles.row, styles.heading]}>
          <RkText rkType='primary header6'>SUPPORT</RkText>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.rowButton}>
            <RkText rkType='header6'>Help</RkText>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.rowButton}>
            <RkText rkType='header6'>Privacy Policy</RkText>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.rowButton}>
            <RkText rkType='header6'>Terms & Conditions</RkText>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.rowButton}>
            <RkText rkType='header6'>Logout</RkText>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = RkStyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.colors.screen.base,
  },
  header: {
    paddingVertical: 25,
  },
  section: {
    marginVertical: 25,
  },
  heading: {
    paddingBottom: 12.5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 17.5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border.base,
    alignItems: 'center',
  },
  rowButton: {
    flex: 1,
    paddingVertical: 24,
  },
  switch: {
    marginVertical: 14,
  },
}));
