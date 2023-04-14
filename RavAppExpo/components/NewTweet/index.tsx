import React from "react";
import { TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from "@expo/vector-icons";

const NewTweet = () => {
    return (
        <TouchableOpacity>
            <MaterialCommunityIcons name={"feather"} size={30} color={"white"}/>
        </TouchableOpacity>
    )
}

export default NewTweet;