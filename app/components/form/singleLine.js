import React, { Component } from 'react';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label
} from 'native-base';

export default class SingleLineInput extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Title</Label>
              <Input />
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}
