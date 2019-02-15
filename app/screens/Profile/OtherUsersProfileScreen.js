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
      title: navigation.getParam('name') + "'s Profile",
      headerStyle: { backgroundColor: '#242424', height: 80 },
      headerTitleStyle: {
        fontFamily: 'poppinsBold',
        color: 'white',
        fontSize: 16
      },
      headerRight: (
        <Button transparent onPress={() => navigation.navigate('Messages')}>
          <Icon
            type="Octicons"
            name="mail-read"
            style={{ color: 'white', fontSize: 30, marginRight: 20 }}
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
      userOnDisplay: {},
      social: this.props.profile.userProfile.social,
      badges: []
    };
    this._mounted = false;

    this.renderSocialMenu = this.renderSocialMenu.bind(this);
    this.renderSocialBadges = this.renderSocialBadges.bind(this);
  }

  async componentDidMount() {
    this._mounted = true;
    const { userToDisplay } = this.props.navigation.state.params;
    this.setState({ userToDisplay });

    await this.props.fetchUserProfileInfo(userToDisplay.uid);
  }
  componentWillUnmount() {
    this._mounted = false;
  }

  renderSocialMenu = () => {
    return <AddSocialNetworkTag />;
  };

  renderSocialBadges = () => {
    return this.props.profile.userProfile.social.map((badge, idx) => {
      return (
        <Badge
          key={idx}
          badgeType={badge.type}
          sourceName={badge.url}
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
              <Followers
                navigation={this.props.navigation}
                userOnDisplay={this.props.profile.userProfile}
              />
            </View>
            <Content>
              <Card style={{ height: '45 %' }} transparent>
                <CardItem>
                  <Left>
                    <ProfilePortrait
                      style={styles.profile}
                      imageSrc={this.props.profile.userProfile.pic_small}
                    />
                    <Body>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate('FollowersList', {
                            type: 'following',
                            userList: this.props.profile.userProfile.following,
                            userName: this.props.profile.userProfile.displayName
                          })
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
                            userList: this.props.profile.userProfile.followers,
                            userName: this.props.profile.userProfile.displayName
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
