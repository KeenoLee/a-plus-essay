import * as React from "react";
import { VStack, Center, Text, Box, HStack, Pressable, Stack, Button } from 'native-base';


export function HowToUseCard() {
    return (
        // Card Size: Almost cover half of the screen
        <Box bg="primary.600" alignSelf="center" py="4" mt='4'borderRadius="xl" width="90%" maxWidth="100%" bgColor='tertiary.400'>
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
            </Stack>
            <Stack>
                <Button bgColor='amber.200'>
                    {/* Button:
                    Tutor: Let's Started
                    Student: Start Learning
                    */}
                    
                    {/* onPress -> Show how to use photo etc... */}
                </Button>
            </Stack>
        </Box>
    )
}

export default function Home() {

    return (
        <VStack space={5}>
            <HowToUseCard/>
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
    )
}