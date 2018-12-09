import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';
import TabBarIcon from 'app/components/common/TabBarIcon';

export default class SubmitDating extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      display: 'initial',
      text: '',
    }  
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Button title="Go Back" onPress={() => this.props.resetState()}/>
        <Text> Submit Dating </Text>
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
    
  }
});
