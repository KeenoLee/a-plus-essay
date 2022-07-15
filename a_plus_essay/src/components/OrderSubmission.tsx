import React, { useState } from 'react'
import { Box, FormControl, Text, Input, Stack, VStack, TextArea, HStack, Button} from "native-base";
import DateTimePicker from './DateTimePicker';
// import DateTimePicker from '@react-native-community/datetimepicker';

export default function OrderSubmission() {
    const [formValue, SetFormValue] = useState('')

    return (
        <VStack space={4} alignSelf="center" px="4" w={{ base: "100%" }}>
            <Stack>
                <FormControl>
                    <FormControl.Label>Project Title</FormControl.Label>
                    <Input variant="underlined" placeholder="" />
                </FormControl>
                <FormControl>
                    <FormControl.Label>Subject</FormControl.Label>
                    <Input variant="underlined" placeholder="" />
                </FormControl>
            </Stack>
            <HStack>
                <FormControl.Label>Budget</FormControl.Label>
                <FormControl w="20">
                    <Input variant="outline" placeholder="$" />
                </FormControl>
            </HStack>
            <Stack space={4}>
                <FormControl.Label>Project Description </FormControl.Label>
                <TextArea h={24} placeholder="Text Area Placeholder" w="75%" maxW="300" autoCompleteType={undefined} />
            </Stack>
            <HStack>
                <FormControl.Label>Desired Deadline</FormControl.Label>
                <FormControl w="20">
                    <DateTimePicker/>
                     {/* <Input variant="outline" placeholder="Date" /> */}
                </FormControl>
            </HStack>
            <HStack>
                <FormControl.Label>Actual Deadline</FormControl.Label>
                <FormControl w="20">
                    <Input variant="outline" placeholder="Date" />
                </FormControl>
            </HStack>
            <HStack justifyContent="space-around">
                <Button>Confirm</Button>
                <Button>Cancel</Button>
            </HStack>
        </VStack>
    )
}