import firebase from 'db/firebase';
import db from '../db';

export async function sendReaction(postID, reaction) {
  const postRef = db.collection('posts').doc(postID);
  const reactiontoAdd = { reaction: reaction };
  try {
    await postRef.update(reactiontoAdd);
  } catch (err) {
    console.log('Error in sending reaction: ', err);
  }
}

export async function addComment(postId, commentInfo) {
  const postRef = db.collection('posts').doc(`${postId}`);

  try {
    await postRef.update({
      comments: firebase.firestore.FieldValue.arrayUnion(commentInfo)
    });
  } catch (err) {
    console.log('Error in sending reaction: ', err);
  }
}

export async function deleteComment(postId, commentInfo) {
  const postRef = db.collection('posts').doc(`${postId}`);

  try {
    await postRef.update({
      comments: firebase.firestore.FieldValue.arrayRemove(commentInfo)
    });
  } catch (err) {
    console.log('Error in sending reaction: ', err);
  }
}
export async function deletePost(postId) {
  db.collection('posts')
    .doc(`${postId}`)
    .delete()
    .then(function() {
      console.log('Document successfully deleted!');
    })
    .catch(function(error) {
      console.error('Error removing document: ', error);
    });
}
