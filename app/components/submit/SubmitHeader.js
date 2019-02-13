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
  'Raves',
  'Food',
  'Dating',
  'Looking for Friends',
  'Art/Media',
];

const timeOptions = [
  'Disappear in 3 days',
  'Disappear in 5 days',
  'Disappear in 7 days',
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
          setType={this.props.setTopic}
          height={175}
          />
      )
    } else if (type === 'dating') {
      return (
        <Dropdown
          options={timeOptions}
          setType={this.props.setDuration}
          height={120}
          width={80}
          />
      )
    }
  }

  render() {
    console.log("post type is now ", this.props.postType);
    return (
      <View style={styles.container}>
        <View style={styles.dropdownContainer}>
            <Dropdown
              options={dropdownOptions}
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
            src={'http://i.pravatar.cc/100'}
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
