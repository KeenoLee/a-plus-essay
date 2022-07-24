import { SafeAreaView, Button } from 'react-native'
import React from 'react'
import { Box, Center, Image, ScrollView, Stack, View, Text, Heading } from 'native-base';
import LottieView from 'lottie-react-native';

export function AboutUsHeading() {

    const animationRef = React.useRef<LottieView>(null)

    return (
        <Box marginX='2' mt='4'>
            <Box alignSelf="center" py="4" mt='4' borderRadius="xl" width="90%" maxWidth="100%" bgColor='teal.400'>
                <Stack ml='4'>
                    <Text textAlign='left' fontWeight='bold' fontSize='25' color='#134e4a'>About Us</Text>
                </Stack>
                <Stack>
                    <Stack ml='4'>
                        <Text textAlign='left' fontWeight='semibold' fontSize='20' color='white'>Maximize your University</Text>
                        <Text textAlign='left' fontWeight='semibold' fontSize='20' color='white'>Study Life!</Text>
                    </Stack>
                </Stack>
                <Stack marginX='4' mt='4'>
                    <Text textAlign='left' fontWeight='semibold' fontSize='18' color='#f5f5f5'>
                        A Plus is an mobile app that connects students to tutors in an instant private learning session one-on-one.
                        We support students on their personalized learning journey and let them to better understand their assignment.
                    </Text>
                </Stack>
                <Stack pt='4'>
                    <View pt="200">
                        <LottieView
                            ref={animationRef}
                            source={require('../assets/About-us.json')}
                            autoPlay
                            loop />
                    </View>
                </Stack>
            </Box>
        </Box>
    )
}

export default function AboutUs() {
    // const animationRef = React.useRef<LottieView>(null)

    return (
        <ScrollView>
            <AboutUsHeading />
        </ScrollView>
    )
}