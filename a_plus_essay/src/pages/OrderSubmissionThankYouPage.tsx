import React from 'react'
import BackToHomeBtn from '../components/BackToHomeBtn'
import { Box, Heading, Stack, Text } from 'native-base'
import { StyleSheet } from 'react-native'

export default function OrderSubmissionThankYouPage() {
    return (
        <Stack space={12} mt="48">
            <Box alignItems="center" justifyContent="center">
                <Heading mb="4">Order Submitted !</Heading>
                <Text style={styles.message}>We are processing your request.</Text>
                <Text style={styles.message}>A confirmation message</Text>
                <Text style={styles.message}>will be sent to you shortly.</Text>
            </Box>
            <BackToHomeBtn/>
        </Stack>
    )
}

const styles = StyleSheet.create ({
    message: {
        color: "#5F92B7",
        fontStyle: 'italic',
        fontWeight: '600'
    },
})