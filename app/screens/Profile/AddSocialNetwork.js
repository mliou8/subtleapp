import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Picker
} from 'react-native';

import Badge from 'app/components/common/Badge';

import { connect } from 'react-redux';

import {
  Card,
  Button,
  Form,
  Icon,
  Item,
  Input,
  Label,
  Container,
  Header,
  Content
} from 'native-base';

export default class AddSocialNetworkTag extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const networks = [
      'facebook',
      'twitter',
      'instagram',
      'snapchat',
      'youtube'
    ];
    const self = this;
    return (
      <View>
        <View>
          <Card style={{ display: 'flex', flexDirection: 'row' }}>
            <Form>
              <Item picker style={{ width: '45%' }}>
                <Picker
                  selectedValue={this.state.selectedNetwork}
                  itemStyle={{ height: 80, width: 100 }}
                  onValueChange={selectedNetwork =>
                    this.setState({ selectedNetwork })
                  }
                >
                  {networks
                    ? networks.map(social => (
                        <Picker.Item
                          label={social}
                          value={social}
                          key={social}
                        />
                      ))
                    : null}
                </Picker>
              </Item>
            </Form>
            <Form style={{ width: '50%' }}>
              <Item floatingLabel>
                <Label>Username:</Label>
                <Input />
              </Item>
            </Form>
            <Button
              transparent
              style={{
                marginTop: 2
              }}
              onPress={() =>
                console.log('onSubmit function will be fired--after I write it')
              }
            >
              <Icon
                type="FontAwesome"
                name="plus-circle"
                style={{ fontSize: 30 }}
              />
            </Button>
          </Card>
        </View>
      </View>
    );
  }
}
