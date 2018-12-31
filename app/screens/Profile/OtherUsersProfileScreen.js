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
import Following from 'app/components/profile/Followers';

import { connect } from 'react-redux';
import db from 'db/firestore';
import { fetchUserProfileInfo } from 'actions/profile/index';

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
      title: 'User Profile',
      headerLeft: (
        <Button transparent onPress={() => navigation.pop(1)}>
          <Icon
            type="Ionicons"
            name="ios-arrow-back"
            style={{ color: 'black', fontSize: 28 }}
          />
        </Button>
      ),
      headerRight: (
        <Button transparent onPress={() => navigation.navigate('Messages')}>
          <Icon
            type="Entypo"
            name="mail-with-circle"
            style={{ color: 'black', fontSize: 30 }}
          />
        </Button>
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      userOnDisplay: {},
      badges: [
        {
          badgeType: 'youtube',
          sourceName: 'justlikemike'
        },
        {
          badgeType: 'instagram',
          sourceName: 'justlikemike'
        },
        {
          badgeType: 'twitch',
          sourceName: 'justlikemike'
        }
      ]
    };

    this.renderSocialMenu = this.renderSocialMenu.bind(this);
    this.renderSocialBadges = this.renderSocialBadges.bind(this);
  }

  componentDidMount() {
    const { userToDisplay } = this.props.navigation.state.params;

    this.props.fetchUserProfileInfo(userToDisplay.uid);
  }

  renderSocialMenu = () => {
    return <AddSocialNetworkTag />;
  };

  renderSocialBadges = () => {
    return this.state.badges.map((badge, idx) => {
      return (
        <Badge
          key={idx}
          badgeType={badge.badgeType}
          sourceName={badge.sourceName}
        />
      );
    });
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.props.profile.userProfile.uid ? (
          <View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Following userOnDisplay={this.props.profile.userProfile} />
            </View>
            <Content>
              <Card style={{ height: '45 %' }} transparent>
                <CardItem>
                  <Left>
                    <ProfilePortrait
                      style={styles.profile}
                      imageSrc={this.props.profile.userProfile.photoURL}
                    />
                    <Body>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate(
                            'FollowersList',
                            (props = {
                              type: 'following',
                              userList: this.props.profile.userProfile.following
                            })
                          )
                        }
                      >
                        <Text>
                          Following:{' '}
                          {this.props.profile.userProfile.following.length}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate('FollowersList', {
                            type: 'followers',
                            userList: this.props.profile.userProfile.followers
                          })
                        }
                      >
                        <Text>
                          Followers:{' '}
                          {this.props.profile.userProfile.followers.length}
                        </Text>
                      </TouchableOpacity>
                    </Body>
                    <Right>{this.renderSocialBadges()}</Right>
                  </Left>
                </CardItem>
              </Card>
            </Content>
            <View>
              {this.state.displayAdd ? <AddSocialNetworkTag /> : null}
            </View>
            <View style={{ flex: 1, marginTop: 15, paddingLeft: 15 }}>
              <Text>{this.props.profile.userProfile.displayName}</Text>
            </View>
            <ProfileBottomContainer />
            <View style={{ height: 40, width: '100%' }} />
          </View>
        ) : (
          <Spinner color="blue" />
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 7.6,
    backgroundColor: '#fff',
    flexDirection: 'column'
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
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    ...state,
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
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OtherUsersProfileScreen);
