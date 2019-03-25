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
import { deletePost } from 'db/common/index';
import { Card, CardItem, Text, Button, Icon } from 'native-base';

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
                bottom: 8,
                left: 16,
                fontFamily: 'poppins',
                color: 'white'
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
                  type="FontAwesome"
                />
                <Text style={{ fontSize: 12, fontFamily: 'poppins' }}>
                  delete this post
                </Text>
              </Button>
            </CardItem>
          ) : null}
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
