import { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Image, Text } from 'react-native'
import { env } from '../env/env'
type Props = {
    filename?: string
}
export default function Guideline({ filename }: Props) {
    const [showImage, setShowImage] = useState(false)
    return (
        showImage ?
            <TouchableOpacity onPress={() => setShowImage(false)}>
                <Image source={{ uri: `${env.BACKEND_URL}/get-image/${filename}` }} />
            </TouchableOpacity> :
            <TouchableOpacity onPress={() => setShowImage(true)}>
                <Text>Guideline</Text>
            </TouchableOpacity>
    )
}