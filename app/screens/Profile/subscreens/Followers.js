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
import { unfollowUser, followUser } from 'actions/login/index';
import {
  profileAddFollower,
  profileRemoveFollower
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
    this.setState({ userOnDisplay: currView });
    const amFollowing = this.props.userInfo.following.filter(
      item => item.uid === currView.uid
    );
    if (amFollowing.length) {
      this.setState({ following: true });
    } else {
      this.setState({ following: false });
    }
  }

  async alreadyChatting() {
    const { navigate } = this.props.navigation;
    const self = this;
    const currUsersConversations = this.props.userInfo.conversations;
    const userToMsg = this.state.userOnDisplay;
    console.log('=-------------------------curruser', userToMsg);
    const chatting = currUsersConversations.filter(item => {
      if (item.userName === userToMsg.displayName) {
        return item;
      }
    });
    console.log('=-------------------------chatting', chatting[0].convoID);
    if (chatting.length) {
      this.setState({ existingConvoId: chatting[0].convoID });
      // } else {
      //change to profileUser action
      //and currentuserAction
      // const newMsgRef = await db.collection('conversations').doc();

      // //console.log('-----------------------------this id ------', newMsgRef.id);
      // const userInfo = this.props.userInfo;
      // const userData = {
      //   uid: userInfo.uid,
      //   userName: userInfo.displayName,
      //   photoURL: userInfo.photoURL,
      //   convoID: newMsgRef.id
      // };
      // const userToMsgData = {
      //   uid: userToMsg.uid,
      //   userName: userToMsg.displayName,
      //   photoURL: userToMsg.photoURL,
      //   convoID: newMsgRef.id
      // };
      // const chatListUpdated = userToMsg.conversations.concat(userData);

      // const userOnViewRef = db.collection('users').doc(userToMsg.uid);
      // userOnViewRef.update({
      //   conversations: firebase.firestore.FieldValue.arrayUnion(userData)
      // });

      // const userChatsUpdated = userInfo.conversations.concat(userToMsgData);

      // const currUserOnRef = db.collection('users').doc(userInfo.uid);
      // currUserOnRef
      //   .update({
      //     conversations: firebase.firestore.FieldValue.arrayUnion(userToMsgData)
      //   })
      //   .then(function() {
      //     console.log('new chatting happening here');
      //     self.setState({ existingConvoId: newMsgRef.id });
      //   })
      // .then(
    }
    navigate('Conversation', {
      messages: [],
      convoID: this.state.existingConvoId
    });
    // );
    // }
    // this.props.navigation.navigate('Conversation', {
    //   messages: message.messages,
    //   convoID: this.state.existingConvoId
    // });
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
    // console.log('-------------------props in followers ----------', this.props);
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
    profileRemoveFollower: profileInfo =>
      dispatch(profileRemoveFollower(profileInfo))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Followers);
