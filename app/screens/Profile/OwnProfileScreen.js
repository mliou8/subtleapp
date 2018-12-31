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
import AddSocialNetworkTag from './AddSocialNetwork';
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

const profileImgSrc = 'https://loremflickr.com/225/225/dog';

export default class OwnProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
      return {
        title: 'User Profile',
        headerLeft: (
          <Button 
            transparent 
            onPress={() => navigation.navigate('Settings', { userInfo: navigation.state.params.userInfo })}>
            <Text style= {{color: 'black'}}>Settings</Text>
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
    this.renderSocialMenu = this.renderSocialMenu.bind(this);
    this.renderSocialBadges = this.renderSocialBadges.bind(this);
    this.addSocialBadge = this.addSocialBadge.bind(this);
  }

  componentDidMount() {
    this.props.navigation.setParams({ userInfo: this.props.userInfo });
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

  addSocialBadge = () => {
    this.setState({ displayAdd: !this.state.displayAdd });
  };
  render() {
    const bailey = { displayName: 'Bailey', uid: 'AobBHaD1U9WJWOCMNFC8' };

    return (
      <ScrollView style={styles.container}>
        {this.props.userInfo.uid ? (
          <View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Following userOnDisplay={bailey} />
            </View>
            <Content>
              <Card style={{ height: '45 %' }} transparent>
                <CardItem>
                  <Left>
                    <ProfilePortrait
                      style={styles.profile}
                      imageSrc={this.props.userInfo.photoURL}
                    />
                    <Body>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate(
                            'FollowersList',
                            (props = { type: 'following' })
                          )
                        }
                      >
                        <Text>
                          Following:{' '}
                          {this.props.userInfo.following.length}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate('FollowersList', {
                            type: 'followers'
                          })
                        }
                      >
                        <Text>
                          Followers:{' '}
                          {this.props.userInfo.followers.length}
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
              <Text>{this.props.userInfo.displayName}</Text>
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
