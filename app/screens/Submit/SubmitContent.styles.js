import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default (styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
    },
    profile: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        maxHeight: height * 0.1,
    },
    name: {
        fontSize: 22,
        marginHorizontal: 15,
    },
    form: {},
    input: {
        borderColor: 'transparent',
    },
}));
