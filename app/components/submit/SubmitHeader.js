import React from 'react';
import { ScrollView, StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import { Avatar, Image } from 'app/components/image';
import Dropdown from 'app/components/common/Dropdown';

const dropdownOptions = [
  'General',
  'Dating',
];

export default class SubmitHeader extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.dropdownContainer}>
          <Dropdown
            options={dropdownOptions}
            setType={this.props.setType}
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
    backgroundColor: 'black',
    marginBottom: 20,
  },
  dropdownContainer: {
    display: 'flex',
    alignSelf: 'flex-start',
    marginLeft: 85,
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
