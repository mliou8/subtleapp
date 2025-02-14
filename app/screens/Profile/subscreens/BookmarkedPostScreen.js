import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  Image
} from 'react-native';
import Post from 'app/components/board/Post';
import FullPost from 'app/components/board/FullPost';

export default class BookmarkedPostScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <FullPost imageSrc={'https://loremflickr.com/176/230/cat'} />
        <FullPost imageSrc={'https://loremflickr.com/176/230/cat'} />
        <FullPost imageSrc={'https://loremflickr.com/176/230/cat'} />
        <FullPost imageSrc={'https://loremflickr.com/176/230/cat'} />
        <FullPost imageSrc={'https://loremflickr.com/176/230/cat'} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },

  divider: {
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingLeft: 10,
    marginTop: 7,
    marginBottom: 7,
    justifyContent: 'flex-end',
    width: '100%'
  }
});
