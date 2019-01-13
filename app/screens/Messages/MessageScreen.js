import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import { fetchConversation } from 'app/actions/messages/index';

import MessageRow from 'app/components/messages/MessageRow';

// "displayName": "Belle",
// [22:16:53]           "photoURL": "https://firebasestorage.googleapis.com/v0/b/ttp-mobilebuild.appspot.com/o/IMG_0289.JPG?alt=media&token=e061af51-63eb-4bfc-8c68-9d1ece202e7d",
// [22:16:53]           "uid": "oJVkbWMJWAMaKyEJmSkZ",
//"uid": "F6i0CYwBLgZN5uOFs4nhbs7vuKz1",
// "displayName": "Kristin Nicole Harper",
// "photoURL": "https://graph.facebook.com/10109991608014475/picture",

const messages = [
  {
    user: {
      _id: 'AobBHaD1U9WJWOCMNFC8',
      userName: 'Bailey',
      userImageUrl:
        'https://firebasestorage.googleapis.com/v0/b/ttp-mobilebuild.appspot.com/o/IMG_0146.JPG?alt=media&token=367d386a-6657-4040-ac03-cb465891a8da',
      userMessagePreview: 'hey whats the happening',
      lastMessageTime: '4:04 am'
      // //last message slice 0,16 + '..'
      // lastMessageTime: '4:04 am'
      //messages array first 0 or length-1
    },
    messages: [
      {
        _id: 1,
        text: 'hey whats the happening',
        createdAt: new Date(),
        user: {
          _id: 'F6i0CYwBLgZN5uOFs4nhbs7vuKz1',
          name: 'Kristin',
          avatar: 'https://graph.facebook.com/10109991608014475/picture'
        }
      },
      {
        _id: 2,
        text: 'hey just hanging here',
        createdAt: new Date(),
        user: {
          _id: 'AobBHaD1U9WJWOCMNFC8',
          name: 'Bailey',
          avatar:
            'https://firebasestorage.googleapis.com/v0/b/ttp-mobilebuild.appspot.com/o/IMG_0146.JPG?alt=media&token=367d386a-6657-4040-ac03-cb465891a8da'
        }
      },
      {
        _id: 3,
        text: 'its the cool',
        createdAt: new Date(),
        user: {
          _id: 'F6i0CYwBLgZN5uOFs4nhbs7vuKz1',
          name: 'Kristin',
          avatar: 'https://graph.facebook.com/10109991608014475/picture'
        }
      },
      {
        _id: 4,
        text: 'well this was fun',
        createdAt: new Date(),
        user: {
          _id: 'AobBHaD1U9WJWOCMNFC8',
          name: 'Bailey',
          avatar:
            'https://firebasestorage.googleapis.com/v0/b/ttp-mobilebuild.appspot.com/o/IMG_0146.JPG?alt=media&token=367d386a-6657-4040-ac03-cb465891a8da'
        }
      }
    ]
  },
  {
    user: {
      userImageUrl: 'https://loremflickr.com/60/60/cat',
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
          _id: 1
        }
      },
      {
        _id: 2,
        text: 'hey just hanging here',
        createdAt: new Date(),
        user: {
          _id: 'heyitsib'
        }
      },
      {
        _id: 3,
        text: 'its the cool',
        createdAt: new Date(),
        user: {
          _id: 1
        }
      },
      {
        _id: 4,
        text: 'well this was fun',
        createdAt: new Date(),
        user: {
          _id: 'heyitsib'
        }
      }
    ]
  }
];

class MessageScreen extends React.Component {
  static navigationOptions = {
    title: 'Messages'
  };
  constructor(props) {
    super(props);
    this.state = { messages: messages };
    this.renderMessages = this.renderMessages.bind(this);
  }
  componentWillMount() {
    // console.log(
    //   'this props in message screen',
    //   this.props.navigation.state.params.userInfo
    // );
    const userConversations = this.props.login.userInfo.conversations;

    this.props.fetchConversation(userConversations[0].convoID);
    const userInfo = this.props.userInfo;
    // const convos = this.props.messages.currentConversation;
    //   // const { userToDisplay } = this.props.navigation.state.params;
    //   const userID = this.props.userInfo.uid;
    //   this.props.fetchUserMsgs(userID);
    this.setState({
      messages: userConversations,
      user: userInfo
    });
  }

  renderMessages = () => {
    return this.state.messages.map((message, idx) => {
      return (
        <View key={idx}>
          <TouchableHighlight
            onPress={() =>
              this.props.navigation.navigate('Conversation', {
                messages: message.messages
              })
            }
            underlayColor={'#999999'}
          >
            <MessageRow
              userImageUrl={message.userImageURL}
              userName={message.userName}
              //  userMessagePreview={message.user.userMessagePreview}
              userMessagePreview={'hey human. Feed Me. NOW!'}
              // lastMessageTime={message.user.lastMessageTime}
            />
          </TouchableHighlight>
        </View>
      );
    });
  };

  render() {
    console.log(
      'this state messages screen --------------',
      this.state.messages
    );
    return <View style={styles.container}>{this.renderMessages()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15
  },
  headerContainer: {
    margin: 'auto'
  }
});

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
    }
    // fetchUserProfileInfo: uid => {
    //   dispatch(fetchUserProfileInfo(uid));
    // }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageScreen);
