import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { Spinner, Button, Text, Icon } from 'native-base';
import { Alert } from 'react-native';
import { AuthSession } from 'expo';
import firebase from 'db/firebase';
import moment from 'moment';

import db from 'db/firestore';
import { connect } from 'react-redux';

class Conversation extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('friend'),
      headerStyle: { backgroundColor: '#242424', height: 80 },
      headerTitleStyle: {
        fontFamily: 'poppinsBold',
        color: 'white',
        fontSize: 18
      },
      headerLeftContainerStyle: {
        marginLeft: 10, marginTop: 15
      },
      headerLeft: (
        <Button transparent onPress={() => navigation.goBack()}>
          <Icon
            name="chevron-left"
            type="FontAwesome"
            style={{ color: 'white', fontSize: 25 }}
          />
        </Button>
      )
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      convoLoaded: false
    };

    this.onSend = this.onSend.bind(this);
  }

  componentDidMount() {
    const self = this;
    const convoID = this.props.navigation.getParam('convoID');
    this.setState({ convoID });

    db.collection('conversations')
      .doc(convoID)
      .onSnapshot(function(doc) {
        if (doc.exists) {
          const conversation = doc.data();
          if (!conversation.messages) {
            self.setState({
              messages: []
            });
          } else {
            const newMsgs = conversation.messages.map(item => {
              let oldTime = item.createdAt;
              const jstime = oldTime.toDate();
              item.createdAt = jstime;
              return item;
            });

            self.setState({
              messages: newMsgs,
              convoLoaded: true
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
          scrollToBottom={true}
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
    conversations: state.login.userInfo.conversations
  };
};

export default connect(
  mapStateToProps,
  null
)(Conversation);
