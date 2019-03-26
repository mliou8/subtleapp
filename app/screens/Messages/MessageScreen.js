import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  TouchableHighlight,
  RefreshControl
} from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import { Icon, Text, Button } from 'native-base';

import MessageRow from 'app/components/messages/MessageRow';

class MessageScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Messages',
      headerLeftContainerStyle: {
        marginLeft: 10, marginTop: 15
      },
      headerStyle: { backgroundColor: '#242424', height: 80 },

      headerTitleStyle: {
        fontFamily: 'poppinsBold',
        color: 'white',
        fontSize: 20
      },
      headerLeft: (
        <Button transparent onPress={() => navigation.goBack()}>
          <Icon
            name="chevron-left"
            type="FontAwesome"
            style={{ color: 'white', fontSize: 25}}
          />
        </Button>
      )
    };
  };
  constructor(props) {
    super(props);
    this.state = { messagesArray: [], refreshing: false };

    this.renderMessages = this.renderMessages.bind(this);
  }
  componentDidMount() {
    const activeConversationsArray = this.props.login.userInfo.conversations;
    const userInfo = this.props.userInfo;

    const newMsgs = activeConversationsArray;
    this.setState({
      messagesArray: newMsgs,
      user: userInfo
    });
  }

  renderMessages = () => {
    return this.state.messagesArray.map((message, idx) => {
      return (
        <View key={idx}>
          <TouchableHighlight
            onPress={() =>
              this.props.navigation.navigate('Conversation', {
                convoID: message.convoID,
                friend: message.userName
              })
            }
            underlayColor={'#999999'}
          >
            <MessageRow
              style={{ fontFamily: 'poppins' }}
              userImageUrl={message.avatar}
              userName={message.userName}
              lastMessageTime={message.lastMessageTime}
            />
          </TouchableHighlight>
        </View>
      );
    });
  };

  render() {
    return (
      <ScrollView 
        style={{ backgroundColor: 'white' }}
        >
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
    conversations: state.login.userInfo.conversations
  };
};

export default connect(
  mapStateToProps,
  null
)(MessageScreen);
