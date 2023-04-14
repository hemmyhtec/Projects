import React from "react";
import { Image } from 'react-native'

export type ProfilePictureprops = {
    image?: string,
    size?: number,
}

const ProfilePicture = ({ image, size= 50}: ProfilePictureprops)=>(
    <Image 
        source={{ uri: image }} 
        style={{ 
            width: size, 
            height: size,
            borderRadius: size
        }}
    />
)

export default ProfilePicture;