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
import firebase from 'db/firebase';

import db from 'db/firestore';
import { connect } from 'react-redux';

class Conversation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      convoID: null,
      convoLoaded: false
    };
    this._mounted = false;
    this.onSend = this.onSend.bind(this);
  }
  //old version that works
  // async componentDidMount() {
  //   this._mounted = true;
  //   const self = this;
  //   const convoID = this.props.navigation.getParam('convoID');
  //   this.setState({ convoID });

  //   const docRef = db.collection('conversations').doc(convoID);

  //   await docRef.get().then(function(doc) {
  //     if (doc.exists) {
  //       const conversation = doc.data();

  //       if (!conversation.messages) {
  //         self.setState({
  //           messages: []
  //         });
  //       } else {
  //         const testnewMsgs = conversation.messages.map(item => {
  //           let oldTime = item.createdAt;
  //           const jstime = oldTime.toDate();
  //           item.createdAt = jstime;
  //           return item;
  //         });
  //         const newMsgs = testnewMsgs;

  //         self.setState({
  //           messages: newMsgs,
  //           convoLoaded: true
  //         });
  //         return conversation;
  //       }
  //     }
  //   });
  // }

  componentDidMount() {
    this._mounted = true;
    const self = this;
    const convoID = this.props.navigation.getParam('convoID');
    this.setState({ convoID });

    db.collection('conversations')
      .doc(convoID)
      .onSnapshot(function(doc) {
        console.log('Current data: ', doc.data());
        const conversation = doc.data();
        if (!conversation.messages) {
          self.setState({
            messages: []
          });
        } else {
          const testnewMsgs = conversation.messages.map(item => {
            let oldTime = item.createdAt;
            const jstime = oldTime.toDate();
            item.createdAt = jstime;
            return item;
          });
          const newMsgs = testnewMsgs;

          self.setState({
            messages: newMsgs,
            convoLoaded: true
          });
          return conversation;
        }
      });
  }

  componentWillUnmount() {
    this._mounted = false;
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
    if (this.state.convoLoaded) {
      return (
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: this.props.userInfo.uid,
            name: this.props.userInfo.displayName,
            avatar: this.props.userInfo.photoURL
          }}
          showUserAvatar={true}
          isLoadingEarlier={true}
          dateFormat={'LL'}
          inverted={false}
        />
      );
    } else {
      return <Spinner color="blue" />;
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...state,
    userInfo: state.login.userInfo,
    conversations: state.login.userInfo.conversations,
    profile: state.profile
  };
};

export default connect(
  mapStateToProps,
  null
)(Conversation);
