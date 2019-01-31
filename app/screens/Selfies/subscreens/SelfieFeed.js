import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Button,
  SafeAreaView,
  Image
} from 'react-native';

import {
  Container,
  Header,
  Tab,
  Tabs,
  TabHeading,
  Icon,
  Text,
  ScrollableTab,
  Content
} from 'native-base';
import FullPost from 'app/components/board/FullPost';

export default class SelfieFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ScrollView>
        {/* <View style={styles.container}> */}
        <View>
          {/* <FullPost imageSrc={'https://loremflickr.com/176/230/cat'} />
          <FullPost imageSrc={'https://loremflickr.com/176/230/cat'} /> */}
          <Image
            source={{ uri: 'https://loremflickr.com/176/230/cat' }}
            style={{ height: 200, width: null, flex: 1 }}
          />
          <Image
            source={{ uri: 'https://loremflickr.com/176/230/cat' }}
            style={{ height: 200, width: null, flex: 1 }}
          />
          <Image
            source={{ uri: 'https://loremflickr.com/176/230/cat' }}
            style={{ height: 200, width: null, flex: 1 }}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#242424'
  }
});
