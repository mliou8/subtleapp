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
      title: 'Your Profile',
      headerStyle: { backgroundColor: '#242424', height: 80 },
      headerTitleStyle: {
        fontFamily: 'poppinsBold',
        color: 'white',
        fontSize: 20
      },
      headerLeft: (
        <Button
          transparent
          onPress={() =>
            navigation.navigate('Settings', {
              userInfo: navigation.state.params.userInfo
            })
          }
        >
          <Icon
            type="Ionicons"
            name="ios-settings"
            style={{ color: 'white', fontSize: 30 }}
          />
        </Button>
      ),
      headerRight: (
        <Button transparent onPress={() => navigation.navigate('Messages')}>
          <Icon
            type="Octicons"
            name="mail-read"
            style={{ color: 'white', fontSize: 30, marginRight: 20 }}
          />
        </Button>
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      displayAdd: false
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
    console.log(this.props.userInfo.social);
    return this.props.userInfo.social.map((badge, idx) => {
      return (
        <Badge
          key={idx}
          badgeType={badge.type}
          sourceName={badge.handle}
        />
      );
    });
  };

  addSocialBadge = () => {
    this.setState({ displayAdd: !this.state.displayAdd });
  };
  render() {
    return (
      <ScrollView style={styles.container}>
        {this.props.userInfo.uid ? (
          <View>
            <Content>
              <Card style={{ height: '45 %' }} transparent>
                <CardItem>
                  <Left>
                    <ProfilePortrait
                      style={styles.profile}
                      imageSrc={this.props.userInfo.pic_small}
                    />
                    <Body>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate('FollowersList', {
                            type: 'following',
                            userList: []
                          })
                        }
                      >
                        <Text>
                          Following: {0}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate('FollowersList', {
                            type: 'followers',
                            userList: []
                          })
                        }
                      >
                        <Text>
                          Followers: {0}
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
