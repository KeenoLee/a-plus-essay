import { View } from 'react-native';
import React from 'react';
import { Box, Divider, HStack, ScrollView, Stack, Text } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const tutorData = [{
  id: Math.random(),
  name: 'Beeno',
  rating: '5.0',
  school: 'The Hong Kong Polytechnic University',
  major1: "Programming",
  major2: "Marketing",
  major3: "Finance",
  donePaper: 32
},
{
  id: Math.random(),
  name: "Alex",
  rating: "5.0",
  school: "The University of Hong Kong",
  major1: "Account",
  major2: "Business Analysis",
  major3: "Philosophy",
  donePaper: 99
},
{
  id: Math.random(),
  name: "Dennis",
  rating: "4.9",
  school: "The Chinese University of Hong Kong",
  major1: "Architecture",
  major2: "Programming",
  major3: "Electronic Engineering",
  donePaper: 10
},
  // {
  //   id: Math.random(),
  //   name:
  //   rating:
  //   school:
  //   major1:
  //   major2:
  //   major3:
  //   donePaper:
  // },
]
//@ts-ignore
export const VerticalTutorCard = ({ id, name, rating, school, major1, major2, major3, donePaper }) => {
  return (
    <ScrollView>
      <Box
        bg={{
          linearGradient: {
            colors: ['#ADEDD5', '#FBEE97'],
            start: [0, 0],
            end: [0, 1],
          },
        }}
        borderRadius="xl"
        ml="4"
        mt="2"
        width="40"
        maxWidth="100%"
        alignItems="center"
        flex="1"
        py="2">
        {/*Nickname + Rating: LeftIcon: Star, Right: Avserage rating -> should generated from backend */}
        <HStack mr="2" ml="2">
          <HStack
            flex="2"
            alignItems="center"
            alignSelf="center"
            justifyContent="center"
            ml="1"
            mr="1">
            <Text textAlign="center" fontWeight="extrabold" fontSize="20">
              {name}
            </Text>
          </HStack>
          <HStack
            alignItems="center"
            alignSelf="center"
            justifyContent="center"
            bgColor="tertiary.400"
            borderRadius="14"
            w="60"
            py="1">
            <Ionicons name="star" color="white" size={13} />
            <Text ml="1" color="white" fontWeight="bold" fontSize="13">
              {rating}
            </Text>
          </HStack>
        </HStack>
        <Divider my="1" />
        <Stack>
          {/*University -> Limited Text*/}
          <Text pl="3" pr="3" fontWeight="bold" textAlign="center">
            {school}
          </Text>
        </Stack>
        <Stack>
          {/* 1. Preferred Subject -> Limited Text*/}
          {/* 2. Preferred Subject -> Limited Text*/}
          {/* 3. Preferred Subject -> Limited Text*/}
          <Text fontWeight="light" textAlign="center">
            {major1}
          </Text>
          <Text fontWeight="light" textAlign="center">
            {major2}
          </Text>
          <Text fontWeight="light" textAlign="center">
            {major3}
          </Text>
        </Stack>
        <Stack pb="2">
          {/* No. of completed order + "Finished Papers"*/}
          <Text fontWeight="medium" textAlign="center">
            {donePaper} Finished Papers
          </Text>
        </Stack>
      </Box>
    </ScrollView>
  );
}
