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

export function AboutUsBody() {
    const animationRef = React.useRef<LottieView>(null)
    return (
        <Stack marginX='2' mt='4'>
            <Stack pt='4' alignSelf="center" py="4" mt='4' borderRadius="xl" width="90%" maxWidth="100%" bgColor='cyan.400'>
                <Stack ml='4'>
                    <Text textAlign='left' fontWeight='bold' fontSize='25' color='#134e4a'>Core Values</Text>
                </Stack>
                <View pt="150">
                    <LottieView
                        ref={animationRef}
                        source={require('../assets/Instant-icon.json')}
                        autoPlay
                        loop />
                </View>
                <Text mt='2' textAlign='center' fontWeight='bold' fontSize='20' color='#134e4a'>Immediate</Text>
                <Text mt='2' textAlign='center' fontWeight='medium' fontSize='16' color='white'>Automatically match with</Text>
                <Text textAlign='center' fontWeight='medium' fontSize='16' color='white'>most suitable tutor </Text>
            </Stack>
            <Stack pt='2' alignSelf="center" py="4" mt='4' borderRadius="xl" width="90%" maxWidth="100%" bgColor='lightBlue.400'>
                <View pt="200" >
                    <LottieView
                        ref={animationRef}
                        source={require('../assets/Quality-icon.json')}
                        autoPlay
                        loop />
                </View>
                <Text mt='-12' textAlign='center' fontWeight='bold' fontSize='20' color='#134e4a'>Good Quality</Text>
                <Text mt='2' textAlign='center' fontWeight='medium' fontSize='16' color='white'>Helps over 300 students</Text>
                <Text textAlign='center' fontWeight='medium' fontSize='16' color='white'>to obtain good result</Text>
            </Stack>
            <Stack pt='8' pb='10' alignSelf="center" py="4" mt='4' borderRadius="xl" width="90%" maxWidth="100%" bgColor='blue.400'>
                <View pt="150">
                    <LottieView
                        ref={animationRef}
                        source={require('../assets/Team-icon.json')}
                        autoPlay
                        loop />
                </View>
                <Text mt='2' textAlign='center' fontWeight='bold' fontSize='20' color='#134e4a'>Credible</Text>
                <Text mt='2' textAlign='center' fontWeight='medium' fontSize='16' color='white'>All tutors who have top public</Text>
                <Text textAlign='center' fontWeight='medium' fontSize='16' color='white'>exam result in Top University</Text>
            </Stack>
        </Stack>
    )
}

export default function AboutUs() {
    // const animationRef = React.useRef<LottieView>(null)

    return (
        <ScrollView>
            <AboutUsHeading />
            <AboutUsBody />
        </ScrollView>
    )
}