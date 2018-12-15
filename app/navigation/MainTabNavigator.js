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
import LandingPage from "app/screens/Login/LandingPage";
import EmailSignup from "app/screens/Login/EmailSignup";

const HomeStack = createStackNavigator({
  Home: BoardScreen,
  Post: PostFullScreen,
  Messages: MessageScreen,
  Conversation: Conversation
});

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
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
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-checkbox${focused ? "" : "-outline"}`
          : "md-link"
      }
    />
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

const LoginStack = createStackNavigator({
  LandingPage: LandingPage,
  EmailSignup: EmailSignup
});


export default createBottomTabNavigator({
  HomeStack,
  SubmitStack,
  ProfileStack,
  LoginStack,
});
