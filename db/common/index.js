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
  // const reactiontoAdd = { reaction: reaction };
  //add array union .
  console.log(
    'this is comment Info inside of the add comment funciton',
    commentInfo
  );
  try {
    await postRef.update({
      comments: firebase.firestore.FieldValue.arrayUnion(commentInfo)
    });
  } catch (err) {
    console.log('Error in sending reaction: ', err);
  }
}
