import React, { Component } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { ImagePicker } from 'expo';
import { Camera, Permissions } from 'expo';

import { Avatar } from '../../components/image';
import { Input } from '../../components/form';
import { Text } from '../../components/text';
import styles from './SubmitContent.styles';

export default class SubmitContent extends Component {
    static navigationOptions = {
        headerTitle: 'Create post',
    };

    input;

    componentDidMount() {
        this.input.focus();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.profile}>
                    <Avatar size={65} styles={styles.avatar} src="http://i.pravatar.cc/100" />
                    <Text style={styles.name}>David Martin</Text>
                </View>
                <View style={styles.form}>
                    <Input
                        placeholder="What's up?"
                        inputRef={cmp => (this.input = cmp)}
                        style={styles.input}
                    />
                </View>
            </View>
        );
    }
}
