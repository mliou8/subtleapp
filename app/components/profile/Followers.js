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

  followUser() {
    var user = firebase.auth().currentUser;
    const catData = {
      uid: 'AobBHaD1U9WJWOCMNFC8',
      displayName: 'bailey',
      photoURL: 'https://loremflickr.com/176/230/cat'
    };
    const userData = {
      uid: user.uid,
      displayName: user.providerData[0].displayName,
      photoURL: user.providerData[0].photoURL
    };
    const currUser = db.collection('users').doc(user.uid);
    const userOnView = db.collection('users').doc(catData.uid);
    // const userOnView = db.collection('users').doc(userOnDisplay.uid);
    const nowFollowing = this.state.followingList;
    nowFollowing.push(catData);
    currUser.update({
      following: firebase.firestore.FieldValue.arrayUnion(catData)
    });
    userOnView
      .update({
        followers: firebase.firestore.FieldValue.arrayUnion(userData)
      })
      .then(function() {
        console.log('Document successfully written!');
      });
    this.setState({ following: true });
  }

  async unfollowUser() {
    var user = firebase.auth().currentUser;
    const catData = {
      uid: 'AobBHaD1U9WJWOCMNFC8',
      displayName: 'bailey',
      photoUrl: 'https://loremflickr.com/176/230/cat'
    };
    const userData = {
      uid: user.uid,
      displayName: user.providerData[0].displayName,
      photoURL: user.providerData[0].photoURL
    };
    // docRef.get().then(function(doc) {
    const currUser = db.collection('users').doc(user.uid);
    const userOnViewRef = db.collection('users').doc(catData.uid);
    const userOnViewFollowers = await userOnViewRef.get().then(function(doc) {
      console.log('doc is stuff', doc.data().followers);
      // userOnViewFollowers = doc.data().followers;
      return doc.data().followers;
    });

    console.log('user stuff on view', userOnViewFollowers);
    const nowFollowing = this.state.followingList.filter(
      item => item.uid !== catData.uid
    );
    const currFollowers = userOnViewFollowers.filter(
      item => item.uid !== user.uid
    );
    currUser.update({
      following: nowFollowing
    });
    // regions: firebase.firestore.FieldValue.arrayRemove("east_coast")
    userOnViewRef
      .update({
        followers: currFollowers
      })
      .then(function() {
        console.log('Document successfully written!');
      });
    this.setState({ following: false });
  }
  render() {
    // console.log('this props in followers component', this.props.userOnDisplay);

    return (
      <View style={styles.container}>
        <View style={{ justifyContent: 'center' }}>
          {this.state.following ? (
            <TouchableOpacity
              onPress={() => this.unfollowUser()}
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
              onPress={() => this.followUser()}
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
    userProfile: state.profile.userProfile,
    profile: state.profile,
    login: state.login
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchUser: uid => {
      dispatch(fetchUser(uid));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Following);
