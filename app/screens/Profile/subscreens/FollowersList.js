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
import Row from 'app/components/profile/Row';
import Badge from 'app/components/common/Badge';
import Followers from './Followers';

import { connect } from 'react-redux';

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
  List,
  ListItem
} from 'native-base';

const avatarImgSrc = 'https://loremflickr.com/225/225/cat';

class FollowersListScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Following @' + navigation.getParam('userName'),
      headerStyle: { backgroundColor: '#242424', height: 80 },
      headerTitleStyle: {
        fontFamily: 'poppinsBold',
        color: 'white',
        fontSize: 12
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
      edit: false,
      userList: []
    };
    this.renderFollowerslist = this.renderFollowerslist.bind(this);
  }
  componentDidMount() {
    const listType = this.props.navigation.getParam('type');
    if (listType === 'followers') {
      const userList = this.props.login.userInfo.followers;
      this.setState({
        userList
      });
    }
    if (listType === 'following') {
      const userList = this.props.login.userInfo.following;
      this.setState({
        userList
      });
    }
  }

  renderFollowerslist = listContent => {
    return listContent.map((user, idx) => {
      return (
        <ListItem avatar key={idx}>
          <Left>
            <Thumbnail source={{ uri: user.pic_small }} />
          </Left>
          <Body>
            <Text style={{ fontFamily: 'poppins' }}> {user.displayName}</Text>
          </Body>
          <Right>
            <Button
              iconRight
              transparent
              onPress={() =>
                this.props.navigation.navigate('OtherUsersProfile', {
                  userToDisplay: user,
                  name: user.displayName
                })
              }
            >
              <Icon
                name="ios-arrow-forward"
                style={{ color: 'black', fontSize: 25 }}
              />
            </Button>
          </Right>
        </ListItem>
      );
    });
  };

  render() {
    const listType = this.props.navigation.state.params.type;
    const listContent = this.state.userList;
    return (
      <ScrollView style={{ backgroundColor: 'white' }}>
        <View>
          <Content>
            <List>{this.renderFollowerslist(listContent)}</List>
          </Content>
        </View>
      </ScrollView>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    ...state,
    following: state.login.userInfo.following,
    followers: state.login.userInfo.followers,
    login: state.login
  };
};

export default connect(
  mapStateToProps,
  null
)(FollowersListScreen);
