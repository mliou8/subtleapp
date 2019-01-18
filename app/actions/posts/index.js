import config from '../../../config.js';
import DialogInput from 'react-native-dialog-input';
import { AuthSession } from 'expo';
import moment from 'moment';
import firebase from 'db/firebase';
import db from 'db/firestore';
import userUpdated from './login';

export const newGeneralPost = (postInfo, currUserInfo) => {
  return async dispatch => {
    const user = firebase.auth().currentUser;
    const currUserRef = db.collection('users').doc(user.uid);
    const currUserPostsUpdated = currUserInfo;
    const currPosts = [...currUserInfo.posts, postInfo];

    currUserPostsUpdated.posts = currPosts;

    currUserRef
      .update({
        posts: firebase.firestore.FieldValue.arrayUnion(postInfo)
      })
      .then(function() {
        dispatch(userUpdated(currUserPostsUpdated));
      });
  };
};
