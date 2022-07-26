import React from 'react'
import { VStack, Center, Text, Box, Stack, Button, View, PresenceTransition, Heading, HStack, Pressable } from 'native-base';
import LottieView from 'lottie-react-native';

export default function FAQ() {
    const animationRef = React.useRef<LottieView>(null)

    return (
            <View pt="400">
                <LottieView
                    ref={animationRef}
                    source={require('../assets/Coming-soon.json')}
                    autoPlay
                    loop />
            </View>
    )
}