import React from 'react';
import { ScrollView, StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import { Avatar, Image } from 'app/components/image';
import ModalDropdown from 'react-native-modal-dropdown';

export default class SubmitHeader extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.dropdownContainer}>
          <ModalDropdown
            options={['bulletin', 'dating']}
            style={styles.pickerStyle}
            textStyle={styles.textStyle}
            dropdownStyle={styles.dropdownStyle}
            onSelect={(idx, value) => this.props.setType(idx, value)}
          />
        </View>
        <View style={styles.profile}>
          <Avatar
            size={65}
            styles={styles.avatar}
            src={'http://i.pravatar.cc/100'}
          />
        </View>
      </View>
    );
  }
}
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 150,
    backgroundColor: 'white',
    marginBottom: 20,
  },
  pickerStyle: {
    backgroundColor: '#708090',
    width: 240,
    height: 35,
    borderRadius: 2,
  },
  textStyle: {
    color: 'white',
    alignContent: 'flex-start',
  },
  dropdownStyle: {
    backgroundColor: 'white',
  },
  profile: {
    alignContent: 'center',
    position: 'absolute',
    bottom: -20,
    left: 20,
  },
});
