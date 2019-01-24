import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity
} from 'react-native';
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
  Left
} from 'native-base';
import Post from 'app/components/board/Post';
import FullPost from 'app/components/board/FullPost';
import BulletinPost from 'app/components/board/BulletinPost';

export default class BulletinScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Bulletin',
      headerStyle: { backgroundColor: '#242424', height: 80 },
      headerTitleStyle: {
        fontFamily: 'poppinsBold',
        color: 'white',
        fontSize: 20
      },

      headerRight: (
        <Button transparent onPress={() => navigation.navigate('Messages')}>
          <Icon
            type="Octicons"
            name="mail-read"
            style={{ color: 'white', fontSize: 30, marginRight: 20 }}
          />
        </Button>
      )
    };
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('Mosaic', { cats: catArr })
            }
          >
            {/* //onPress={() => this.navigateToFullPost(post)}> */}
            <BulletinPost />
          </TouchableOpacity>
          <BulletinPost imageSrc={'https://loremflickr.com/176/230/cat'} />
          <BulletinPost imageSrc={'https://loremflickr.com/176/230/cat'} />
          <BulletinPost imageSrc={'https://loremflickr.com/176/230/cat'} />
          <BulletinPost imageSrc={'https://loremflickr.com/176/230/cat'} />
          <BulletinPost imageSrc={'https://loremflickr.com/176/230/cat'} />
          <BulletinPost imageSrc={'https://loremflickr.com/176/230/cat'} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
