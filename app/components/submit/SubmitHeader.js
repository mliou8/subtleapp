import React from 'react';
import { ScrollView, StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import { Avatar, Image } from 'app/components/image';
import Dropdown from 'react-native-dropdown';

const {
  Select,
  Option,
  OptionList,
  updatePosition
} = DropDown;

//Options for dropdowns
const data = [
  { value: "bulletin" },
  { value: "dating" },
];

export default class SubmitHeader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      view: 'Recent'
    }
  }

  render() {
    return (
      <View style={styles.container}>
      <Select
        width={250}
        ref="SELECT1"
        optionListRef={data}
        defaultValue="Select a Province in Canada ..."
        onSelect={this.props.setPostType(value)}>
         <Option>Alberta</Option>
         <Option>British Columbia</Option>
         <Option>Manitoba</Option>
         <Option>New Brunswick</Option>
         <Option>Newfoundland and Labrador</Option>
         <Option>Northwest Territories</Option>
         <Option>Nova Scotia</Option>
         <Option>Nunavut</Option>
         <Option>Ontario</Option>
         <Option>Prince Edward Island</Option>
         <Option>Quebec</Option>
         <Option>Saskatchewan</Option>
         <Option>Yukon</Option>
      </Select>

        <View style={styles.profile}>
          <Avatar
            size={65}
            styles={styles.avatar}
            src={'http://i.pravatar.cc/100'}
          />
          <Text style={styles.name}>
            {'You'}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 150,
    backgroundColor: 'black',
    marginBottom: 20,
  },
  pickerStyle: {
    backgroundColor: 'grey',
    width: 300,
    borderRadius: 12.5,
    color: 'white',
    marginLeft: 50,
  },
  headerBar: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-evenly',
  },
  profile: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  name: {
    fontSize: 22,
    marginHorizontal: 15,
  },
});
