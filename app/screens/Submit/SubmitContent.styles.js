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
    form: {
        marginHorizontal: 20,
    },
    input: {
        fontSize: 24,
        marginTop: 10,
        marginBottom: 20,
        borderColor: 'transparent',
    },
    touchable: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        opacity: 0.6,
        paddingLeft: 10
    },
    add: {
        marginHorizontal: 10,
        opacity: 0.6,
    },
}));
