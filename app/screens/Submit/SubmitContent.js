import React, { Component } from 'react';
import { Keyboard, View, TouchableWithoutFeedback } from 'react-native';

import { Avatar } from '../../components/image';
import { Input } from '../../components/form';
import { Text } from '../../components/text';
import styles from './SubmitContent.styles';

export default class SubmitContent extends Component {
    static navigationOptions = {
        headerTitle: 'Create post',
    };

    state = {
        height: 40,
    };

    input;

    componentDidMount() {
        this.input.focus();
    }

    updateSize = height => {
        let newHeight = height < 40 ? 40 : height;
        this.setState({
            height: newHeight,
        });
    };

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
                    <View style={styles.profile}>
                        <Avatar size={65} styles={styles.avatar} src="http://i.pravatar.cc/100" />
                        <Text style={styles.name}>David Martin</Text>
                    </View>
                    <View style={styles.form}>
                        <Input
                            multiline
                            placeholder="What's up?"
                            inputRef={cmp => (this.input = cmp)}
                            style={[styles.input, { height: this.state.height }]}
                            onContentSizeChange={e =>
                                this.updateSize(e.nativeEvent.contentSize.height)
                            }
                            onBlur={Keyboard.dismiss}
                            maxLength={200}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}
