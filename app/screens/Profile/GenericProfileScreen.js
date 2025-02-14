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
import AddSocialNetworkTag from './AddSocialNetwork';
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

export default class GenericProfile extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Profile',
      headerLeft: (
        <Button
          onPress={() => navigation.navigate('Settings')}
          title="Edit Profile"
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
      displayAdd: false,
      socialNetworks: this.props.user.socialNetworks
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
    return (
      <ScrollView style={styles.container}>
        <View>
          <Content>
            <Card style={{ height: '45 %' }} transparent>
              <CardItem>
                <Left>
                  <ProfilePortrait
                    style={styles.profile}
                    imageSrc={profileImgSrc}
                  />
                  <Body>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('FollowersList')
                      }
                    >
                      <Text>Following: 400 </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('FollowersList')
                      }
                    >
                      <Text>Followers: 500 </Text>
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
          <View>{this.state.displayAdd ? <AddSocialNetworkTag /> : null}</View>
          <View style={{ flex: 1, marginTop: 15, paddingLeft: 15 }}>
            <Text style={{ fontSize: 15, marginTop: 15 }}>@heyitsmmike</Text>
          </View>
          <View style={{ height: 40, width: '100%' }} />
        </View>
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
