import { View, Text } from 'react-native'
import React from 'react'
import { Button, Stack } from 'native-base'

export default function BackToHomeBtn() {
    return (
        <Stack w="70%" alignSelf="center" >
            <Button _pressed={{
                bgColor: "teal.600"
            }}
                size='sm' bgColor="teal.500" borderRadius="14">Back To Home</Button>
        </Stack>
    )
}