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
        <Text style={{fontSize: 17, fontWeight: 'bold', marginBottom: 7.5, marginTop: 2, marginLeft: 10}}>{this.props.userName}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingTop: 10,
    paddingBottom: 10,
  },
  message: {
    display: 'flex',
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
