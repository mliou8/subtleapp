import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/common/TabBarIcon';
import BoardScreen from '../screens/Board/BoardScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import PostFullScreen from '../screens/Post/PostFullScreen';
import SubmitSelectionScreen from '../screens/Submit/SubmitSelectionScreen';

const HomeStack = createStackNavigator({
  Home: BoardScreen,
  Post: PostFullScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
});

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-checkbox${focused ? '' : '-outline'}` : 'md-link'}
    />
  ),
};

const SubmitStack = createStackNavigator({
  Submit: SubmitSelectionScreen,
})

SubmitStack.navigationOptions = {
  tabBarLabel: 'Submit',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'ios-add-circle'}
    />
  ),
}

export default createBottomTabNavigator({
  HomeStack,
  SubmitStack,
  ProfileStack,
});
