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
import { connect } from 'react-redux';
import { sendNewMsg, fetchConversation } from 'app/actions/messages/index';

class Conversation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: this.props.navigation.getParam('messages'),
      convoID: this.props.navigation.getParam('convoID')
    };
    this.onSend = this.onSend.bind(this);
  }

  componentDidMount() {
    const self = this;
    const convoID = this.state.convoID;
    const docRef = db.collection('conversations').doc(convoID);
    docRef.get().then(function(doc) {
      if (doc.exists) {
        const conversation = doc.data();
        self.setState({
          messages: conversation.messages
        });
        return conversation;
      } else {
        const msg = 'No such user with that uid';
        return msg;
      }
    });
  }

  onSend(messages) {
    console.log('this is new messages ---------', this.state.messages);
    const prevMsgs = this.state.messages;
    const chatID = this.state.convoID;
    // _id: generateMessageID(),
    this.props.sendNewMsg(chatID, messages, prevMsgs);
    this.setState(prevMsgs => ({
      messages: GiftedChat.append(prevMsgs, messages)
    }));
  }

  render() {
    const { navigation } = this.props;
    console.log('------------------curre convo-----', this.state);
    const msgs = this.state.messages;
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: this.props.userInfo.uid
        }}
        showUserAvatar={true}
        isLoadingEarlier={true}

        //bottomOffset={20}
        //user here is the current user as the id will be given in the messages
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...state,
    userInfo: state.login.userInfo,
    conversations: state.login.userInfo.conversations,
    profile: state.profile,
    messages: state.messages
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchConversation: id => {
      dispatch(fetchConversation(id));
    },
    sendNewMsg: (convoID, msgs, oldMsgs) => {
      dispatch(sendNewMsg(convoID, msgs, oldMsgs));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Conversation);

// [23:47:07] this is new messages --------- Array [
//   [23:47:07]   Object {
//   [23:47:07]     "_id": "28f36ffe-7050-451b-901a-5c4fbe28687b",
//   [23:47:07]     "createdAt": 2019-01-13T04:47:07.336Z,
//   [23:47:07]     "text": "The new message",
//   [23:47:07]     "user": Object {
//   [23:47:07]       "_id": "F6i0CYwBLgZN5uOFs4nhbs7vuKz1",
//   [23:47:07]     },
//   [23:47:07]   },
//   [23:47:07] ]
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
