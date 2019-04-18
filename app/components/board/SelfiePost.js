import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Image,
  View,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import { deletePost, reportPost } from 'db/common/index';
import { Card, CardItem, Text, Button } from 'native-base';
import { Icon } from 'react-native-elements';

class SelfiePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      author: this.props.postInfo.author,
      authorId: this.props.postInfo.authorId,
      text: this.props.postInfo.text,
      datePosted: this.props.postInfo.datePosted,
      userAvatar: this.props.postInfo.avatar,
      photoRef: this.props.postInfo.photoRef[0],
      id: this.props.postInfo.id
    };

    this.removePost = this.removePost.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.confirmReport = this.confirmReport.bind(this);
  }
  confirmDelete() {
    Alert.alert(
      ' ',
      'are you sure you want to delete this post?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        { text: 'OK', onPress: () => this.removePost() }
      ],
      { cancelable: false }
    );
  }
  removePost() {
    const postId = this.state.id;
    deletePost(postId);
    this.props.navigation.navigate('Home');
  }

  confirmReport() {
    Alert.alert(
      'Report Confirmation',
      'are you sure you want to report this post?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        { text: 'OK', onPress: () => this.handleReport() }
      ],
      { cancelable: false }
    );
  }

  handleReport() {
    const postId = this.state.id;
    reportPost(postId);
    this.props.navigation.navigate('Home');
  }

  render() {
    return (
      <View>
        <Card style={{ padding: 3 }}>
          <CardItem cardBody>
            <Image
              source={{ uri: this.props.imageSrc }}
              style={{ height: 300, width: null, flex: 1 }}
            />
            <Text
              style={{
                position: 'absolute',
                bottom: 17,
                left: 30,
                paddingLeft: 5,
                paddingRight: 5,
                fontFamily: 'poppinsLight',
                fontSize: 18,
                color: 'white',
                backgroundColor: '#505050',
              }}
            >
              {this.props.caption.slice(1, this.props.caption.length - 1)}
            </Text>
          </CardItem>

          {this.state.authorId === this.props.userInfo.uid ? (
            <CardItem style={{ justifyContent: 'center' }}>
              <Button
                small
                rounded
                style={{
                  backgroundColor: '#242424'
                }}
                onPress={this.confirmDelete}
              >
                <Icon
                  style={{ color: 'white', fontSize: 15 }}
                  name="remove"
                  type="font-awesome"
                />
                <Text style={{ fontSize: 12, fontFamily: 'poppins' }}>
                  delete this post
                </Text>
              </Button>
            </CardItem>
          ) : (
            <CardItem style={{ justifyContent: 'center' }}>
              <Button
                small
                rounded
                style={{
                  backgroundColor: '#242424'
                }}
                onPress={this.confirmReport}
              >
                <Icon
                  iconStyle={{ marginLeft: 10 }}
                  size={15}
                  name="remove"
                  color="white"
                  type="font-awesome"
                />
                <Text style={{ fontSize: 12, fontFamily: 'poppins' }}>Report this post</Text>
              </Button>
            </CardItem>
          )}
        </Card>
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...state,
    userInfo: state.login.userInfo
  };
};

export default connect(
  mapStateToProps,
  null
)(SelfiePost);
