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
import Bio from 'app/components/profile/Bio';
import Row from 'app/components/profile/Row';
import ProfileBottomContainer from './ProfileBottomContainer';
import Badge from 'app/components/common/Badge';
import FollowUser from 'app/components/profile/Followers';
import AddSocialNetworkTag from './AddSocialNetwork';
import db from 'db/firestore';
import { connect } from 'react-redux';
import moment from 'moment';

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

const profileImgSrc = 'https://loremflickr.com/225/225/dog';

class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'User Profile',
      headerLeft: (
        <Button
          onPress={() => navigation.getParam('edit')}
          title="Edit"
          color="#000000"
        />
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
      edit: false,
      displayAdd: false,
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
    this._editProfile = this._editProfile.bind(this);
    this._saveProfile = this._saveProfile.bind(this);
    this.renderSocialMenu = this.renderSocialMenu.bind(this);
    this.renderSocialBadges = this.renderSocialBadges.bind(this);
    this.addSocialBadge = this.addSocialBadge.bind(this);
  }
  componentDidMount() {
    this.props.navigation.setParams({ edit: this._editProfile });
    this.props.navigation.setParams({ save: this._saveProfile });
  }

  _editProfile = () => {
    this.setState({ edit: !this.state.edit });
  };

  _saveProfile = () => {
    this.setState({ edit: !this.state.edit });
  };

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

  addSocialBadge = () => {
    this.setState({ displayAdd: !this.state.displayAdd });
  };
  render() {
    console.log('this screen props', this.props);
    const bailey = { displayName: 'Bailey', uid: 'AobBHaD1U9WJWOCMNFC8' };

    return (
      <ScrollView style={styles.container}>
        {this.props.login.userInfo.uid ? (
          <View>
            {/* {this.props.profile.userProfile.uid === this.props.login.userInfo.uid? ( */}
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <FollowUser userOnDisplay={bailey} />
              {/* <Followers userOnDisplay={this.props.profile.userProfile.uid} /> */}
            </View>
            <Content>
              <Card style={{ height: '45 %' }} transparent>
                <CardItem>
                  <Left>
                    <ProfilePortrait
                      style={styles.profile}
                      imageSrc={this.props.login.userInfo.photoURL}
                    />
                    <Body>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate('FollowersList')
                        }
                      >
                        <Text>
                          Following:{' '}
                          {this.props.login.userInfo.following.length}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate('FollowersList')
                        }
                      >
                        <Text>
                          Followers:{' '}
                          {this.props.login.userInfo.followers.length}
                        </Text>
                      </TouchableOpacity>
                    </Body>
                    <Right>
                      {this.renderSocialBadges()}
                      <Button
                        transparent
                        style={{
                          marginTop: 2,
                          marginBottom: 2
                        }}
                        onPress={() => {
                          this.addSocialBadge();
                        }}
                      >
                        <Icon
                          type="FontAwesome"
                          name="plus-circle"
                          style={{ fontSize: 20 }}
                        />
                      </Button>
                    </Right>
                  </Left>
                </CardItem>
              </Card>
            </Content>
            <View>
              {this.state.displayAdd ? <AddSocialNetworkTag /> : null}
            </View>
            <View style={{ flex: 1, marginTop: 15, paddingLeft: 15 }}>
              <Text>{this.props.login.userInfo.displayName}</Text>
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
  profileCard: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 20,
    paddingLeft: 10,
    height: 212,
    alignSelf: 'stretch',
    borderStyle: 'solid',
    borderColor: 'black'
  },
  iconContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
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
    userProfile: state.profile.userProfile,
    profile: state.profile,
    login: state.login
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchUser: uid => {
      dispatch(fetchUser(uid));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileScreen);
