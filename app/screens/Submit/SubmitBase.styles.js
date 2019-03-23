import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default (styles = StyleSheet.create({
    container: {
        paddingBottom: 10
    },
    overlay: {
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        position : 'absolute',
        left: 0,
        top: 0,
        width : width,
        height : height,
    },
}));
