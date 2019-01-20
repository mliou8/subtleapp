import React from 'react';
import {
  View,
  ScrollView,
  Image,
  Platform,
  StyleSheet,
  Button,
  Dimensions,
  Text,
} from 'react-native';

export default class MessageNav extends React.Component {
render() {
	return (
		<Button transparent onPress={() => navigation.navigate('Messages')}>
			<Icon
	  			type="Entypo"
	  			name="mail-with-circle"
	  			style={{ color: 'black', fontSize: 30 }}
			/>
		</Button>
		)
}


}