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
import { Spinner } from 'native-base';
import config from '../../../config.js';
import { Alert } from 'react-native';
import { AuthSession } from 'expo';
// import moment, { now } from 'moment';
import firebase from 'db/firebase';

import db from 'db/firestore';
import { connect } from 'react-redux';
import { sendNewMsg, fetchConversation } from 'app/actions/messages/index';

class Conversation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      convoID: this.props.navigation.getParam('convoID')
    };
    this.onSend = this.onSend.bind(this);
  }

  componentDidMount() {
    const self = this;
    const convoID = this.state.convoID;
    const docRef = db.collection('conversations').doc(convoID);

    // await firebase.auth().onAuthStateChanged(function(user) {
    //   if (user) {
    //     docRef.onSnapshot(function(doc) {
    //       msgs = doc.data().messages;
    //       console.log('Current data: ', doc.data().messages);
    //     });
    //     self.setState({
    //       messages: msgs
    //     });
    //   } else {
    //     console.log('not logged in');
    //   }
    // });
    docRef.get().then(function(doc) {
      if (doc.exists) {
        const conversation = doc.data();
        //might need error handling in case its an empty array bc user has deleted old ones?
        const testnewMsgs = conversation.messages.forEach(item => {
          let oldTime = item.createdAt;
          const jstime = oldTime.toDate();
          item.createdAt = jstime;

          return item;
        });
        const newMsgs = conversation.messages;

        self.setState({
          messages: newMsgs
        });
        return conversation;
      } else {
        const msg = 'No such user with that uid';
        return msg;
      }
    });
  }

  onSend(messages = []) {
    const prevMsgs = this.state.messages;
    const convoID = this.state.convoID;

    const currUserRef = db.collection('conversations').doc(convoID);
    currUserRef.update({
      messages: firebase.firestore.FieldValue.arrayUnion(messages[0])
    });
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
  }

  render() {
    const { navigation } = this.props;
    // console.log('------------------curre convo-----', this.state);
    const msgs = this.state.messages;
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: this.props.userInfo.uid,
          name: this.props.userInfo.displayName,
          avatar: this.props.userInfo.photoURL
        }}
        //user here is the current user
        showUserAvatar={true}
        isLoadingEarlier={true}
        dateFormat={'LL'}
        inverted={false}
        //other display options:
        // showAvatarForEveryMessage={true}
        // onPressAvatar (Function(user)) - Callback when a message avatar is tapped
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

// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     // fetchConversation: id => {
//     //   dispatch(fetchConversation(id));
//     // },
//     // sendNewMsg: (convoID, msgs, oldMsgs) => {
//     //   dispatch(sendNewMsg(convoID, msgs, oldMsgs));
//     // }
//   };
// };
export default connect(
  mapStateToProps,
  null
)(Conversation);
