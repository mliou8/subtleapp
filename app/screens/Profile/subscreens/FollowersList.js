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
      title: 'Following @User',

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
            <Text> {user.displayName}</Text>
          </Body>
          <Right>
            <Button
              iconRight
              transparent
              onPress={() =>
                this.props.navigation.navigate('OtherUsersProfile', {
                  userToDisplay: user
                })
              }
            >
              <Icon name="ios-arrow-forward" />
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
      <ScrollView>
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
