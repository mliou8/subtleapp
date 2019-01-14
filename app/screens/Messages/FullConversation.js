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
import firebase from 'db/firebase';

import db from 'db/firestore';
import { connect } from 'react-redux';

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

    docRef.get().then(function(doc) {
      if (doc.exists) {
        const conversation = doc.data();
        //might need error handling in case its an empty array bc user has deleted old ones?
        //in the case that conversation exists on user and id exists on conversation collection but things have been delted
        //somethign like  if conversation.messages is undefined set state []
        //will need diff flow for starting a new convo
        if (!conversation.messages) {
          self.setState({
            messages: []
          });
        } else {
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
        }
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

export default connect(
  mapStateToProps,
  null
)(Conversation);
