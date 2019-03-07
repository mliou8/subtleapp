import config from '../../../config.js';
import DialogInput from 'react-native-dialog-input';
import { AuthSession } from 'expo';
import moment from 'moment';
import firebase from 'db/firebase';
import db from 'db/firestore';
import { userUpdated } from '../login';

export const POSTS_FETCH = 'POSTS_FETCH';

export const postsFetch = (postType, posts) => {
  return {
    type: POSTS_FETCH,
    postType,
    posts
  };
};

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


export function fetchPosts(type) {
  return async dispatch => {
    const postRef = db.collection("posts").where("type", "==", type);
    try {
      const post = await postRef.get().then(function(posts) {
       const postArr = []
       posts.forEach((post) => {
         postArr.push(post.data());
       })
       dispatch(postsFetch(type, postArr));
      })
      return post;
    }
    catch (err) {
      console.log("Error in retrieving posts: ", err)
    };
  }
};
