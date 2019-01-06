import React from 'react';
import { StyleSheet, Text } from 'react-native';

function isString(value) {
    return typeof value === 'string';
}

export default function TextComponent(props) {
    let {
        uppercase,
        multiline = false,
        lines = 1,
        bold,
        underline,
        color,
        children,
        style,
        ...rest
    } = props;

    let explicitStyles = [];

    if (uppercase && isString(children)) {
        children = children.toUpperCase();
    }

    if (bold) {
        explicitStyles.push(styles.bold);
    }

    if (underline) {
        explicitStyles.push(styles.underline);
    }

    if (isString(children)) {
        explicitStyles.push({ color });
    }

    return (
        <Text numberOfLines={multiline ? null : lines} style={[style, explicitStyles]} {...rest}>
            {children}
        </Text>
    );
}

const styles = StyleSheet.create({
    underline: { textDecorationLine: 'underline' },
    bold: { fontWeight: '600' },
});
