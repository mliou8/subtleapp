import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

import config from '../../../config.js';
import { Alert } from 'react-native';
import { AuthSession } from 'expo';
import moment, { now } from 'moment';
import firebase from 'db/firebase';
import db from 'db/firestore';

export default class Conversation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: this.props.navigation.getParam('messages')
    };
    this.onSend = this.onSend.bind(this);
  }

  // sendNewMsg = (convoId, newMsg, currMsgs)
  // _id: 1,
  // text: 'My message',
  // createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
  // user: {
  //   _id: 2,
  //   name: 'React Native',
  //   avatar: 'https://facebook.github.io/react/img/logo_og.png',
  // },
  // image: 'https://facebook.github.io/react/img/logo_og.png',
  onSend(messages = []) {
    console.log('this is messages ---------', messages);
    this.props.sendNewMsg(convoId, newMsg, currMsgs);
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
  }

  render() {
    const { navigation } = this.props;

    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 'F6i0CYwBLgZN5uOFs4nhbs7vuKz1'
        }}
        showUserAvatar={true}
        isLoadingEarlier={true}
        //bottomOffset={20}
        //user here is the current user as the id will be given in the messages
      />
    );
  }
}

// this is messages --------- Array [
//   [20:02:19]   Object {
//   [20:02:19]     "_id": "cc031d38-0779-4208-bfe9-f6b543e12f2d",
//   [20:02:19]     "createdAt": 2019-01-13T01:02:20.767Z,
//   [20:02:19]     "text": "Hey girl hayy",
//   [20:02:19]     "user": Object {
//   [20:02:19]       "_id": "F6i0CYwBLgZN5uOFs4nhbs7vuKz1",
//   [20:02:19]     },
//   [20:02:19]   },
//   [20:02:19] ]
// function testMsg(convoId) {
//   db.collection('conversations')
//     .doc(convoId)
//     .onSnapshot(function(doc) {
//       console.log('Current data: ', doc.data());
//     });
// }
//'AobBHaD1U9WJWOCMNFC8'
// 'F6i0CYwBLgZN5uOFs4nhbs7vuKz1'
// sendNewMsg = (convoId, newMsg, currMsgs) => {

// const convos = {
//   author: 'Kristin',
//   text: 'hi human who feeds me!',
//   timeSent: new Date()
// };

// import React from 'react';
// import {
//   Image,
//   Platform,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import { GiftedChat } from 'react-native-gifted-chat'

// export default class Conversation extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       messages: this.props.navigation.getParam('messages')
//     }
//     this.onSend = this.onSend.bind(this);
//   }

//   onSend(messages = []) {
//     this.setState(previousState => ({
//       messages: GiftedChat.append(previousState.messages, messages),
//     }))
//   }

//   render() {
//     const { navigation } = this.props;

//     return (
//       <GiftedChat
//         messages={this.state.messages}
//         onSend={messages => this.onSend(messages)}
//         user={{
//           _id: 1,
//         }}
//       />
//     )
//   }
// }
