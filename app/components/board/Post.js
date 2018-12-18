// import React from 'react';
// import {StyleSheet, Text, View, Image} from 'react-native';

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
import { Image, StyleSheet, View } from "react-native";
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

export default class Message extends React.Component {
  constructor() {
    super();
    this.state = { active: "false" };
  }
  render() {
    return (
      // <Image
      //   style={styles.post}
      //   source={{ uri: this.props.imageSrc }}
      //   alt="Post"
      // />
      // <Card style={styles.post} transparent>
      <Card transparent fullWidth style={{ padding: 10 }}>
        <CardItem cardBody style={{ justifyContent: "center" }}>
          <Image
            source={{ uri: this.props.imageSrc }}
            // style={{
            //   display: "flex",
            //   // height: 160,
            //   // width: null,
            //   width: 174,
            //   height: 225,
            //   flex: 1,
            //   alignContent: "center"
            // }}
            // style={{ height: 200, width: 200, flex: 1 }}
            // style={{ width: 400, height: 400 }}
            style={{
              width: 176,
              height: 230,
              resizeMode: "contain"
            }}
          />
          {/* <Container>
            <Header /> */}

          {/* </View>
          </Container> */}
          {/* <Icon
            style={{
              fontSize: 20,
              color: "magenta",
              position: "absolute",
              top: 2,
              right: 2
            }}
            active
            name="thumbs-up"
          />
          <Icon
            style={{
              fontSize: 15,
              color: "coral",
              position: "absolute",
              top: 2,
              left: 2
            }}
            active
            name="chatbubbles"
          /> */}
        </CardItem>
        {/* <CardItem> */}
        {/* <Fab
            active={this.state.active}
            direction="right"
            small
            containerStyle={{}}
            style={{ backgroundColor: "#5067FF" }}
            position="bottomLeft"
            onPress={() => this.setState({ active: !this.state.active })}
          >
            <Icon name="feed" type="FontAwesome" />
            <Button style={{ backgroundColor: "#33eb91" }}>
              <Icon active name="thumbs-up">
                <Text style={{ fontSize: 10, color: "white" }}> 1 </Text>
              </Icon>
            </Button>
            <Button style={{ backgroundColor: "#33bfff" }}>
              <Icon active name="chatbubbles">
                <Text style={{ fontSize: 10, color: "white" }}> 1 </Text>
              </Icon>
            </Button> */}
        {/* <Button disabled style={{ backgroundColor: "#DD5144" }}>
              <Icon name="mail" />
            </Button> */}
        {/* </Fab>
        </CardItem> */}
        <CardItem
          style={{
            display: "flex",
            height: 100,
            width: null,
            flex: 1,
            alignContent: "center"
          }}
        >
          {/* <Left style={{ width: 30 }}> */}

          {/* <Text style={{ fontSize: 15 }}>@post author</Text>
          </Left> */}
          <Body
            style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
          >
            <Text style={{ fontSize: 15 }}>
              some quote about the text above [...(clickable)]
            </Text>
            <Text style={{ fontSize: 20, color: "coral" }}>@postAuthor</Text>
          </Body>
          <Right>
            {/* <Fab
              active={this.state.active}
              direction="up"
              containerStyle={{}}
              style={{ backgroundColor: "#5067FF", height: 30, width: 30 }}
              position="bottomLeft"
              onPress={() => this.setState({ active: !this.state.active })}
            >
              <Icon name="feed" style={{ fontSize: 20 }} type="FontAwesome" />
              <Button
                style={{ backgroundColor: "#33eb91", height: 30, width: 30 }}
              >
                <Icon active name="thumbs-up" style={{ fontSize: 20 }}>
                  <Text style={{ fontSize: 10, color: "white" }}> 1 </Text>
                </Icon>
              </Button>
              <Button
                style={{ backgroundColor: "#33bfff", height: 30, width: 30 }}
              >
                <Icon active name="chatbubbles" style={{ fontSize: 20 }}>
                  <Text style={{ fontSize: 10, color: "white" }}> 1 </Text>
                </Icon>
              </Button>
            </Fab>
          </Right> */}
            <Button small transparent>
              {/* <Left> */}
              <Icon
                style={{ fontSize: 25, color: "coral" }}
                active
                name="chatbubbles"
              >
                <Text style={{ fontSize: 10 }}> 4 </Text>
              </Icon>
              {/* </Left> */}
            </Button>
            <Button small transparent>
              {/* <Left> */}
              <Icon
                style={{ fontSize: 25, color: "magenta" }}
                active
                name="thumbs-up"
              >
                <Text style={{ fontSize: 10 }}> 12 </Text>
              </Icon>
              {/* </Left> */}
              {/* <Right>
                <Text style={{ fontSize: 8 }}>12 </Text>
              </Right> */}
            </Button>
          </Right>
        </CardItem>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  post: {
    display: "flex",
    width: 174,
    height: 225,
    borderRadius: 7,
    marginBottom: 10
  }
});
