import config from '../../../config.js';
import { Alert } from 'react-native';
import { AuthSession } from 'expo';
import moment from 'moment';
import firebase from 'db/firebase';
import db from 'db/firestore';

export const USER_MESSAGES_FETCHED = 'USER_MESSAGES_FETCHED';
export const USER_CONVERSATION_FETCHED = 'USER_CONVERSATION_FETCHED';
export const USER_CONVERSATION_N0T_FOUND = 'USER_CONVERSATION_N0T_FOUND';
// export const USER_MESSAGE_SENT = 'USER_MESSAGE_SENT';
// export const USER_MESSAGE_DELETED = 'USER_MESSAGE_DELETED';
export const CONVERSATION_UPDATED = 'CONVERSATION_UPDATED';

export const userMessagesFetched = userMsgs => {
  return {
    type: USER_MESSAGES_FETCHED,
    userMsgs
  };
};

export const userMessagesNotFound = errorMsg => {
  return {
    type: USER_MESSAGES_NOT_FOUND,
    errorMsg
  };
};

export const userConversationFetched = userConversation => {
  return {
    type: USER_CONVERSATION_FETCHED,
    userConversation
  };
};
export const userConversationNotFound = userProfile => {
  return {
    type: USER_CONVERSATION_N0T_FOUND,
    userProfile
  };
};

export const userConversationUpdated = updatedConversation => {
  return {
    type: CONVERSATION_UPDATED,
    updatedConversation
  };
};

// export const userMessageSent= (newMessage) => {
//     return {
//       type: USER_MESSAGE_SENT,
//       newMessage
//     };
//   };

// export const userMessageDeleted= (userProfile) => {
//     return {
//       type: USER_MESSAGE_DELETED,
//       userProfile
//     };
//   };

export const fetchUserMsgs = userID => {
  return async dispatch => {
    var docRef = db.collection('users').doc(`${userID}`);

    docRef.get().then(function(doc) {
      if (doc.exists) {
        const { messages } = doc.data();
        dispatch(userMessagesFetched(messages));
      } else {
        const msg = 'cant find any messages';

        dispatch(userMessagesFetched(msg));
      }
    });
  };
};

export const fetchConversation = convoID => {
  return async dispatch => {
    const docRef = db.collection('conversations').doc(convoID);
    docRef.get().then(function(doc) {
      if (doc.exists) {
        const conversation = doc.data();

        dispatch(userConversationFetched(conversation));
      } else {
        const msg = 'No such user with that uid';

        dispatch(userMessagesNotFound(msg));
      }
    });
    // .catch(function(error) {
    //   const msg = 'Error Retrieving User Document';
    //   dispatch(userMessagesNotFound(msg));
    // });
  };
};

export const sendNewMsg = (convoId, newMsg, currMsgs) => {
  return async dispatch => {
    // const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    // newMsg.timeSent = timestamp;
    const updatedConvo = currMsgs.push(newMsg);
    const currUserRef = db.collection('conversations').doc(convoId);
    currUserRef
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion(newMsg)
      })
      .then(function() {
        //console.log('data added');
        dispatch(userConversationUpdated(updatedConvo));
      });
  };
};

//   export const removeUserMsg = (networkObj, currentUser) => {
//     return async dispatch => {
//       const userRef = db.collection('users').doc(currentUser.uid);
//       return db
//         .runTransaction(transaction => {
//           return transaction.get(userRef).then(function(user) {
//             if (!user.exists) {
//               throw 'Document does not exist!';
//             }
//             const currentNetworks = user.data().socialNetworks;
//             const filteredNetworks = currentNetworks.filter(networks => {
//               return networks.source !== networkObj.source;
//             });
//             if (filteredNetworks.length === 0) {
//               filteredNetworks = [{}];
//             }
//             // currentUser.socialNetworks = filteredNetworks;
//             transaction.update(userRef, { socialNetworks: filteredNetworks });
//             return user.data().uid;
//           });
//         })
//         .then(function(uid) {
//           console.log('Document successfully updated ', uid);
//           dispatch(updateUser(uid));
//           // dispatch(userUpdated(currentUser));
//         })
//         .catch(function(error) {
//           console.error('Error updating document: ', error);
//         });
//     };
//   };

// function testMsg(convoId) {
//   db.collection('conversations')
//     .doc(convoId)
//     .onSnapshot(function(doc) {
//       console.log('Current data: ', doc.data());
//     });
// }

// testMsg('tcudaUCLo5R9LjERXqzA');

// testMsg('tcudaUCLo5R9LjERXqzA');

// function testMsgAdd(convoId, newMsg) {
//   // const timestamp = firebase.firestore.FieldValue.serverTimestamp();
//   // newMsg.timeSent = timestamp;
//   const currUserRef = db.collection('conversations').doc(convoId);
//   currUserRef
//     .update({
//       messages: firebase.firestore.FieldValue.arrayUnion(newMsg)
//     })
//     .then(function() {
//       console.log('data added');
//     });
// }
// const convos = {
//   author: 'Bailey',
//   text: 'hi human who feeds me!',
//   timeSent: new Date()
// };

// testMsgAdd('tcudaUCLo5R9LjERXqzA', convos);
