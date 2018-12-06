import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';
import { ImagePicker } from 'expo';
import { Camera, Permissions } from 'expo';

import TabBarIcon from '../../components/common/TabBarIcon';

export default class SubmitContent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      display: 'initial',
      text: '',
      image: null,
      hasCameraPermission: null,
      hasCameraRollPermission: null,
      type: Camera.Constants.Type.back,
    }
    this._pickImage = this._pickImage.bind(this);
    this.renderCamera = this.renderCamera.bind(this);
  }
  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }
  
  _pickImage = async () => {
    const { rollstatus } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({ hasCameraRollPermission: rollstatus === 'granted' });
    if (this.state.hasCameraRollPermission) {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }
    }
  };
  
renderCamera() {
  const { hasCameraPermission } = this.state;
  if (hasCameraPermission === null) {
    return <View />;
  } else if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  } else {
    return (
      <View style={{ flex: 1 }}>
        <Camera style={{ flex: 1 }} type={this.state.type}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              style={{
                flex: 0.1,
                alignSelf: 'flex-end',
                alignItems: 'center',
              }}
              onPress={() => {
                this.setState({
                  type: this.state.type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back,
                });
              }}>
              <Text
                style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                {' '}Flip{' '}
              </Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    )}
  }
  
  render() {
    const image = this.state.image;

    return (
      <View style={styles.container}>
        <Button title="Go Back" onPress={() => this.props.resetState()}/>
          <View style={styles.submitContainer}>
            <Text>Submit Content</Text>
              <TextInput
                style={{height: 40}}
                placeholder="Type here to translate!"
                onChangeText={(text) => this.setState({text})}
                />
              <Button
                title="Pick an image from camera roll"
                onPress={this._pickImage}
                />
              {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
              <Text style={{padding: 10, fontSize: 42}}>
                {this.state.text.split(' ').map((word) => word && '🍕').join(' ')}
              </Text>
              {this.renderCamera()}
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignContent: 'space-between',
    justifyContent: 'center',
  },
  submitContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  }
});
