import React, { Component } from 'react';
import {
  Keyboard,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Alert
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Button,
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Text
} from 'native-base';
import SingleInput from 'app/components/form/SingleInput';
import styles from './Submit.styles';

export default class SubmitContent extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView style={{ backgroundColor: 'white' }}>
          <View style={styles.container}>
            <Modal
              avoidKeyboard
              onBackdropPress={() => this.props.toggleModal(false)}
              onBackButtonPress={() => this.props.toggleModal(false)}
              isVisible={this.props.modalVisible}
            >
              <View style={styles.modalContainer}>
                <TouchableOpacity
                  onPress={this.props.takePicture}
                  style={styles.modalButton}
                >
                  <Icon size={30} name="camera" style={styles.modalIcon} />
                  <Text>Take photo</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={this.props.pickImageFromCameraRoll}
                  style={styles.modalButton}
                >
                  <Icon size={30} name="image" style={styles.modalIcon} />
                  <Text>Choose photo from gallery</Text>
                </TouchableOpacity>
              </View>
            </Modal>
            <View style={styles.form}>
              <Form>
                <Item floatingLabel>
                  <Label>Title</Label>
                  <Input
                    onChangeText={text => this.props.updateTitleInput(text)}
                    value={this.props.title}
                  />
                </Item>
              </Form>
              <SingleInput
                multiline
                placeholder="What's up?"
                style={[styles.input, { height: this.props.height }]}
                onContentSizeChange={e =>
                  this.props.updateSize(e.nativeEvent.contentSize.height)
                }
                onChangeText={text => this.props.updateTextInput(text)}
                maxLength={3000}
                value={this.props.text}
              />
              <TouchableOpacity
                onPress={() => this.props.toggleModal(true)}
                style={styles.touchable}
              >
                <Icon name="camera" size={20} style={styles.icon} />
                <Text style={styles.add}>
                  {this.props.uploads.length ? 'Add more photos' : 'Add photos'}
                </Text>
              </TouchableOpacity>
              <View style={styles.images}>
                {this.props.uploads.length
                  ? this.props.uploads.map(uri => {
                      return (
                        <ImageBackground
                          key={uri}
                          style={styles.upload}
                          source={{ uri }}
                        >
                          <TouchableOpacity
                            onPress={() => this.props.removeImage(uri)}
                          >
                            <Icon
                              size={25}
                              name="close"
                              style={styles.delete}
                            />
                          </TouchableOpacity>
                        </ImageBackground>
                      );
                    })
                  : null}
              </View>
            </View>
            <Button
              block
              dark
              onPress={() => this.props.uploadPhoto()}
              style={{marginLeft: 10, marginRight: 10, marginTop: 35,}}
            >
              <Text
                color="white"
                style={{
                  fontFamily: 'poppinsBold'
                }}
              >
                Submit
              </Text>
            </Button>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  }
}
