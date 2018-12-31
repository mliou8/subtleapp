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

class Following extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      followingList: this.props.login.userInfo.following,
      following: false,
      userOnDisplay: this.props.userOnDisplay
    };
  }
  componentDidMount() {
    const currView = this.props.profile.userProfile;
    const amFollowing = this.props.userInfo.following.filter(
      item => item.uid === currView.uid
    );
    if (amFollowing.length) {
      this.setState({ following: true });
    } else {
      this.setState({ following: false });
    }
  }
  // componentDidUpdate() {
  //   const currView = this.props.profile.userProfile;
  //   const amFollowing = this.props.userInfo.following.filter(
  //     item => item.uid === currView.uid
  //   );
  //   if (amFollowing.length) {
  //     this.setState({ following: true });
  //   } else {
  //     this.setState({ following: false });
  //   }
  // }

  followCurrentUser() {
    const currUserInfo = this.props.userInfo;
    const { displayName, uid, photoURL } = this.props.profile.userProfile;
    const userOnDisplay = { displayName, uid, photoURL };
    const userOnDisplayProfile = this.props.profile.userProfile;

    this.props.followUser(userOnDisplay, currUserInfo);
    this.props.profileAddFollower(userOnDisplay.uid, userOnDisplayProfile);
    this.setState({ following: true });
  }

  unfollowCurrentUser() {
    const currUserInfo = this.props.userInfo;
    const { displayName, uid, photoURL } = this.props.profile.userProfile;
    const userOnDisplay = { displayName, uid, photoURL };
    const userOnDisplayProfile = this.props.profile.userProfile;
    this.props.unfollowUser(userOnDisplay, currUserInfo);
    this.props.profileRemoveFollower(userOnDisplay.uid, userOnDisplayProfile);

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
