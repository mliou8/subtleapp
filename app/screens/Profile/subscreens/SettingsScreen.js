import React from 'react';
import { ScrollView, View, TouchableOpacity, StyleSheet, Clipboard, Alert } from 'react-native';
import { RkText, RkStyleSheet, RkTheme } from 'react-native-ui-kitten';
import ConnectedNetworks from 'app/components/profile/ConnectedNetworks';
import { createCode } from 'db/profile/index';

const socialNetworkOptions = ['instagram', 'youtube', 'twitch', 'facebook'];

export default class Settings extends React.Component {
  static navigationOptions = {
    title: 'Settings'.toUpperCase()
  };

  constructor(props) {
    super(props);
    this.state = {
      socialNetworks: this.props.userInfo.socialNetworks,
      instagram: { enabled: false, edit: 'false', sourceUrl: '' },
      youtube: { enabled: false, edit: 'false', sourceUrl: '' },
      facebook: { enabled: false, edit: 'false', sourceUrl: '' },
      twitch: { enabled: false, edit: 'false', sourceUrl: '' },
      inviteCode: "",
    };

    this.renderSocialNetworks = this.renderSocialNetworks.bind(this);
    this.updateSocialNetworks = this.updateSocialNetworks.bind(this);
    this.onPressToRemove = this.onPressToRemove.bind(this);
    this.onPressToAdd = this.onPressToAdd.bind(this);
    this.onPressToCopy = this.onPressToCopy.bind(this);
    this.onPressToGenerate = this.onPressToGenerate.bind(this);
  }

  // initialize each property to the correct value
  componentDidMount() {
    this.updateSocialNetworks();
  }

  // run this function each time social networks update
  updateSocialNetworks = () => {
    this.state.socialNetworks.forEach(socialNetwork => {
      const source = socialNetwork.source.toLowerCase();
      const sourceUrl = socialNetwork.sourceUrl;
      this.setState({ [source]: { enabled: true, sourceUrl: sourceUrl } });
    });
  };

  renderSocialNetworks = () => {
    return socialNetworkOptions.map((socialNetwork, idx) => {
      return (
        <View style={styles.row} key={idx}>
          <ConnectedNetworks
            text={this.state[socialNetwork.toLowerCase()].sourceUrl}
            iconType={socialNetwork}
            enabled={this.state[socialNetwork.toLowerCase()].enabled}
            onPressToRemove={this.onPressToRemove}
            onPressToAdd={this.onPressToAdd}
            userInfo={this.props.userInfo}
          />
        </View>
      );
    });
  };

  onPressToRemove = (networkObj, userInfo) => {
    this.props.removeNetwork(networkObj, userInfo);
    this.setState({
      [networkObj.source]: { enabled: false, edit: false, sourceUrl: '' }
    });
  };

  onPressToAdd = (networkObj, userInfo) => {
    this.props.addNetwork(networkObj, userInfo);
    const { source, sourceUrl } = networkObj;
    this.setState({
      [source]: { enabled: true, edit: false, sourceUrl: sourceUrl }
    });
  };
  
  //Press to copy
  onPressToCopy = (str) => {
    Clipboard.setString(str);
    Alert.alert(
      'Text Copied!',
      str,
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
    )
  }
  
  //Press to generate invite code
  onPressToGenerate = () => {
    createCode(this.props.userInfo).then((code) => {
      this.setState({inviteCode: code})
    });
  }
  
  renderInviteCode = () => { //1945*
    if (!this.state.inviteCode) {
      return (
        <TouchableOpacity>
          <RkText rkType="awesome medium" style={{ color: 'blue' }} onPress={() => this.onPressToGenerate()}>Generate Code</RkText>
        </TouchableOpacity>  
      )
    } else {
        return (
          <TouchableOpacity>
            <RkText rkType="awesome medium" style={{ color: 'blue' }} onPress={() => this.onPressToCopy(this.state.inviteCode)}>{this.state.inviteCode}</RkText>
          </TouchableOpacity>
        )
    }
  }

  render = () => (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <View style={[styles.row, styles.heading]}>
          <RkText rkType="primary header6">Profile Settings</RkText>
        </View>
        <View style={styles.row}>
          <RkText rkType="header6">Link to the app</RkText>
          <RkText rkType="awesome medium" style={{ color: 'blue' }} onPress={() => this.onPressToCopy()}>Copy Link</RkText>
        </View>
        <View style={styles.row}>
          <RkText rkType="header6">Your Invite Code</RkText>
          { this.renderInviteCode() }
        </View>
      </View>
      <View style={styles.section}>
        <View style={[styles.row, styles.heading]}>
          <RkText rkType="primary header6">Connected Networks</RkText>
        </View>
        {this.renderSocialNetworks()}
      </View>
      <View style={styles.section}>
        <View style={[styles.row, styles.heading]}>
          <RkText rkType="primary header6">SUPPORT</RkText>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.rowButton}>
            <RkText rkType="header6">Help</RkText>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.rowButton}>
            <RkText rkType="header6">Privacy Policy</RkText>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.rowButton}>
            <RkText rkType="header6">Terms & Conditions</RkText>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.rowButton}>
            <RkText rkType="header6">Logout</RkText>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = RkStyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.colors.screen.base
  },
  header: {
    paddingVertical: 25
  },
  section: {
    marginVertical: 25
  },
  heading: {
    paddingBottom: 12.5
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 17.5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border.base,
    alignItems: 'center',
    paddingVertical: 18,
  },
  rowButton: {
    flex: 1,
    paddingVertical: 24
  },
  switch: {
    marginVertical: 14
  }
}));
