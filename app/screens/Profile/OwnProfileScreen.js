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
      headerStyle: {
        backgroundColor: '#242424',
        height: 60,
        borderBottomWidth: 0
      },
      headerTitleStyle: {
        fontFamily: 'poppinsBold',
        color: 'white',
        fontSize: 20
      },
      headerLeftContainerStyle: {
        marginLeft: 10, marginTop: 3
      },
      headerRightContainerStyle: {
        marginRight: 10, marginTop: 3
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

    this.renderSocialBadges = this.renderSocialBadges.bind(this);
  }

  componentDidMount() {
    this.props.navigation.setParams({ userInfo: this.props.userInfo });
  }

  renderSocialBadges = () => {
    return this.props.userInfo.socialNetworks.map((badge, idx) => {
      return (
        <Badge
          key={idx}
          count={idx}
          badgeType={badge.source}
          sourceName={badge.sourceUrl}
        />
      );
    });
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.props.userInfo.uid ? (
          <View style={{ backgroundColor: '#242424' }}>
            <Content>
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
                          userList: this.props.userInfo.followers,
                          userName: this.props.userInfo.displayName
                        })
                      }
                    >
                      <Text style={styles.cardTextBold}>
                        {this.props.userInfo.followers.length}
                      </Text>
                      <Text style={styles.cardTextRegular}>FOLLOWERS</Text>
                    </TouchableOpacity>
                  </Left>
                  <Body>
                    <ProfilePortrait
                      style={styles.profile}
                      imageSrc={this.props.userInfo.photoURL}
                    />
                    <Text style={styles.cardTextBold}>
                      {this.props.userInfo.displayName} 
                    </Text>
                  </Body>
                  <Right>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('FollowersList', {
                          type: 'following',
                          userList: this.props.userInfo.following,
                          userName: this.props.userInfo.displayName
                        })
                      }
                    >
                      <Text
                        style={{
                          paddingLeft: 30,
                          fontFamily: 'poppinsBold',
                          color: 'white'
                        }}
                      >
                        {this.props.userInfo.following.length}
                      </Text>
                      <Text style={styles.cardTextRegular}>FOLLOWING</Text>
                    </TouchableOpacity>
                  </Right>
                </CardItem>
              </Card>
            </Content>
            <Card transparent style={styles.socialBadgesContainer}>
              {this.renderSocialBadges()}
            </Card>
            <View />
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
    padding: 7.6,
    backgroundColor: '#242424',
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
  },
  cardTextRegular: {
    fontFamily: 'poppins',
    color: 'white'
  },
  cardTextBold: {
    fontFamily: 'poppinsBold',
    color: 'white',
    marginTop: 10,
  },
  socialBadgesContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start'
  }
});
