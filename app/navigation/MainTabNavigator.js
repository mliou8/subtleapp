import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';

import TabBarIcon from 'app/components/common/TabBarIcon';
import OwnProfileScreen from 'app/containers/Profile/OwnProfileContainer';
import GenericProfileScreen from 'app/screens/Profile/GenericProfileScreen';
import OtherUsersProfileScreen from 'app/screens/Profile/OtherUsersProfileScreen';
import FollowersListScreen from 'app/screens/Profile/subscreens/FollowersList';
import PostFullScreen from 'app/screens/Post/PostFullScreen';

import SubmitContentContainer from '../containers/Submit/SubmitContentContainer';
import SubmitSelectionScreen from '../screens/Submit/SubmitSelectionScreen';
import SubmitDatingScreen from '../screens/Submit/SubmitDating';

import MessageScreen from 'app/screens/Messages/MessageScreen';
import Conversation from 'app/screens/Messages/FullConversation';
import AddSocialNetworkTag from 'app/screens/Profile/AddSocialNetwork';
import BoardScreen from 'app/screens/Board/BoardScreen';
import FullPost from 'app/components/board/FullPost';
import MosaicScreen from 'app/screens/Board/MosaicView';
import SettingsScreen from 'app/containers/Profile/SettingsContainer';

const HomeStack = createStackNavigator({
  Home: BoardScreen,
  Post: PostFullScreen,
  Messages: MessageScreen,
  Conversation: Conversation,
  FullPost: FullPost,
  Mosaic: MosaicScreen,
  GenericProfileScreen: GenericProfileScreen,
  OtherUsersProfile: OtherUsersProfileScreen
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
  OtherUsersProfile: OtherUsersProfileScreen,
  Followers: Followers
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
  SubmitDating: SubmitDatingScreen,
  Home: BoardScreen
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
  ProfileStack
});
