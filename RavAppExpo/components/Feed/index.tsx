import React from "react";
import { View, FlatList } from 'react-native';
import tweets from '../data/tweets'
import Tweet from '../Tweets'


const Feed = () =>(
    <View style={{ width:'100%'}}>
        <FlatList
            data={tweets}
            renderItem={({item}) => <Tweet tweet={item}/>}
            keyExtractor={(item) => item.id}
        />
    </View>
)

export default Feed;