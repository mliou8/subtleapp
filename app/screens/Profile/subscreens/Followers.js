import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button
} from 'react-native';
import { Icon } from 'expo';
import { connect } from 'react-redux';
import { unfollowUser, followUser, userAddChat } from 'actions/login/index';
import {
  profileAddFollower,
  profileRemoveFollower,
  profileAddChat
} from 'actions/profile/index';
import db from 'db/firestore';
import firebase from 'db/firebase';
import { withNavigation } from 'react-navigation';

class Followers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      followingList: this.props.login.userInfo.following,
      following: false,
      userOnDisplay: null,
      existingConvoId: null
    };
  }
  componentDidMount() {
    const currView = this.props.profile.userProfile;
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

  async alreadyChatting() {
    const { navigate } = this.props.navigation;
    const self = this;
    const currUsersConversations = this.props.userInfo.conversations;
    const userToMsg = this.state.userOnDisplay;
    const userInfo = this.props.userInfo;

    if (this.state.existingConvoId) {
      navigate('Conversation', {
        messages: [],
        convoID: this.state.existingConvoId
      });
    } else {
      // const newMsgRef = await db.collection('conversations').doc();
      // const newMsgID = newMsgRef.id;
      // const addMsgRef = await db
      //   .collection('conversations')
      //   .doc(newMsgID)
      //   .set({ messages: [] });
      const addMsgRef = await db
        .collection('conversations')
        .add({ messages: [] });
      const newMsgID = addMsgRef.id;
      const userData = {
        uid: userInfo.uid,
        userName: userInfo.displayName,
        avatar: userInfo.photoURL,
        convoID: newMsgID
      };

      this.props.profileAddChat(newMsgID, userData, userToMsg);
      const userToMsgData = {
        uid: userToMsg.uid,
        userName: userToMsg.displayName,
        avatar: userToMsg.photoURL,
        convoID: newMsgID
      };

      this.props.userAddChat(newMsgID, userToMsgData, userInfo);

      self.setState({ existingConvoId: newMsgID });
      navigate('Conversation', {
        messages: [],
        convoID: newMsgID
      });
    }
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
    const currUserInfo = this.props.userInfo;
    const userOnDisplayProfile = this.props.profile.userProfile;
    const { displayName, uid, photoURL } = this.props.profile.userProfile;
    const userOnDisplay = { displayName, uid, photoURL };

    return (
      <View style={styles.container}>
        <View style={{ justifyContent: 'center' }}>
          {this.state.following ? (
            <TouchableOpacity
              onPress={() => this.unfollowCurrentUser()}
              style={{
                borderRadius: 8,
                flexDirection: 'row',
                padding: 1
              }}
            >
              <Text> Following: </Text>
              <Icon.FontAwesome
                name={'check-circle'}
                size={15}
                title="messages"
                style={{ color: 'dodgerblue' }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => this.followCurrentUser()}
              style={{
                borderRadius: 8,
                flexDirection: 'row',
                padding: 1
              }}
            >
              <Text> Following: </Text>
              <Icon.MaterialIcons
                name={'check-box-outline-blank'}
                size={15}
                title="messages"
                style={{ color: 'grey' }}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={{ justifyContent: 'space-between' }}>
          <TouchableOpacity
            style={{ paddingLeft: 4 }}
            onPress={() => this.alreadyChatting()}
          >
            <Icon.Ionicons name={'ios-send'} size={15} title="messages">
              <Text> Message User </Text>
            </Icon.Ionicons>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row'
  },
  button: {
    borderRadius: 8,
    padding: 8,
    backgroundColor: '#D3D3D3',
    marginRight: 8
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
    userAddChat: (newMsgID, userToMsgData, userInfo) => {
      dispatch(userAddChat(newMsgID, userToMsgData, userInfo));
    },
    profileAddChat: (convoID, userInfo, profileUserInfo) => {
      dispatch(profileAddChat(convoID, userInfo, profileUserInfo));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Followers);
