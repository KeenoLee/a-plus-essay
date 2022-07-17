import React, { useState } from 'react'
import { Box, FormControl, Text, Input, Stack, VStack, TextArea, HStack, Button, Icon, CloseIcon, IconButton, View } from "native-base";
import DateTimePicker from './DateTimePicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FilePicker from './FilePicker';
import { format } from 'date-fns'

interface OrderValue {
    title: string
    subject: string
    budget: string
    description: string | null
    guideline: string | null
    note: string | null
    tutorDeadline: Date | null
    studentDeadline: Date | null
}
export default function OrderSubmission() {
    const [orderValue, setOrderValue] = useState<OrderValue>({
        title: '',
        subject: '',
        budget: '',
        description: null,
        guideline: null,
        note: null,
        tutorDeadline: null,
        studentDeadline: null
    })

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
                <FormControl w="20" style={{marginLeft: 10}}>
                    <Input variant="outline" placeholder="$" onChangeText={value => setOrderValue({ ...orderValue, budget: value })} />
                </FormControl>
            </HStack>
            <Stack space={4}>
                <FormControl.Label>Project Description </FormControl.Label>
                <TextArea h={24} placeholder="Please specify your project requirement (Optional)" w="100%" maxW="300" autoCompleteType={undefined} onChangeText={value => setOrderValue({ ...orderValue, description: value })} />
            </Stack>
            <HStack style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <FormControl.Label style={{ flex: 4 }}>Guideline</FormControl.Label>
                <View style={{ flex: 3 }}>
                    <FilePicker />
                </View>
                <View style={{ flex: 3 }}></View>
            </HStack>
            <HStack style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <FormControl.Label style={{ flex: 4 }}>Lecture Notes</FormControl.Label>
                <View style={{ flex: 3 }}>
                    <FilePicker />
                </View>
                <View style={{ flex: 3 }}></View>

            </HStack>
            <HStack style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <FormControl.Label style={{ flex: 4 }}>Desired Deadline</FormControl.Label>
                <FormControl style={{ flex: 3 }}>
                    <DateTimePicker
                        onChange={(value: Date) => setOrderValue({ ...orderValue, tutorDeadline: value })}
                    />
                </FormControl>
                {orderValue.tutorDeadline ?
                    <Text style={{ flex: 3, textAlign:'center' }}>{format(orderValue.tutorDeadline, 'yyyy-MM-dd HH:mm')}</Text> :
                    <Text style={{ flex: 3 }}></Text>}
            </HStack>
            <HStack style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <FormControl.Label style={{ flex: 4 }}>Actual Deadline</FormControl.Label>
                <FormControl style={{ flex: 3 }}>
                    <DateTimePicker
                        onChange={(value: Date) => setOrderValue({ ...orderValue, studentDeadline: value })}
                    />
                </FormControl>
                {orderValue.studentDeadline ?
                    <Text style={{ flex: 3, textAlign:'center' }}>{format(orderValue.studentDeadline, 'yyyy-MM-dd HH:mm')}</Text> :
                    <Text style={{ flex: 3 }}></Text>}
            </HStack>
            <HStack justifyContent="space-around">
                <Button>Confirm</Button>
                <Button>Cancel</Button>
            </HStack>
        </VStack>
    )
}