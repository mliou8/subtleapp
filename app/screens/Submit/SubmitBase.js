import React, { Component } from 'react';
import {
  Keyboard,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Alert,
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './SubmitBase.styles';
import {
  Container,
  Header,
  Button,
  Content,
  Form,
  Item,
  Input,
  Label,
  Text
} from 'native-base';
import SubmitContent from './subscreens/SubmitContent';
import SubmitDating from './subscreens/SubmitDating';

//Options for dropdowns
const data = [
  { value: "bulletin" },
  { value: "dating" },
];

export default class SubmitBase extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Create Post',
      headerStyle: { backgroundColor: '#242424', height: 120 },
      headerTitleStyle: {
        fontFamily: 'poppinsBold',
        color: 'white',
        fontSize: 20
      },
      headerRight: (
        <Button
          rounded
          style={{ backgroundColor: 'white' }}
          onPress={() => this.uploadPhoto()}
        >
          <Text style={{ color: 'black', fontFamily: 'poppins' }}>POST</Text>
        </Button>
      ),
      headerLeft: (
        <Button transparent onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" style={{ color: 'white', fontSize: 25 }} />
        </Button>
      )
    };
  };

  constructor() {
    super();
    this.state = {
      height: 250,
      uploads: [],
      postAuthor: {},
      postType: "general"
    };

    this.submitPost = this.submitPost.bind(this);
    this.renderForrm = this.renderForm.bind(this);
  }

  submitPost() {

  }

  renderForm () {
    if (this.state.postType === "dating") {
      return (
        <SubmitDating/>
      )
    } else {
      return (
        <SubmitContent/>
      )
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView style={{ backgroundColor: 'white' }}>
          <View style={styles.container}>
            <Dropdown
              label='Choose Post Type'
              data={data}
              animationDuration={0}
              value={this.state.postType}
              onChangeText={(value) => this.setState({postType: value})}
              selectedItemColor="rgba(0, 0, 0, .87)"
              dropdownOffset={{ top: 0, left: 0 }}
            />
            { this.renderForm() }
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  }
}
