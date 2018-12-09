import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight,
} from 'react-native';

import MessageRow from 'app/components/messages/MessageRow';

const messages = [
  {
    user: {
      userImageUrl: 'https://loremflickr.com/60/60/dog',
      userName: 'heyitsmmike',
      userMessagePreview: 'hey whats the happening',
      lastMessageTime: '4:04 am'
    },
    messages: [
      {
        _id: 1,
        text: 'hey whats the happening',
        createdAt: new Date(),
        user: {
          _id: 'heyitsmmike',
        },
      },
      {
        _id: 2,
        text: 'hey just hanging here',
        createdAt: new Date(),
        user: {
          _id: 'heyitsib',
        },
      },
      {
        _id: 3,
        text: 'its the cool',
        createdAt: new Date(),
        user: {
          _id: 'heyitsmmike',
        },
      },
      {
        _id: 4,
        text: 'well this was fun',
        createdAt: new Date(),
        user: {
          _id: 'heyitsib',
        },
      }
    ]
  },
  {
    user: {
      userImageUrl: 'https://loremflickr.com/60/60/dog',
      userName: 'heyitsmmike',
      userMessagePreview: 'hey whats the happening',
      lastMessageTime: '4:04 am'
    },
    messages: [
      {
        _id: 1,
        text: 'hey whats the happening',
        createdAt: new Date(),
        user: {
          _id: 'heyitsmmike',
        },
      },
      {
        _id: 2,
        text: 'hey just hanging here',
        createdAt: new Date(),
        user: {
          _id: 'heyitsib',
        },
      },
      {
        _id: 3,
        text: 'its the cool',
        createdAt: new Date(),
        user: {
          _id: 'heyitsmmike',
        },
      },
      {
        _id: 4,
        text: 'well this was fun',
        createdAt: new Date(),
        user: {
          _id: 'heyitsib',
        },
      }
    ]
  }
];

export default class MessageScreen extends React.Component {
  static navigationOptions = {
    title: 'Messages',
  };
  constructor(props) {
    super(props);
    this.state = {messages: messages}
    this.renderMessages = this.renderMessages.bind(this);
  }
  
  renderMessages = () => {
    return this.state.messages.map((message, idx) => {
      return (
        <View key={idx}>
          <TouchableHighlight onPress={() => this.props.navigation.navigate('Conversation', { messages: message.messages })} underlayColor={"#999999"}>
            <MessageRow
              userImageUrl={message.user.userImageUrl}
              userName={message.user.userName}
              userMessagePreview={message.user.userMessagePreview}
              lastMessageTime={message.user.lastMessageTime}
            />
          </TouchableHighlight> 
        </View>
      )
    })
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderMessages()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
  headerContainer: {
    margin: "auto",
  }
});

