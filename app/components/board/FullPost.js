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
  Right
} from "native-base";

export default class FullPost extends React.Component {
  render() {
    return (
      // <Image
      //   style={styles.post}
      //   source={{ uri: this.props.imageSrc }}
      //   alt="Post"
      // />
      //   <Card style={styles.post}>
      //     <CardItem>
      //       <Left>
      //         <Thumbnail
      //           source={{ uri: "https://loremflickr.com/176/230/cat" }}
      //           small
      //           // style={{ height: 60, width: 60, borderRadius: 47 }}
      //         />
      //         <Body>
      //           <Text note>post author</Text>
      //         </Body>
      //       </Left>
      //     </CardItem>
      //     <CardItem cardBody style={{ justifyContent: "center" }}>
      //       <Image
      //         source={{ uri: this.props.imageSrc }}
      //         style={{
      //           display: "flex",
      //           height: 120,
      //           width: 160,
      //           alignContent: "center"
      //         }}
      //       />
      //     </CardItem>
      //     <CardItem>
      //       <Left>
      //         <Button small transparent>
      //           <Icon small active name="thumbs-up" />
      //           <Text>12 </Text>
      //         </Button>
      //       </Left>
      //       <Body>
      //         <Button small transparent>
      //           <Icon small active name="chatbubbles" />
      //           <Text>4 </Text>
      //         </Button>
      //       </Body>
      //       {/* <Right>
      //         <Text>11h ago</Text>
      //       </Right> */}
      //     </CardItem>
      //   </Card>
      <Container>
        <Header />
        <Content>
          <Card style={{ flex: 0 }}>
            <CardItem>
              <Left>
                <Thumbnail
                  source={{ uri: "https://loremflickr.com/176/230/cat" }}
                />
                <Body>
                  <Text>NativeBase</Text>
                  <Text note>April 15, 2016</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Image
                  source={{ uri: this.props.imageSrc }}
                  style={{ height: 200, width: 200, flex: 1 }}
                />
                <Text>//Your text here</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Button small transparent>
                  <Icon small active name="thumbs-up" />
                  <Text>12 </Text>
                </Button>
              </Left>
              <Body>
                <Button small transparent>
                  <Icon small active name="chatbubbles" />
                  <Text>4 </Text>
                </Button>
              </Body>
              <Right>
                <Text>11h ago</Text>
              </Right>
            </CardItem>
          </Card>
        </Content>
      </Container>
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
