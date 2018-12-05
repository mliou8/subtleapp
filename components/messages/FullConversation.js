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
import { GiftedChat } from 'react-native-gifted-chat'

export default class Conversation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: this.props.navigation.getParam('messages')
    }
    this.onSend = this.onSend.bind(this);
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  render() {
    const { navigation } = this.props;

    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    )
  }
}


