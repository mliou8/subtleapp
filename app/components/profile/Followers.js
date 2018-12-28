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
const catData = {
  uid: 'AobBHaD1U9WJWOCMNFC8',
  displayName: 'Bailey',
  photoURL: 'https://loremflickr.com/176/230/cat'
};
// const catData = {
//   uid: 'MvFyxRN66DNfmXFBpIMP',
//   displayName: 'GrumpyCat',
//   photoURL: 'https://loremflickr.com/176/230/cat'
// };
// const catData = {
//   uid: 'oJVkbWMJWAMaKyEJmSkZ',
//   displayName: 'Belle',
//   photoURL: 'https://loremflickr.com/176/230/cat'
// };
// const catData = {
//   uid: 'qo7fZPgVMsLeMYInRL0n',
//   displayName: 'Berkely',
//   photoURL: 'https://loremflickr.com/176/230/cat'
// };
// const catData = {
//   uid: '9huXTnWl7raXLktU9hrz',
//   displayName: 'Maru',
//   photoURL: 'https://loremflickr.com/176/230/cat'
// };

class Following extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      followingList: this.props.login.userInfo.following,
      following: false,
      userOnDisplay: this.props.userOnDisplay
    };
  }

  followCurrentUser() {
    const currUserInfo = this.props.userInfo;
    this.props.followUser(catData, currUserInfo);
    this.props.profileAddFollower(catData.uid);
    // this.props.followUser(userObj);
    // this.props.profileAddFollower(userID);
    this.setState({ following: true });
  }

  unfollowCurrentUser() {
    const currUserInfo = this.props.userInfo;
    this.props.unfollowUser(catData, currUserInfo);
    this.props.profileRemoveFollower(catData.uid);
    // this.props.unfollowUser(userObj);
    // this.props.profileRemoveFollower(profileUserID);
    this.setState({ following: false });
  }
  render() {
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
          <TouchableOpacity style={{ paddingLeft: 4 }}>
            <Icon.Ionicons
              // style={{ justifyContent: 'flex-end' }}
              name={'ios-send'}
              size={15}
              title="messages"
            >
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
    // flexWrap: 'wrap'
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
    login: state.login
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

    profileAddFollower: profileUserID => {
      dispatch(profileAddFollower(profileUserID));
    },
    profileRemoveFollower: profileUserID =>
      dispatch(profileRemoveFollower(profileUserID))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Following);
