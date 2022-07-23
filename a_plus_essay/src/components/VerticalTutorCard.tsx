import { View } from 'react-native'
import React from 'react'
import { Box, Divider, HStack, Stack, Text } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function VerticalTutorCard() {
    return (
        <Box bg={{
            linearGradient: {
                colors: ['#ADEDD5', '#FBEE97'],
                start: [0, 0],
                end: [0, 1],
            }
        }} borderRadius="xl" ml='4' mt='16' width='45%' maxWidth='50%' alignItems='center'>
            {/*Nickname + Rating: LeftIcon: Star, Right: Avserage rating -> should generated from backend */}
            <HStack mt='3' mr='2' ml='2'>
                <HStack flex='2' alignItems='center' alignSelf='center' justifyContent='center' ml='1' mr='1'>
                    <Text textAlign='center' fontWeight='extrabold' fontSize='20'>Beeno</Text>
                </HStack>
                <HStack alignItems='center' alignSelf='center' justifyContent='center' bgColor='tertiary.400' borderRadius="14" w='60' py='1'>
                    <Ionicons name="star" color="white" size={13} />
                    <Text ml='1' color='white' fontWeight='bold' fontSize='13'>5.0</Text>
                </HStack>
            </HStack>
            <Divider my='1' />
            <Stack>
                {/*University -> Limited Text*/}
                <Text fontWeight='bold' textAlign='center'>The Hong Kong Polytechnic University</Text>
            </Stack>
            <Stack>
                {/* 1. Preferred Subject -> Limited Text*/}
                {/* 2. Preferred Subject -> Limited Text*/}
                {/* 3. Preferred Subject -> Limited Text*/}
                <Text fontWeight='light' textAlign='center'>Programming</Text>
                <Text fontWeight='light' textAlign='center'>Marketing</Text>
                <Text fontWeight='light' textAlign='center'>Finance</Text>
            </Stack>
            <Stack pb='4'>
                {/* No. of completed order + "Finished Papers"*/}
                <Text fontWeight='medium' textAlign='center'>32 Finished Papers</Text>
            </Stack>
        </Box>
    )
}