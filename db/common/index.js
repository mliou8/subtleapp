import firebase from "db/firebase";
import db from "../db";

export async function sendReaction(postID, reaction) {
  const postRef = db.collection("posts").doc(postID);
  const reactiontoAdd = {reaction: reaction};
  try {
    await postRef.update(reactiontoAdd);
  } catch (err) {
    console.log("Error in sending reaction: ", err)
  };
 };
