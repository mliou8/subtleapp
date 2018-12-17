import React from 'react';
import { Image } from 'react-native';

export default (props) => {
    return (
        <Image
            resizeMode="contain"
            {...props}
        />
    );
}