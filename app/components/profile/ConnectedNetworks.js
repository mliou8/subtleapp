import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ViewPropTypes,
  TextInput,
} from 'react-native';
import {
  RkText,
  RkTheme,
} from 'react-native-ui-kitten';
import { Icon } from 'native-base';

export default class ConnectedNetworks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.text = this.props.text ? this.props.text : "";
    this.state.edit = false;
    this.buttonToggle = this.buttonToggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.text !== this.props.text) {
      this.setState({text: this.props.text});
    }
  }
  handleSubmit = () => {
    if (this.state.text !== "") {
      this.props.onPressToAdd({source: this.props.iconType, sourceUrl: this.state.text}, this.props.userInfo); 
    }
    this.setState({edit: false})
  }
  
  handleRemove = () => {
    this.props.onPressToRemove({source: this.props.iconType, sourceUrl: this.props.text}, this.props.userInfo);
  }
  
  toggleEdit = () => {
    
    if (this.state.edit === false) {
      const displayText = this.props.enabled ? this.state.text : "Not connected";
      return (
        <RkText rkType='header6' style={{ marginTop: 5, marginLeft: 5, color: 'black' }}>{displayText}</RkText>
      )
    } else {
      return (
        <TextInput 
          style={{height: 20, marginTop: 5, marginLeft: 6, borderColor: 'gray', borderWidth: .7}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          placeholder="Your handle"
          autoFocus={true}
          />
      )
    }
  }
  
  buttonToggle = (enabled) => {
    if (enabled) {
      return (
        <RkText rkType='awesome small' style={{ color: 'red' }} onPress={() => this.handleRemove()}>Remove Network</RkText>
      )
    } else if (this.state.edit === false){
      return (
        <RkText rkType='awesome small' style={{ color: 'black' }} onPress={() => this.setState({edit: true})}>Connect</RkText>  
      )
    } else {
      return (
        <RkText rkType='awesome small' style={{ color: 'blue' }} onPress={() => this.handleSubmit()}>Submit</RkText>  
      )
    }
  }
  
  render = () => {
    const color = 'black';
    return (
      <TouchableOpacity style={[styles.wrapper, this.props.style]} onPress={this.props.onPress}>
        <View style={styles.container}>
          <View style={styles.text}>
            <RkText rkType='awesome' style={[styles.icon, { color }]}>
              <Icon
                type="FontAwesome"
                name={this.props.iconType}
              />
            </RkText>
            { this.toggleEdit() }
          </View>
          { this.buttonToggle(this.props.enabled) }
        </View>
      </TouchableOpacity>
    );
  };
}

let styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    flexDirection: 'row',
  },
  icon: {
    width: 35,
  },
});