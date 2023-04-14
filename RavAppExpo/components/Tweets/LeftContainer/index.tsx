import React from "react";
import { View } from "react-native";
import { UserType } from '../../../types'
import ProfilePicture from "../../ProfilePicture";

export type LeftContainerProps = {
    user: UserType
}

const LeftContainer = ({ user }: LeftContainerProps) => (
    <View>
        <ProfilePicture size={40} image={user.image}/>

    </View>
)

export default LeftContainer;