import React from 'react';
import { ScrollView, StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import { Avatar, Image } from 'app/components/image';
import Dropdown from 'app/components/common/Dropdown';

const dropdownOptions = [
  'General',
  'Dating',
];

const submenuOptions = [
  'Off Topic',
  'Food',
  'Dating',
  'Topic Starter',
  'Looking for Friends',
  'Art/Media',
  'Music',
  'Raves',
];

const dateOptions = [
  'Looking for Friends (3 days)',
  'Looking for Rave Bae (5 days)',
  'Looking for Boba Bae (7 days)',
  'Looking for True Love (14 days)',
]
export default class SubmitHeader extends React.Component {
  constructor(props) {
    super(props)
    this.renderSubDropdown = this.renderSubDropdown.bind(this);
  }

  renderSubDropdown(type) {
    if (type === 'general') {
      return (
        <Dropdown
          options={submenuOptions}
          defaultValue="Off Topic"
          setType={this.props.setTopic}
          height={175}
          />
      )
    } else if (type === 'dating') {
      return (
        <Dropdown
          options={dateOptions}
          defaultValue="Looking for Friends (3 days)"
          setType={this.props.setDuration}
          height={140}
          width={220}
          />
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.dropdownContainer}>
            <Dropdown
              options={dropdownOptions}
              defaultValue={"General"}
              setType={this.props.setType}
              height={87}
              />
        </View>
        <View style={styles.subTopic}>
          { this.renderSubDropdown(this.props.postType) }
        </View>
        <View style={styles.profile}>
          <Avatar
            size={65}
            styles={styles.avatar}
            src={this.props.userInfo.photoURL}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 120,
    backgroundColor: 'black',
    borderColor: 'black',
    marginBottom: 20,
  },
  dropdownContainer: {
    display: 'flex',
    alignSelf: 'flex-start',
    marginLeft: 90,
    marginTop: -20,
  },
  subTopic: {
    display: 'flex',
    alignSelf: 'flex-start',
    marginLeft: 90,
    marginTop: -85,
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
    borderColor: 'black',
  },
});
