import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Alert } from 'react-native';

import { connect } from 'react-redux';
import {
  unfollowUser,
  followUser,
  addNewChatToCurrentUser
} from 'actions/login/index';
import {
  profileAddFollower,
  profileRemoveFollower,
  addNewChatToOtherUser
} from 'actions/profile/index';
import {
  blockUser,
  unblockUser,
} from 'db/profile/index';

import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  Spinner
} from 'native-base';
import db from 'db/firestore';
import firebase from 'db/firebase';
import { withNavigation } from 'react-navigation';
import moment from 'moment';

class Followers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      followingList: this.props.login.userInfo.following,
      following: false,
      userOnDisplay: null,
      existingConvoId: null,
      isBlocked: this.props.isBlocked,
    };
  }

  componentDidMount() {
    const currView = this.props.profile.userProfile;
    console.log("Is it blocked ", this.props.isBlocked)
    const currUsersConversations = this.props.userInfo.conversations;
    this.setState({ userOnDisplay: currView });
    const amFollowing = this.props.userInfo.following.filter(
      item => item.uid === currView.uid
    );
    const chatting = currUsersConversations.filter(item => {
      if (item.userName === currView.displayName) {
        return item;
      }
    });
    if (amFollowing.length) {
      this.setState({ following: true });
    } else {
      this.setState({ following: false });
    }
    if (chatting.length) {
      this.setState({ existingConvoId: chatting[0].convoID });
    }
  }

  async startChat() {
    const { navigate } = this.props.navigation;
    const self = this;
    const currUsersConversations = this.props.userInfo.conversations;
    const userToMsg = this.state.userOnDisplay;
    const userInfo = this.props.userInfo;
    const currTime = Date.now();
    const messageTime = moment(currTime).format('MMMM Do YYYY, h:mm:ss a');
    if (this.state.existingConvoId) {
      navigate('Conversation', {
        convoID: this.state.existingConvoId
      });
    } else {
      const addMsgRef = await db
        .collection('conversations')
        .add({ messages: [] });
      const newMsgID = addMsgRef.id;
      const userData = {
        uid: userInfo.uid,
        userName: userInfo.displayName,
        avatar: userInfo.photoURL,
        convoID: newMsgID,
        lastMessageTime: messageTime
      };

      this.props.addNewChatToOtherUser(userData, userToMsg);

      const userToMsgData = {
        uid: userToMsg.uid,
        userName: userToMsg.displayName,
        avatar: userToMsg.photoURL,
        convoID: newMsgID,
        lastMessageTime: messageTime
      };
      this.props.addNewChatToCurrentUser(userToMsgData, userInfo);
      self.setState({ existingConvoId: newMsgID });
      navigate('Conversation', {
        convoID: this.state.existingConvoId
      });
    }
  }

  handleBlockUser(userId) {
    blockUser(userId);
    this.unfollowCurrentUser();
    this.setState({ isBlocked: true });
    Alert.alert("User Succesfully Blocked");
  }

  handleUnblockUser(userId) {
    unblockUser(userId);
    this.setState({ isBlocked: false });
    Alert.alert("User Successfully Unblocked");
  }

  followCurrentUser() {
    const currUserInfo = this.props.userInfo;
    const userOnDisplayProfile = this.props.profile.userProfile;
    const { displayName, uid, photoURL } = this.props.profile.userProfile;
    const userOnDisplay = { displayName, uid, photoURL };

    this.props.followUser(userOnDisplay, currUserInfo);
    this.props.profileAddFollower(userOnDisplayProfile);
    this.setState({ following: true });
  }

  unfollowCurrentUser() {
    const currUserInfo = this.props.userInfo;
    const { displayName, uid, photoURL } = this.props.profile.userProfile;
    const userOnDisplay = { displayName, uid, photoURL };
    const userOnDisplayProfile = this.props.profile.userProfile;

    this.props.unfollowUser(userOnDisplay, currUserInfo);
    this.props.profileRemoveFollower(userOnDisplayProfile);

    this.setState({ following: false });
  }

  render() {
    const userOnDisplayProfile = this.props.profile.userProfile;
    const { displayName, uid, photoURL } = this.props.profile.userProfile;
    const userOnDisplay = { displayName, uid, photoURL };
    const blocked = this.state.isBlocked;
    return (
      <View
        style={{
          backgroundColor: '#242424',
          display: 'flex',
          flexDirection: 'row'
        }}
      >
        {this.state.following ? (
          <Button
            iconRight
            style={{
              backgroundColor: '#242424'
            }}
            onPress={() => this.unfollowCurrentUser()}
          >
            <Text
              style={{
                fontFamily: 'poppins',
                color: 'white',
                fontSize: 15
              }}
            >
              Unfollow User
            </Text>
          </Button>
        ) : (
          <Button
            iconRight
            style={{ backgroundColor: '#242424' }}
            onPress={() => this.followCurrentUser()}
            disabled={blocked}
          >
            <Text
              style={{
                fontFamily: 'poppins',
                color: 'white',
                fontSize: 15
              }}
            >
              { blocked ? 'Blocked' : 'Follow User' }
            </Text>
          </Button>
        )}
          <Button
            onPress={() => this.startChat()}
            style={{ backgroundColor: '#242424' }}
            disabled={blocked}
          >
            <Text
              style={{
                fontFamily: 'poppins',
                color: 'white',
                fontSize: 15 }}
              >
              { blocked ?  'Blocked': 'Message User' }
            </Text>
          </Button>
          {
            blocked ?
          <Button
            onPress={() => this.handleUnblockUser(userOnDisplayProfile.uid)}
            style={{ backgroundColor: '#242424' }}
          >
            <Text
              style={{
                fontFamily: 'poppins',
                color: 'white',
                fontSize: 15 }}
              >
              Unblock User
            </Text>
          </Button> :
          <Button
            onPress={() => this.handleBlockUser(userOnDisplayProfile.uid)}
            style={{ backgroundColor: '#242424' }}
          >
            <Text
              style={{
                fontFamily: 'poppins',
                color: 'white',
                fontSize: 15 }}
              >
              Block User
            </Text>
          </Button>
          }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    padding: 8,
    backgroundColor: '#D3D3D3',
    marginRight: 8
  },
  buttonText: {
    fontFamily: 'poppins',
    color: 'white',
    fontSize: 12
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    ...state,
    userInfo: state.login.userInfo,
    profile: state.profile,
    login: state.login,
    userOnView: state.profile.userProfile
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchUser: uid => {
      dispatch(fetchUser(uid));
    },
    followUser: (userObj, currInfo) => {
      dispatch(followUser(userObj, currInfo));
    },
    unfollowUser: (userObj, currInfo) => {
      dispatch(unfollowUser(userObj, currInfo));
    },
    profileAddFollower: profileInfo => {
      dispatch(profileAddFollower(profileInfo));
    },
    profileRemoveFollower: profileInfo => {
      dispatch(profileRemoveFollower(profileInfo));
    },
    addNewChatToCurrentUser: (userToMsgData, userInfo) => {
      dispatch(addNewChatToCurrentUser(userToMsgData, userInfo));
    },
    addNewChatToOtherUser: (userInfo, profileUserInfo) => {
      dispatch(addNewChatToOtherUser(userInfo, profileUserInfo));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Followers);
