import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10,
    },
    tweetHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }, 
    tweetHeaderNames:{
        flexDirection: 'row'
    },
    name: {
        marginRight: 5,
        fontWeight: 'bold',
    },
    username: {
        marginRight: 5,
        color: 'grey'
    },
    createdAt: {
        marginRight: 5,
        color: 'grey'
    },
    content: {
        marginTop: 3,
        lineHeight: 20,
        textAlign: 'justify'
    },
    image: {
        marginVertical: 10,
        width: '100%',
        height: 300,
        resizeMode: 'cover',
        borderRadius: 10,
        overflow: 'hidden'
    }
})

export default styles;