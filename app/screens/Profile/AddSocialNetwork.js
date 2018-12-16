import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Picker
} from "react-native";

import Badge from "app/components/common/Badge";

import { connect } from "react-redux";
import { listRepos } from "app/reducers/reducer";

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
} from "native-base";

export default class AddSocialNetworkTag extends Component {
  constructor() {
    super();
    this.state = {};
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    const networks = [
      "facebook",
      "twitter",
      "instagram",
      "snapchat",
      "youtube"
    ];
    const self = this;
    return (
      <View>
        <View>
          <Card style={{ display: "flex", flexDirection: "row" }}>
            <Form>
              <Item picker style={{ width: "40%" }}>
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
            <Form style={{ width: "40%" }}>
              <Item floatingLabel>
                <Label>Username:</Label>
                <Input />
              </Item>
            </Form>
            <Button
              small
              // light
              transparent
              style={{
                marginTop: 2,
                justifyContent: "flex-end",
                width: "15%"
              }}
              onPress={() => console.log("pressed")}
            >
              <Icon type="FontAwesome" name="plus-circle" />
            </Button>
          </Card>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  let storedRepositories = state.repos.map(repo => ({ key: repo.id, ...repo }));
  return {
    repos: storedRepositories
  };
};

const mapDispatchToProps = {
  listRepos
};
