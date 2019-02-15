import firebase from "db/firebase";
import db from "../db";

export async function fetchPost(postID) {
  const postRef = db.collection("posts").doc(postID)
  try {
    const post = await postRef.get()
     .then(function(post) {
        if (post.exists) {
          return post.data();
        } else {
          return null;
        }
      })
    return post;
  }
  catch (err) {
    console.log("Error in retrieving user: ", err)
  };
 };
