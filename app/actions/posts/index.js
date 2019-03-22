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
    currUserRef
      .update({
        posts: firebase.firestore.FieldValue.arrayUnion(postInfo)
      })
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
