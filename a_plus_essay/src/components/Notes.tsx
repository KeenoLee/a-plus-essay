import * as React from 'react'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Image, Text } from 'react-native'
import { env } from '../env/env'
type Props = {
    filename?: string
}
export default function Notes({ filename }: Props) {
    console.log('Note FilenamE? ', filename)
    const [showImage, setShowImage] = useState(false)
    return (
        <>
        {showImage ?
            <TouchableOpacity onPress={() => setShowImage(false)}>
                <Image style={{width:100, height: 100, }} source={{ uri: `${env.BACKEND_URL}/get-image/${filename}` }} />
            </TouchableOpacity> :
            <TouchableOpacity onPress={() => setShowImage(true)}>
                <Text>Show Note</Text>
            </TouchableOpacity>}
        </>
    )
}