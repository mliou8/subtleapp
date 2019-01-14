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

import MessageRow from 'app/components/messages/MessageRow';

class MessageScreen extends React.Component {
  static navigationOptions = {
    title: 'Messages'
  };
  constructor(props) {
    super(props);
    this.state = { messages: [] };
    this.renderMessages = this.renderMessages.bind(this);
  }
  componentDidMount() {
    const userConversations = this.props.login.userInfo.conversations;

    const userInfo = this.props.userInfo;

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
                messages: message.messages,
                convoID: message.convoID
              })
            }
            underlayColor={'#999999'}
          >
            <MessageRow
              userImageUrl={message.avatar}
              userName={message.userName}
              //  userMessagePreview={message.user.userMessagePreview}
              userMessagePreview={'your chat with...'}
              // userMessagePreview={'hey human. Feed Me. NOW!'}
              // lastMessageTime={message.user.lastMessageTime}
            />
          </TouchableHighlight>
        </View>
      );
    });
  };

  render() {
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
    profile: state.profile
  };
};

export default connect(
  mapStateToProps,
  null
)(MessageScreen);
