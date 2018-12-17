import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import Image from './Image';

export default function Avatar({ src, size = 50, style, onPress, ...rest }) {
    let Wrapper = onPress ? TouchableOpacity : View;
    return (
        <Wrapper
            onPress={onPress}
            style={[
                { width: size, height: size, borderRadius: size / 2 },
                styles.avatarRadius,
                style,
            ]}
        >
            <Image
                resizeMode="cover"
                {...rest}
                source={{ uri: src }}
                style={{ position: 'absolute', width: size, height: size }}
            />
        </Wrapper>
    );
}

const styles = StyleSheet.create({
    avatarRadius: {
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
