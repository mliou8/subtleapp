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
  }

  render() {
    const dropdown_6_icon = this.state.dropdown_6_icon_heart ? require('./images/heart.png') : require('./images/flower.png');
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.cell}>
            <ModalDropdown ref="dropdown_2"
                           style={styles.dropdown_2}
                           textStyle={styles.dropdown_2_text}
                           dropdownStyle={styles.dropdown_2_dropdown}
                           options={this.props.options}
                           renderRow={this._dropdown_2_renderRow.bind(this)}
                           onSelect={(index, value) => this.props.setType(index, value)}
                           renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => this._dropdown_2_renderSeparator(sectionID, rowID, adjacentRowHighlighted)}
            />
          </View>
        </View>
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

  _dropdown_2_renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    if (rowID == 2 - 1) return;
    let key = `spr_${rowID}`;
    return (<View style={styles.dropdown_2_separator}
                  key={key}
    />);
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
  contentContainer: {
    height: 500,
    paddingVertical: 100,
    paddingLeft: 20,
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
  dropdown_2_dropdown: {
    width: 260,
    height: 90,
    borderColor: 'dimgray',
    borderWidth: 2,
    borderRadius: 3,
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
    fontSize: 16,
    color: 'navy',
    textAlignVertical: 'center',
  },
  dropdown_2_separator: {
    height: 1,
    backgroundColor: 'cornflowerblue',
  },
});
