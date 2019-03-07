import firebase from "db/firebase";
import db from "../db";

export async function sendReaction(postID, reaction) {
  var postRef = db.collection("posts").where("type", "==", "general");

  try {
    const post = await postRef.get()
     .then(function(posts) {
       const postArr = []
       posts.forEach((post) => {
         postArr.push(post.data());
       })
       return postArr;
      })
    return post;
  } catch (err) {
    console.log("Error in sending reaction: ", err)
  };
 };
