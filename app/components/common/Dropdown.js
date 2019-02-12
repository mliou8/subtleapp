import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
} from 'react-native';

import ModalDropdown from 'react-native-modal-dropdown';


export default class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.dropdownStyle = this.dropdownStyle.bind(this);
    this.buttonStyle = this.buttonStyle.bind(this);
  }

  dropdownStyle = (height) => ({
    width: 260,
    height: height || 100,
    borderColor: 'dimgray',
    borderWidth: 2,
    borderRadius: 3,
  });

  buttonStyle = (margin) => ({
    width: 260,
    marginTop: 32,
    marginLeft: 20,
    right: 8,
    borderWidth: 0,
    borderRadius: 3,
    backgroundColor: 'dimgray',
    marginBottom: margin || 0,
  });

  render() {
    return (
      <View style={styles.container}>
        <ModalDropdown ref="dropdown_2"
                       style={this.buttonStyle(this.props.marginBottom)}
                       textStyle={styles.dropdown_2_text}
                       dropdownStyle={this.dropdownStyle(this.props.height)}
                       options={this.props.options}
                       renderRow={this._dropdown_2_renderRow.bind(this)}
                       onSelect={(index, value) => this.props.setType(index, value)}
        />
      </View>
    );
  }

  _dropdown_2_renderRow(rowData, rowID, highlighted) {
    let icon = highlighted ? require('./images/heart.png') : require('./images/flower.png');
    let evenRow = rowID % 2;
    return (
      <TouchableHighlight underlayColor='cornflowerblue'>
        <View style={[styles.dropdown_2_row, {backgroundColor: 'white'}]}>
          <Text style={[styles.dropdown_2_row_text, highlighted && {color: 'mediumaquamarine'}]}>
            {rowData}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
  },
  scrollView: {
    flex: 1,
  },
  textButton: {
    color: 'dimgray',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'dimgray',
    margin: 2,
  },
  dropdown_2: {
    width: 260,
    marginTop: 32,
    marginLeft: 20,
    right: 8,
    borderWidth: 0,
    borderRadius: 3,
    backgroundColor: 'dimgray',
  },
  dropdown_2_text: {
    marginVertical: 10,
    marginHorizontal: 6,
    fontSize: 14,
    color: 'white',
    textAlign: 'left',
    textAlignVertical: 'center',
  },
  dropdown_2_row: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
  },
  dropdown_2_image: {
    marginLeft: 4,
    width: 30,
    height: 30,
  },
  dropdown_2_row_text: {
    marginHorizontal: 4,
    fontSize: 14,
    color: 'navy',
    textAlignVertical: 'center',
  },
});
