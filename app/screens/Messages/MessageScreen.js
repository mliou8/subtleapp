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
  RefreshControl
} from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';

import MessageRow from 'app/components/messages/MessageRow';

class MessageScreen extends React.Component {
  static navigationOptions = {
    title: 'Messages'
  };
  constructor(props) {
    super(props);
    this.state = { messagesArray: [], refreshing: false };
    this._mounted = true;
    this.renderMessages = this.renderMessages.bind(this);
  }
  componentDidMount() {
    this._mounted = true;
    const userActiveConversationsArray = this.props.login.userInfo
      .conversations;
    const userInfo = this.props.userInfo;
    const userActiveConversationsList = userActiveConversationsArray.map(
      item => {
        let oldTime = item.lastMessageTime;
        const jstime = oldTime.toDate();

        item.lastMessageTime = moment(jstime).format('lll');
        return item;
      }
    );
    const newMsgs = userActiveConversationsList;

    this.setState({
      messagesArray: userActiveConversationsArray,
      user: userInfo
    });
  }
  componentWillUnmount() {
    this._mounted = false;
  }

  renderMessages = () => {
    return this.state.messagesArray.map((message, idx) => {
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
              userMessagePreview={'your chat with...'}
              lastMessageTime={message.lastMessageTime}
            />
          </TouchableHighlight>
        </View>
      );
    });
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>{this.renderMessages()}</View>
      </ScrollView>
    );
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
