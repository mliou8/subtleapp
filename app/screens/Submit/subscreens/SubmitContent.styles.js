import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default (styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
    },
    form: {
        marginHorizontal: 20,
    },
    overlay: {
        flex: 1,
        position: 'absolute',
        left: 0,
        top: 0,
        opacity: 0.5,
        backgroundColor: 'black',
        width: width,
        zIndex: 1,
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
        paddingLeft: 10,
    },
    add: {
        marginHorizontal: 10,
        opacity: 0.6,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        maxHeight: height * 0.2,
        backgroundColor: '#fafafa',
        borderRadius: 2,
        padding: 15,
    },
    modalButton: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    modalIcon: {
        marginRight: 10,
    },
    images: {
        marginTop: 10,
        alignItems: 'flex-end',
    },
    upload: {
        marginVertical: 10,
        width: 280,
        height: 210,
    },
    delete: {
        color: 'white',
        opacity: .7,
        position: 'absolute',
        right: 5,
        top: 5
    }
}));
