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

import SelfieFeed from './subscreens/SelfieFeed';

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
  Spinner,
  Tab,
  Tabs,
  TabHeading
} from 'native-base';

class SelfiesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Selfies',
      headerStyle: { backgroundColor: '#242424', height: 80 },
      headerTitleStyle: {
        fontFamily: 'poppinsBold',
        color: 'white',
        fontSize: 20
      },

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
    this.state = {};
  }
  render() {
    return (
      //   <ScrollView style={styles.container}>
      <View style={{ backgroundColor: '#242424' }}>
        {this.props.userInfo.uid ? (
          <View>
            <ScrollView>
              <View style={{ height: 200, backgroundColor: '#242424' }}>
                <View>
                  <Card style={{ height: '75 %' }} transparent>
                    <CardItem style={{ backgroundColor: '#242424' }}>
                      <Left>
                        <Thumbnail
                          //   large
                          source={{ uri: this.props.userInfo.photoURL }}
                        />
                      </Left>
                      <Body>
                        <TouchableOpacity
                          onPress={() =>
                            this.props.navigation.navigate('FollowersList', {
                              type: 'following',
                              userList: this.props.userInfo.following
                            })
                          }
                        >
                          <Text
                            style={{ fontFamily: 'poppins', color: 'white' }}
                          >
                            appeal yourself
                          </Text>
                        </TouchableOpacity>
                      </Body>
                    </CardItem>
                  </Card>
                </View>

                <View>
                  <Tabs tabBarUnderlineStyle={{ backgroundColor: 'white' }}>
                    <Tab
                      tabStyle={{ backgroundColor: '#242424' }}
                      heading={
                        <TabHeading style={{ backgroundColor: '#242424' }}>
                          <Icon name="ios-camera" style={{ color: 'white' }} />
                          <Text
                            style={{ fontFamily: 'poppins', color: 'white' }}
                          >
                            Photos
                          </Text>
                        </TabHeading>
                      }
                    >
                      <SelfieFeed />
                    </Tab>
                    <Tab
                      heading={
                        <TabHeading style={{ backgroundColor: '#242424' }}>
                          <Icon
                            name="plus"
                            style={{ color: 'white' }}
                            type="Feather"
                          />
                          <Text
                            style={{ fontFamily: 'poppins', color: 'white' }}
                          >
                            Submit
                          </Text>
                        </TabHeading>
                      }
                    />
                  </Tabs>
                </View>
              </View>
              <View>
                <Card style={{ padding: 3 }}>
                  <CardItem cardBody>
                    <Image
                      source={{ uri: 'https://loremflickr.com/176/230/cat' }}
                      style={{ height: 300, width: null, flex: 1 }}
                    />
                    <Text
                      style={{
                        position: 'absolute',
                        bottom: 8,
                        left: 16,
                        fontFamily: 'poppins',
                        color: 'white'
                      }}
                    >
                      {' '}
                      testing{' '}
                    </Text>
                  </CardItem>
                </Card>
                <Card style={{ padding: 3 }}>
                  <CardItem cardBody>
                    <Image
                      source={{ uri: 'https://loremflickr.com/176/230/cat' }}
                      style={{ height: 300, width: null, flex: 1 }}
                    />
                    <Text
                      style={{
                        position: 'absolute',
                        bottom: 8,
                        left: 16,
                        fontFamily: 'poppins',
                        color: 'white'
                      }}
                    >
                      {' '}
                      testing title on image 2
                    </Text>
                  </CardItem>
                </Card>
                <Card style={{ padding: 3 }}>
                  <CardItem cardBody>
                    <Image
                      source={{ uri: 'https://loremflickr.com/176/230/cat' }}
                      style={{ height: 300, width: null, flex: 1 }}
                    />
                    <Text
                      style={{
                        position: 'absolute',
                        bottom: 8,
                        left: 16,
                        fontFamily: 'poppins',
                        color: 'white'
                      }}
                    >
                      {' '}
                      testing title on image 3
                    </Text>
                  </CardItem>
                </Card>
              </View>
            </ScrollView>
          </View>
        ) : (
          <Spinner color="blue" />
        )}
      </View>
    );
  }
}

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
)(SelfiesScreen);

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
