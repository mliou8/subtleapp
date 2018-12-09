import React from 'react';
import { ScrollView, StyleSheet, Text, View, Button, SafeAreaView, Image } from 'react-native';
import Post from '../../components/board/Post'

export default class RecentPostsScreen extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <ScrollView
        contentContainerStyle={styles.container}>
        <Post 
          imageSrc={'https://loremflickr.com/176/230/cat'} 
          /> 
        <Post
          imageSrc={'https://loremflickr.com/176/230/cat'}
          />
        <Post
          imageSrc={'https://loremflickr.com/176/230/cat'}
          />
        <Post
          imageSrc={'https://loremflickr.com/176/230/cat'}
          />
          <Post
            imageSrc={'https://loremflickr.com/176/230/cat'}
            />
          <Post
            imageSrc={'https://loremflickr.com/176/230/cat'}
            />
            <Post
              imageSrc={'https://loremflickr.com/176/230/cat'}
              />
            <Post
              imageSrc={'https://loremflickr.com/176/230/cat'}
              />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  divider: {
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingLeft: 10,
    marginTop: 7,
    marginBottom: 7,
    justifyContent: 'flex-end',
    width: '100%',
  },

});
