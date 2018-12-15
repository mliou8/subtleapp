import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "app/components/common/TabBarIcon";
import BoardScreen from "app/screens/Board/BoardScreen";
import ProfileScreen from "app/screens/Profile/ProfileScreen";
import PostFullScreen from "app/screens/Post/PostFullScreen";
import SubmitSelectionScreen from "app/screens/Submit/SubmitSelectionScreen";
import MessageScreen from "app/screens/Messages/MessageScreen";
import Conversation from "app/screens/Messages/FullConversation";

const HomeStack = createStackNavigator({
  Home: BoardScreen,
  Post: PostFullScreen,
  Messages: MessageScreen,
  Conversation: Conversation
});

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={"ios-keypad"} />
    //   other options: md-list-box
    //   //ios-images
    //   //ios-paper
    //   //md-apps
  )
};

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
  Messages: MessageScreen,
  Conversation: Conversation
});

ProfileStack.navigationOptions = {
  tabBarLabel: "Profile",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={"md-person"} />
    //   //md-options
    //   //md-contact
    // />
  )
};

const SubmitStack = createStackNavigator({
  Submit: SubmitSelectionScreen
});

SubmitStack.navigationOptions = {
  tabBarLabel: "Submit",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={"ios-add-circle"} />
  )
};

export default createBottomTabNavigator({
  HomeStack,
  SubmitStack,
  ProfileStack
});
