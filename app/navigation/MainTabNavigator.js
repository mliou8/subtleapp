import React, { Component } from 'react';
import { Platform, Button } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import { Icon } from 'native-base';

import TabBarIcon from "app/components/common/TabBarIcon";
import OwnProfileScreen from "app/containers/Profile/OwnProfileContainer";
import GenericProfileScreen from "app/screens/Profile/GenericProfileScreen";
import OtherUsersProfileScreen from 'app/screens/Profile/OtherUsersProfileScreen';
import FollowersListScreen from "app/screens/Profile/subscreens/FollowersList";
import PostFullScreen from "app/screens/Post/PostFullScreen";

import SubmitContentContainer from "../containers/Submit/SubmitContentContainer";
import SubmitSelectionScreen from "../screens/Submit/SubmitSelectionScreen";
import SubmitDatingScreen from "../screens/Submit/SubmitDating";

import MessageScreen from "app/screens/Messages/MessageScreen";
import Conversation from "app/screens/Messages/FullConversation";
import AddSocialNetworkTag from "app/screens/Profile/AddSocialNetwork";
import FullPost from "app/components/board/FullPost";
import SettingsScreen from "app/containers/Profile/SettingsContainer";
import { BoardScreen } from "app/screens/Board/BoardScreen";
import DrawerNavigator from "./DrawerNavigator";

const HomeStack = createStackNavigator({
    Home: {
      screen: DrawerNavigator,
      navigationOptions: ({ navigation }) => ({
      title: 'Subtle Asian App',
      headerRight: (
          <Icon
            type="Entypo"
            name="mail-with-circle"
            onPress={() => navigation.navigate('Messages')}
            style={{ color: 'black', fontSize: 30, marginRight: 20 }}
          />
      ),
      headerLeft: (
        <Icon
          type="FontAwesome"
          name="align-left"
          style={{ marginLeft: 10 }}
          onPress={() => navigation.toggleDrawer()}
        />
        ),
      }),
    },
    Post: PostFullScreen,
    Messages: MessageScreen,
    Conversation: Conversation,
    FullPost: FullPost,
    GenericProfileScreen: GenericProfileScreen,
    OtherUsersProfile: OtherUsersProfileScreen,
  });

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'ios-keypad'} />
  )
};

const ProfileStack = createStackNavigator({
  Profile: OwnProfileScreen,
  Messages: MessageScreen,
  Conversation: Conversation,
  FollowersList: FollowersListScreen,
  AddSocialNetwork: AddSocialNetworkTag,
  Settings: SettingsScreen,
  OtherUsersProfile: OtherUsersProfileScreen
});

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'md-person'} />
  )
};

const SubmitStack = createStackNavigator({
  SubmitSelection: SubmitSelectionScreen,
  SubmitContent: SubmitContentContainer,
  SubmitDating: SubmitDatingScreen
});

SubmitStack.navigationOptions = {
  tabBarLabel: 'Submit',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'ios-add-circle'} />
  )
};

export default createBottomTabNavigator({
  HomeStack,
  SubmitStack,
  ProfileStack,
});
