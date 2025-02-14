import firebase from 'db/firebase';
import db from '../db';
import moment from 'moment';

export async function fetchPosts() {
  const postRef = db.collection('posts').where('type', '==', 'general');

  try {
    const post = await postRef.get().then(function(posts) {
      const postArr = [];
      posts.forEach(post => {
        const postInfo = post.data();
        postInfo.id = post.id;
        postArr.push(postInfo);
      });
      return postArr;
    });
    return post;
  } catch (err) {
    console.log('Error in retrieving posts: ', err);
  }
}
