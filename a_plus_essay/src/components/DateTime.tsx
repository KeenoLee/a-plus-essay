import { format } from 'date-fns'
import { StyleProp, Text, TextStyle } from 'react-native'
import React from 'react'

export default function DateTime(props: {
    time: string | number | Date | undefined | null,
    style?: StyleProp<TextStyle>
}) {
    return (
        <Text style={props.style}>{props.time
            ? format(new Date(props.time), 'yyyy-MM-dd HH:mm')
            : ''}</Text>
    )
}
