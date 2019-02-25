import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Picker
} from 'react-native';
import ProfilePortrait from 'app/components/profile/ProfilePortrait';
import ProfileBottomContainer from './subscreens/ProfileBottomContainer';
import Badge from 'app/components/common/Badge';
import Followers from './subscreens/Followers';
import { addNewChatToCurrentUser } from 'actions/login/index';
import {
  fetchUserProfileInfo,
  addNewChatToOtherUser
} from 'actions/profile/index';

import { connect } from 'react-redux';
import db from 'db/firestore';

import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  Spinner
} from 'native-base';

class OtherUsersProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('name'),
      headerStyle: {
        backgroundColor: '#242424',
        height: 60,
        borderBottomWidth: 0
      },
      headerTitleStyle: {
        fontFamily: 'poppinsBold',
        color: 'white',
        fontSize: 18
      },
      headerRight: (
        <Button transparent onPress={() => this.alreadyChatting()}>
          <Icon
            type="Ionicons"
            name={'ios-send'}
            title="messages"
            style={{ color: 'white', fontSize: 25, marginRight: 20 }}
          />
        </Button>
      ),
      headerLeft: (
        <Button transparent onPress={() => navigation.goBack()}>
          <Icon
            name="chevron-left"
            type="FontAwesome"
            style={{ color: 'white', fontSize: 25 }}
          />
        </Button>
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      userToDisplay: {},
      socialNetworks: this.props.profile.userProfile.socialNetworks,
      badges: [],
      existingConvoId: null
    };
    this._mounted = false;

    this.renderSocialMenu = this.renderSocialMenu.bind(this);
    this.renderSocialBadges = this.renderSocialBadges.bind(this);
    this.alreadyChatting = this.alreadyChatting.bind(this);
  }

  async componentDidMount() {
    this._mounted = true;
    const { userToDisplay } = this.props.navigation.state.params;
    const currUsersConversations = this.props.userInfo.conversations;
    this.setState({ userToDisplay });
    const amFollowing = this.props.userInfo.following.filter(
      item => item.uid === userToDisplay.uid
    );
    const chatting = currUsersConversations.filter(item => {
      if (item.userName === userToDisplay.displayName) {
        return item;
      }
    });
    if (amFollowing.length) {
      this.setState({ following: true });
    } else {
      this.setState({ following: false });
    }
    if (chatting.length) {
      this.setState({ existingConvoId: chatting[0].convoID });
    }
    await this.props.fetchUserProfileInfo(userToDisplay.uid);
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  alreadyChatting() {
    const { navigate } = this.props.navigation;
    const self = this;

    if (this.state.existingConvoId) {
      navigate('Conversation', {
        convoID: this.state.existingConvoId
      });
    } else {
      this.startNewChat();
    }
  }
  async startNewChat() {
    const { navigate } = this.props.navigation;
    const self = this;
    const currUsersConversations = this.props.userInfo.conversations;
    const userToMsg = this.state.userToDisplay;
    const userInfo = this.props.userInfo;
    const currTime = Date.now();
    const messageTime = moment(currTime).format('MMMM Do YYYY, h:mm:ss a');
    const addMsgRef = await db
      .collection('conversations')
      .add({ messages: [] });
    const newMsgID = addMsgRef.id;
    const userData = {
      uid: userInfo.uid,
      userName: userInfo.displayName,
      avatar: userInfo.photoURL,
      convoID: newMsgID,
      lastMessageTime: messageTime
    };

    this.props.addNewChatToOtherUser(userData, userToMsg);
    const userToMsgData = {
      uid: userToMsg.uid,
      userName: userToMsg.displayName,
      avatar: userToMsg.photoURL,
      convoID: newMsgID,
      lastMessageTime: messageTime
    };
    this.props.addNewChatToCurrentUser(userToMsgData, userInfo);
    self.setState({ existingConvoId: newMsgID });
    navigate('Conversation', {
      convoID: this.state.existingConvoId
    });
  }

  renderSocialMenu = () => {
    return <AddSocialNetworkTag />;
  };

  renderSocialBadges = () => {
    return this.props.profile.userProfile.socialNetworks.map((badge, idx) => {
      return (
        <Badge
          key={idx}
          badgeType={badge.source}
          sourceName={badge.sourceUrl}
        />
      );
    });
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.props.profile.userProfile.uid ? (
          <View style={{ backgroundColor: '#242424' }}>
            <Content>
              <Followers
                navigation={this.props.navigation}
                userOnDisplay={this.props.profile.userProfile}
              />

              <Card
                style={{ height: '45 %', backgroundColor: '#242424' }}
                transparent
              >
                <CardItem style={{ backgroundColor: '#242424' }}>
                  <Left>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('FollowersList', {
                          type: 'followers',
                          userList: this.props.profile.userProfile.followers,
                          userName: this.props.profile.userProfile.displayName
                        })
                      }
                    >
                      <Text style={styles.cardTextBold} center>
                        {this.props.profile.userProfile.followers.length}
                      </Text>
                      <Text style={styles.cardTextRegular}>FOLLOWERS</Text>
                    </TouchableOpacity>
                  </Left>
                  <Body>
                    <ProfilePortrait
                      style={styles.profile}
                      imageSrc={this.props.profile.userProfile.photoURL}
                    />
                  </Body>
                  <Right>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('FollowersList', {
                          type: 'following',
                          userList: this.props.profile.userProfile.following,
                          userName: this.props.profile.userProfile.displayName
                        })
                      }
                    >
                      <Text
                        style={{
                          fontFamily: 'poppinsBold',
                          color: 'white',
                          paddingLeft: 30
                        }}
                      >
                        {this.props.profile.userProfile.following.length}
                      </Text>
                      <Text style={styles.cardTextRegular}>FOLLOWING</Text>
                    </TouchableOpacity>
                  </Right>
                </CardItem>
                {/* <CardItem
                  style={{
                    justifyContent: 'center',
                    backgroundColor: '#242424'
                  }}
                >
                  <Text
                    style={{
                      fontFamily: 'poppinsBold',
                      color: 'white',
                      fontSize: 20
                    }}
                  >
                    {this.props.profile.userProfile.displayName}
                  </Text>
                </CardItem> */}
              </Card>
            </Content>
            <Card style={styles.socialBadgesContainer} transparent>
              {this.renderSocialBadges()}
            </Card>

            <ProfileBottomContainer />
            <View style={{ height: 40, width: '100%' }} />
          </View>
        ) : (
          <Spinner color="white" />
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242424'
  },
  divider: {
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingLeft: 10,
    marginTop: 7,
    marginBottom: 7,
    justifyContent: 'flex-end',
    width: '100%'
  },
  profile: {
    display: 'flex',
    alignContent: 'flex-start',
    flex: 1
  },
  cardTextRegular: {
    fontFamily: 'poppins',
    color: 'white'
  },
  cardTextBold: {
    fontFamily: 'poppinsBold',
    color: 'white'
  },
  socialBadgesContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'center',
    justifyContent: 'space-around'
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    ...state,
    userInfo: state.login.userInfo,
    userInfo: state.login.userInfo,
    profile: state.profile,
    login: state.login
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchUser: uid => {
      dispatch(fetchUser(uid));
    },
    fetchUserProfileInfo: uid => {
      dispatch(fetchUserProfileInfo(uid));
    },
    addNewChatToCurrentUser: (userToMsgData, userInfo) => {
      dispatch(addNewChatToCurrentUser(userToMsgData, userInfo));
    },
    addNewChatToOtherUser: (userInfo, profileUserInfo) => {
      dispatch(addNewChatToOtherUser(userInfo, profileUserInfo));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OtherUsersProfileScreen);
