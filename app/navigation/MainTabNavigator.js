import React, { Component } from 'react';
import { Platform } from 'react-native';
import { Button, Text, View } from 'native-base';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';
import { Icon, Fab } from 'native-base';
import TabBarIcon from 'app/components/common/TabBarIcon';
import OwnProfileScreen from 'app/containers/Profile/OwnProfileContainer';
import GenericProfileScreen from 'app/screens/Profile/GenericProfileScreen';
import OtherUsersProfileScreen from 'app/screens/Profile/OtherUsersProfileScreen';
import FollowersListScreen from 'app/screens/Profile/subscreens/FollowersList';
import PostFullScreen from 'app/screens/Post/PostFullScreen';
import BulletinScreen from 'app/screens/Board/BulletinScreen';
import SubmitBase from 'app/containers/Submit/SubmitBaseContainer';
import MessageScreen from 'app/screens/Messages/MessageScreen';
import Conversation from 'app/screens/Messages/FullConversation';
import AddSocialNetworkTag from 'app/screens/Profile/AddSocialNetwork';
import FullPost from 'app/components/board/FullPost';
import SettingsScreen from 'app/containers/Profile/SettingsContainer';
import DrawerNavigator from './DrawerNavigator';

const HomeStack = createStackNavigator({
  Home: {
    screen: DrawerNavigator,
    navigationOptions: ({ navigation }) => ({
      title: 'Subtle Asian App',
      headerStyle: {
        backgroundColor: '#242424',
        height: 80,
        borderBottomWidth: 0
      },
      headerTitleStyle: {
        fontFamily: 'poppinsBold',
        color: 'white',
        fontSize: 20
      },

      headerRightContainerStyle: {
        marginRight: 10,
        marginTop: 15
      },
      headerLeftContainerStyle: {
        marginLeft: 10,
        marginTop: 3
      },
      headerRight: (
        <Button transparent onPress={() => navigation.navigate('Messages')}>
          <Icon
            type="FontAwesome"
            name="envelope-open"
            style={{ color: 'white', fontSize: 26 }}
          />
        </Button>
      ),
      headerLeft: (
        <Icon
          type="FontAwesome"
          name="align-left"
          style={{ fontSize: 26, color: 'white' }}
          onPress={() => navigation.toggleDrawer()}
        />
      )
    })
  },
  Post: PostFullScreen,
  Messages: MessageScreen,
  Conversation: Conversation,
  FullPost: FullPost,
  GenericProfileScreen: GenericProfileScreen,
  OtherUsersProfile: OtherUsersProfileScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'ios-home'} />
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
    <TabBarIcon focused={focused} name={'ios-person'} />
  )
};

const SubmitStack = createStackNavigator({
  SubmitBase: SubmitBase,
  Home: BulletinScreen
});

SubmitStack.navigationOptions = ({ navigation }) => ({
  tabBarLabel: <View />,
  tabBarIcon: (
    <Fab
      direction="up"
      style={{
        backgroundColor: '#242424',
        borderRadius: 10,
        alignContent: 'center',
        position: 'absolute',
        bottom: 0,
        right: 20
      }}
      position="bottomRight"
      onPress={() => navigation.navigate('SubmitBase')}
    >
      <Icon name="plus" type="Feather" size={30} color="white" />
    </Fab>
  )
});

export default createBottomTabNavigator({
  HomeStack,
  SubmitStack,
  ProfileStack
});
