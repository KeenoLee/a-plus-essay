import * as React from "react";
import { VStack, Center, Text, Box, Stack, Button, View, PresenceTransition } from 'native-base';
import LottieView from 'lottie-react-native';
import { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import VerticalTutorCard from "./VerticalTutorCard";


export function HowToUseCard() {
    const animationRef = React.useRef<LottieView>(null)
    const [isOpen, setIsOpen] = useState(false)
    // useEffect(() => {
    //     animationRef.current?.play()

    //     // Or set a specific startFrame and endFrame with:
    //     animationRef.current?.play(30, 120);
    // }, [])

    return (
        // Card Size: Almost cover half of the screen
        <Box>
            <Box bg="primary.600" alignSelf="center" py="4" mt='4' borderRadius="xl" width="90%" maxWidth="100%" bgColor='tertiary.400'>
                <Stack>
                    <Stack ml='4'>
                        {/* Heading Message: 
                    Tutor: How to start your first Job etc..
                    Student: How to start your study journey etc.. */}
                        <Text fontWeight='normal' fontSize='20' color='white'>HOW TO</Text>
                        <Text fontWeight='bold' fontSize='20' color='white'>Start your study journey</Text>
                        <Text fontWeight='bold' fontSize='20' color='white'>with our Expert!</Text>
                    </Stack>
                </Stack>
                <Stack>
                    {/* Lottle File Animation: Book etc*/}
                    <View pt="100">
                        <LottieView
                            ref={animationRef}
                            source={require('../assets/Books.json')}
                            autoPlay
                            loop />
                    </View>
                </Stack>
                <Stack>
                    <Box bg='amber.200' size='4' width='100%'></Box>
                    {/* Button:
                    Tutor: Let's Started
                    Student: Start Learning
                    */}
                    {/* onPress -> Show how to use photo etc... */}
                    <Button mt='4' ml='4' w='150' py='2' borderRadius="14" size='sm' bgColor="white"
                        _text={{ color: 'black', fontSize: '15', fontWeight: 'bold' }}
                        _pressed={{ bgColor: "teal.700" }}
                        onPress={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? "Back" : "Start Learning"}
                    </Button>
                </Stack>
            </Box>
            <Stack>
                <PresenceTransition visible={isOpen} initial={{
                    opacity: 0
                }} animate={{
                    opacity: 1,
                    transition: {
                        duration: 100
                    }
                }}>
                    {isOpen ?
                        <Box mt="7" mb='7 'bg="teal.500" rounded="md" width="80%" h="200" alignSelf='center'>
                            <Text>Step</Text>
                        </Box>
                        : null
                    }
                </PresenceTransition>
            </Stack>
        </Box>

    )
}
{/* <Center mt="7" bg="teal.500" rounded="md" width="80%" h="200" alignSelf='center'
    _text={{
        color: "white"
    }}>
    Fade
</Center> */}

export default function Home() {

    return (
        <ScrollView>
            <HowToUseCard />
            <VerticalTutorCard />
            <VStack space={5}>
                {/* <HowToUseCard /> */}
                <Center bg="primary.400" _text={{
                    color: "white",
                    fontWeight: "bold"
                }} height={200} width={{
                    base: 200,
                    lg: 250
                }}>
                    This is the Center
                </Center>
                <Center bg="primary.400" _text={{
                    color: "white",
                    fontWeight: "bold"
                }} height={200} width={{
                    base: 200,
                    lg: 250
                }}>
                    This is the Center
                </Center>
            </VStack>
        </ScrollView>
    )
}