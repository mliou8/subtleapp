import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import ProfilePortrait from './ProfilePortrait';

export default class MessageRow extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <View style={styles.container}>
        <ProfilePortrait imageSrc={this.props.userImageUrl} />
        <View style={styles.message}>
          <Text style={{fontSize: 17, fontWeight: 'bold', marginBottom: 7.5, marginTop: 2}}>{this.props.userName}</Text>
          <Text style={{fontSize: 17, color: '#696969'}}>{this.props.userMessagePreview}</Text>
        </View>
        <Text>{this.props.lastMessageTime}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10,
  },
  message: {
    display: 'flex',
    flexDirection: 'column',
  },
  divider: {
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingLeft: 10,
    marginTop: 7,
    marginBottom: 7,
    justifyContent: 'flex-end',
    width: '100%',
  },
})
