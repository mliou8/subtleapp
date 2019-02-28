import React, {Component} from 'react';
import {View} from 'react-native';
import Post from 'app/components/dating/DatingPost';

export default class DatingRow extends Component {
  render () {
    const {posts, navigation} = this.props;
    const singleisTrue = (posts.length === 1);
    return (
      <View>
        <Post
          navigation={navigation}
          data={posts[0]}
          propStyles={{ backgroundColor: 'red'}}
        />
        {posts.length > 1 &&
              <Post
                navigation={navigation}
                data={posts[1]}
              />
        }
      </View>
    );
  }
}
