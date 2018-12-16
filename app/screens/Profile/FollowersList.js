import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Picker
} from "react-native";
import Row from "app/components/profile/Row";
import Badge from "app/components/common/Badge";
import Followers from "app/components/profile/Followers";

import { connect } from "react-redux";
import { listRepos } from "app/reducers/reducer";
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
} from "native-base";

const avatarImgSrc = "https://loremflickr.com/225/225/cat";

export default class FollowersListScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Following @User",

      headerRight: (
        <Button transparent onPress={() => navigation.navigate("Messages")}>
          <Icon
            type="Entypo"
            name="mail-with-circle"
            style={{ color: "black", fontSize: 30 }}
          />
        </Button>
      )
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      followers: [
        {
          name: "CoolPerson",
          avatarURL: "justlikemike"
        },
        {
          name: "OKPerson",
          avatarURL: "justlikemike"
        },
        {
          name: "Mom",
          avatarURL: "justlikemike"
        },
        {
          name: "DontRememberName",
          avatarURL: "justlikemike"
        },
        {
          name: "DoNotCall",
          avatarURL: "justlikemike"
        },
        {
          name: "FriendOfFriend",
          avatarURL: "justlikemike"
        }
      ]
    };
    this.renderFollowerslist = this.renderFollowerslist.bind(this);
  }

  //   renderFollowerslist = () => {
  //     return this.state.followers.map((follower, idx) => {
  //       return (
  //         <ListItem key={idx}>
  //           <Left>
  //             <Text> {follower.name}</Text>
  //           </Left>
  //           <Right>
  //             <Icon name="ios-arrow-forward" />
  //           </Right>
  //         </ListItem>
  //       );
  //     });
  //   };
  renderFollowerslist = () => {
    return this.state.followers.map((follower, idx) => {
      return (
        <ListItem avatar key={idx}>
          <Left>
            <Thumbnail source={{ uri: avatarImgSrc }} />
          </Left>
          <Body>
            <Text> {follower.name}</Text>
            {/* <Text note>Follows You Too!  or checkmark icon if follow. 
            //But this seems uncessary to check the database for this stuff though</Text> */}
          </Body>
          <Right>
            <Icon name="ios-arrow-forward" />
          </Right>
        </ListItem>
      );
    });
  };

  render() {
    return (
      <ScrollView>
        <View>
          <Content>
            <List>{this.renderFollowerslist()}</List>
          </Content>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  let storedRepositories = state.repos.map(repo => ({ key: repo.id, ...repo }));
  return {
    repos: storedRepositories
  };
};

const mapDispatchToProps = {
  listRepos
};
