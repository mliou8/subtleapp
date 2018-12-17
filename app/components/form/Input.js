import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

export default function Input(props) {
    let {
        keyboardType = 'default',
        underlineColorAndroid = 'transparent',
        style,
        inputRef,
        disabled,
        ...rest
    } = props;

    return (
        <TextInput
            {...rest}
            ref={inputRef}
            editable={!disabled}
            keyboardType={keyboardType}
            style={[styles.input, style]}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        height: 50,
        paddingLeft: 10,
        paddingVertical: 10,
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderWidth: 1,
        borderRadius: 3,
    },
});
