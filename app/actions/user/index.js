import config from "../../../config.js";
import { Alert } from "react-native";
import { AuthSession } from "expo";
import firebase from "db/firebase";

export const EDIT_USER_SUCCESS = "EDIT_USER_SUCCESS";
export const EDIT_USER_FAIL = "EDIT_USER_FAIL";

function editUserSuccess(currentUser) {
  return {
    type: EDIT_USER_SUCCESS,
    currentUser: currentUser,
  };
}

function editUserFail(errorMsg) {
  return {
    type: EDIT_USER_FAIL,
    errorMsg
  };
}
