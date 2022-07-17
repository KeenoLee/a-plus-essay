import React, { useState } from 'react'
import { Box, FormControl, Text, Input, Stack, VStack, TextArea, HStack, Button, Icon, CloseIcon, IconButton } from "native-base";
import DateTimePicker from './DateTimePicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FilePicker from './FilePicker';

export default function OrderSubmission() {
    const [orderValue, setOrderValue] = useState({})

    return (
        <VStack space={4} alignSelf="center" px="4" w={{ base: "100%" }}>
            <Stack>
                <FormControl>
                    <FormControl.Label>Project Title</FormControl.Label>
                    <Input variant="underlined" placeholder="" onChangeText={value => setOrderValue({ ...orderValue, title: value })} />
                </FormControl>
                <FormControl>
                    <FormControl.Label>Subject</FormControl.Label>
                    <Input variant="underlined" placeholder="" onChangeText={value => setOrderValue({ ...orderValue, subject: value })} />
                </FormControl>
            </Stack>
            <HStack>
                <FormControl.Label>Budget</FormControl.Label>
                <FormControl w="20">
                    <Input variant="outline" placeholder="$" onChangeText={value => setOrderValue({ ...orderValue, budget: value })} />
                </FormControl>
            </HStack>
            <Stack space={4}>
                <FormControl.Label>Project Description </FormControl.Label>
                <TextArea h={24} placeholder="Please specify your project requirement (Optional)" w="100%" maxW="300" autoCompleteType={undefined} onChangeText={value => setOrderValue({ ...orderValue, description: value })} />
            </Stack>
            <HStack>
                <FormControl.Label>Guideline</FormControl.Label>
                <FilePicker />
            </HStack>
            <HStack>
                <FormControl.Label>Lecture Notes</FormControl.Label>
                <FilePicker />
            </HStack>
            <HStack>
                <FormControl.Label>Desired Deadline</FormControl.Label>
                <FormControl w="24">
                    <DateTimePicker
                        onChange={(value: Date) => setOrderValue({ ...orderValue, tutorDeadline: value })}
                    />
                </FormControl>
            </HStack>
            <HStack>
                <FormControl.Label>Actual Deadline</FormControl.Label>
                <FormControl w="24">
                    <DateTimePicker
                        onChange={(value: Date) => setOrderValue({ ...orderValue, studentDeadline: value })}
                    />
                </FormControl>
            </HStack>
            <HStack justifyContent="space-around">
                <Button>Confirm</Button>
                <Button>Cancel</Button>
            </HStack>
        </VStack>
    )
}