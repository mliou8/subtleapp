import React from 'react';
import { Image, StyleSheet, View, ScrollView } from 'react-native';
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
  Spinner
} from 'native-base';
import BulletinPost from 'app/components/board/BulletinPost';
import { fetchPosts } from 'db/bulletin/index';
import moment from 'moment';

export default class BulletinScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: ''
    };
  }

  componentDidMount() {
    fetchPosts().then(posts => {
      this.setState({ posts: posts });
    });
  }

  renderPosts() {
    let counter = 1;
    function timeStrToNum(str) {
      const strArr = str.split(' ');
      let numDateTotal = '';
      const monthsObj = {
        January: { value: '01' },
        Feburary: { value: '02' },
        March: { value: '03' },
        April: { value: '04' },
        May: { value: '05' },
        June: { value: '06' },
        July: { value: '07' },
        August: { value: '08' },
        September: { value: '09' },
        October: { value: '10' },
        November: { value: '11' },
        December: { value: '12' }
      };
      const monthTotal = monthsObj[strArr[0]].value;
      numDateTotal += strArr[2].slice(0, -1);
      numDateTotal += monthTotal;
      const dayTotal = strArr[1].slice(0, -2);
      numDateTotal += dayTotal;
      let hrTotal = '';
      let minTotal = '';
      let secTotal = '';
      if (strArr[3][1] === ':') {
        hrTotal = '0' + strArr[3].slice(0, 1);
        minTotal += strArr[3].slice(2, 4);
        secTotal += strArr[3].slice(5, 7);
      } else {
        hrTotal = strArr[3].slice(0, 2);
        minTotal += strArr[3].slice(3, 5);
        secTotal += strArr[3].slice(6, 8);
      }
      if (strArr[4] === 'pm') {
        hrTotal = parseInt(hrTotal) + 12;
        hrTotal = hrTotal.toString();
      }
      numDateTotal += hrTotal;
      numDateTotal += minTotal;
      numDateTotal += secTotal;
      return parseInt(numDateTotal);
    }

    const postsArr = this.state.posts.sort((a, b) => {
      const time1 = timeStrToNum(a.datePosted);
      const time2 = timeStrToNum(b.datePosted);
      return time2 - time1;
    });

    return postsArr.map(item => (
      <BulletinPost
        key={counter++}
        postInfo={item}
        navigation={this.props.navigation}
      />
    ));
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.state.posts.length >= 1 ? (
            this.renderPosts()
          ) : (
            <Spinner color="white" />
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    paddingLeft: 6,
    paddingRight: 6,
    backgroundColor: '#DCDCDC'
  }
});
