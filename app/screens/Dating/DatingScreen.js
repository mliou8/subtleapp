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

import DatingPost from 'app/components/dating/DatingPost';

export default class DatingScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
    this.renderPosts = this.renderPosts.bind(this);
  }

  renderPosts() {
    function timeStrToNum(str) {
      const strArr = str.split(' ');
      let numDateTotal = '';
      const monthsObj = {
        January: { value: '01' },
        February: { value: '02' },
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

    if (!this.props.posts) {
      return <View />;
    } else {
      const postsArr = this.props.posts.sort((a, b) => {
        const time1 = timeStrToNum(a.datePosted);
        const time2 = timeStrToNum(b.datePosted);
        return time2 - time1;
      });

      return postsArr.map((post, idx) => {
        return (
          <DatingPost
            key={idx}
            data={post}
            navigation={this.props.navigation}
          />
        );
      });
    }
  }

  async componentDidMount() {
    const dating = 'dating';
    await this.props.fetchPosts(dating);
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>{this.renderPosts()}</ScrollView>
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
