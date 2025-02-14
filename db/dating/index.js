import firebase from "db/firebase";
import db from "../db";


export async function fetchPosts() {
  var postRef = db.collection('posts').where('type', '==', 'dating');

  try {
    const post = await postRef.get().then(function(posts) {
      const postArr = [];
      posts.forEach(post => {
        postArr.push(post.data());
      });
      return postArr;
    });
    return post;
  } catch (err) {
    console.log('Error in retrieving posts: ', err);
  }
}
