// export default class Message extends React.Component {
//   render() {
//     return (
//         <Image style={styles.post} source={{uri:this.props.imageSrc}} alt="Post"/>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   post: {
//     display: 'flex',
//     width: 174,
//     height: 225,
//     borderRadius: 7,
//     marginBottom: 10,
//   }
// })
import React from "react";
import { Image, StyleSheet, View, ScrollView } from "react-native";
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
  Body,
  Right,
  Fab
} from "native-base";

// const catArr = [
//   "https://loremflickr.com/176/230/cat",
//   "https://loremflickr.com/176/230/cat",
//   "https://loremflickr.com/176/230/cat",
//   "https://loremflickr.com/176/230/cat",
//   "https://loremflickr.com/176/230/cat",
//   "https://loremflickr.com/176/230/cat",
//   "https://loremflickr.com/176/230/cat",
//   "https://loremflickr.com/176/230/cat",
//   "https://loremflickr.com/176/230/cat"
// ];
export default class MosaicScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    // const catArr = [
    //   "https://loremflickr.com/176/230/cat",
    //   "https://loremflickr.com/176/230/cat",
    //   "https://loremflickr.com/176/230/cat",
    //   "https://loremflickr.com/176/230/cat",
    //   "https://loremflickr.com/176/230/cat",
    //   "https://loremflickr.com/176/230/cat",
    //   "https://loremflickr.com/176/230/cat",
    //   "https://loremflickr.com/176/230/cat",
    //   "https://loremflickr.com/176/230/cat"
    // ];
    const kittens = this.props.navigation.state.params.cats;

    return (
      <View>
        <ScrollView>
          <View
            style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
          >
            {kittens ? (
              kittens.map((catURI, idx) => (
                // <Card transparent fullWidth style={{ padding: 10 }}>
                //   <CardItem cardBody style={{ justifyContent: "center" }}>
                <Image source={{ uri: catURI }} style={styles.post} key={idx} />
                //   </CardItem>
                // </Card>
              ))
            ) : (
              <Text> where are all the cats?</Text>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  post: {
    display: "flex",
    width: 87,
    height: 112.5,
    borderRadius: 7,
    marginBottom: 10,
    marginRight: 2,
    marginLeft: 1
    // flexDirection: "column",
    // flexWrap: "wrap"
  }
});

// <Image
//   style={styles.post}
//   source={{ uri: this.props.imageSrc }}
//   alt="Post"
// />
// <Card style={styles.post} transparent>
