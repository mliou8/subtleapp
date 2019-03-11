import React, {Component} from 'react';
import {View} from 'react-native';
import Post from 'app/components/dating/DatingPost';

export default class DatingRow extends Component {
  render () {
    const {posts, navigation} = this.props;
    const singleRow = posts.length === 1;
    return (
      <View style={{display: 'flex', flexDirection: 'row', justifyContent: `${singleRow ? 'space-between' : 'space-between'}`}}>
        <Post
          navigation={navigation}
          data={posts[0]}
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
