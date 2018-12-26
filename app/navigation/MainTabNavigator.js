import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "app/components/common/TabBarIcon";
import OwnProfileScreen from "app/screens/Profile/OwnProfileScreen";
import GenericProfileScreen from "app/screens/Profile/GenericProfileScreen";
import FollowersListScreen from "app/screens/Profile/FollowersList";
import PostFullScreen from "app/screens/Post/PostFullScreen";
import SubmitSelectionScreen from "app/screens/Submit/SubmitSelectionScreen";
import MessageScreen from "app/screens/Messages/MessageScreen";
import Conversation from "app/screens/Messages/FullConversation";
import AddSocialNetworkTag from "app/screens/Profile/AddSocialNetwork";
import BoardScreen from "app/screens/Board/BoardScreen";
import FullPost from "app/components/board/FullPost";
import MosaicScreen from "app/screens/Board/MosaicView";

const HomeStack = createStackNavigator({
  Home: BoardScreen,
  Post: PostFullScreen,
  Messages: MessageScreen,
  Conversation: Conversation,
  FullPost: FullPost,
  Mosaic: MosaicScreen,
  GenericProfileScreen: GenericProfileScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={"ios-keypad"} />
  )
};

const ProfileStack = createStackNavigator({
  Profile: OwnProfileScreen,
  Messages: MessageScreen,
  Conversation: Conversation,
  FollowersList: FollowersListScreen,
  AddSocialNetwork: AddSocialNetworkTag
});

ProfileStack.navigationOptions = {
  tabBarLabel: "Profile",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={"md-person"} />
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
