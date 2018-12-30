
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
import ConnectedNetworks from 'app/components/profile/ConnectedNetworks';
import { removeNetwork } from 'db/profile/index';

const socialNetworkOptions = ['instagram', 'youtube', 'twitch', 'facebook'];

export default class Settings extends React.Component {
  static navigationOptions = {
    title: 'Settings'.toUpperCase(),
  };
  
  constructor(props) {
    super(props);
    this.state = {
      sendPush: true,
      shouldRefresh: false,
      socialNetworks: [],
      instagram: false,
      youtube: false,
      facebook: false,
      twitch: false,
    };
    
    this.renderSocialNetworks = this.renderSocialNetworks.bind(this);
  }
  
  renderSocialNetworks = () => {
    console.log("this.props ", this.props)
      return socialNetworkOptions.map((socialNetwork, idx) => {
        const { source, sourceUrl } = socialNetwork;
        this.setState({[source]: true});
        return (
          <View style={styles.row} key={idx}>
            <ConnectedNetworks
              text={sourceUrl}
              iconType={source}
              enabled={this.state[source]}
              remove={() => onPresstoRemove(source)}
            />
          </View>
        )
      })
  };
    
  onPresstoRemove = (source) => {
    this.setState({ [source] : false});
    removeNetwork(source);
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
          <RkText rkType='header6'>Placeholder goes with a switch toggle</RkText>
        </View>
      </View>
      <View style={styles.section}>
        <View style={[styles.row, styles.heading]}>
          <RkText rkType='primary header6'>Connected Networks</RkText>
        </View>
        { this.renderSocialNetworks() }
        <View style={styles.row}>
          <ConnectedNetworks
            text={`Network Name`}
            iconType={'facebook'}
            enabled={this.state.facebookEnabled}
          />
        </View>
        <View style={styles.row}>
          <ConnectedNetworks
            text={`Network Name`}
            iconType={'youtube'}
            enabled={this.state.youtubeEnabled}
          />
        </View>
        <View style={styles.row}>
          <ConnectedNetworks
            text={`Network Name`}
            iconType={'instagram'}
            enabled={this.state.instagramEnabled}
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
