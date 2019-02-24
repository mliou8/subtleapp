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
      headerStyle: {
        backgroundColor: '#242424',
        height: 80,
        borderBottomWidth: 0
      },
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
      socialNetworks: this.props.profile.userProfile.socialNetworks,
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
                          type: 'following',
                          userList: this.props.profile.userProfile.following,
                          userName: this.props.profile.userProfile.displayName
                        })
                      }
                    >
                      <Text style={styles.cardTextBold}>
                        {this.props.profile.userProfile.following.length}
                      </Text>
                      <Text style={styles.cardTextRegular}>FOLLOWING</Text>
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
                          type: 'followers',
                          userList: this.props.profile.userProfile.followers,
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
                        center
                      >
                        {this.props.profile.userProfile.followers.length}
                      </Text>
                      <Text style={styles.cardTextRegular}>FOLLOWERS</Text>
                    </TouchableOpacity>
                  </Right>
                </CardItem>
                <CardItem
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
                </CardItem>
              </Card>
            </Content>
            <Card
              style={{
                backgroundColor: '#242424',
                display: 'flex',
                flexDirection: 'row'
              }}
              transparent
            >
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
