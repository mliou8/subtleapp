import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import TabBarIcon from 'app/components/common/TabBarIcon';
import SubmitDating from './SubmitDating';
import SubmitContent from './SubmitContent';

export default class SubmitScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      display: 'initial',
    }  
    this.resetState = this.resetState.bind(this);
  }
  resetState() {
    this.setState({display: 'initial'})
  }
  
  render() {
    const display = this.state.display;
    let view;
    if (display === 'initial') {
      view = <View style={styles.container}>
        <TouchableOpacity 
          style={styles.buttonContainer}
          onPress={() => {
            this.setState({display: 'SubmitContent'})
          }}>
          <TabBarIcon
            name={'ios-calendar'}
            size={55}
          />
          <Text>Post Content</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.buttonContainer}
          onPress={() => {
            this.setState({display: 'Dating'})
          }}>
          <TabBarIcon
            name={'ios-calendar'}
            size={55}
          />
          <Text>Hot Stunna</Text>
        </TouchableOpacity>
      </View> 
    } else if (display === 'SubmitContent') {
      view = <SubmitContent resetState={this.resetState}></SubmitContent>
    } else { 
      view = <SubmitDating resetState={this.resetState}></SubmitDating>
    }
    return (
      <View style={styles.container}>
        {view}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignContent: 'space-between',
    justifyContent: 'center',
    
  },
  buttonContainer: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
