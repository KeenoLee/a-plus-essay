import React, { useState } from 'react'
import { Box, FormControl, Text, Input, Stack, VStack, TextArea, HStack, Button, Icon, CloseIcon, IconButton, View } from "native-base";
import DateTimePicker from './DateTimePicker';
import { launchImageLibrary } from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FilePicker from './FilePicker';
import { format } from 'date-fns'
import { TouchableOpacity } from 'react-native-gesture-handler';
interface Guideline {
    filename: string,
    base64Data: string
}

interface Note {
    filename: string,
    base64Data: string
}
interface OrderValue {
    title: string
    subject: string
    grade: string
    budget: number | string
    description: string | null
    guidelines: Guideline[]
    notes: Note[]
    tutorDeadline: Date | null
    studentDeadline: Date | null
}
function shorterFilename(filename: string) {
    if (filename.length > 10) {
        return filename.substring(0, 11) + '...'
    }
    return filename
}
async function fetchOrder(order: OrderValue) {
    const res = await fetch('http://localhost:8111/order-submission', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
    })
    const result = await res.json()
    if (result.error) {
        return result
    }
    return 'success'
}
export default function OrderSubmission() {
    const [orderValue, setOrderValue] = useState<OrderValue>({
        title: '',
        subject: '',
        grade: '',
        budget: '',
        description: null,
        guidelines: [],
        notes: [],
        tutorDeadline: null,
        studentDeadline: null
    })

    const addGuideline = () => {
        openGallery(file => {
            setOrderValue(value => value = {
                ...value,
                guidelines: [...value.guidelines, file]
            })

        })
    }
    const addNote = () => {
        openGallery(file => {
            setOrderValue(value => value = {
                ...value,
                notes: [...value.notes, file]
            })

        })
    }
    const openGallery = (callback: (file: { filename: string, base64Data: string }) => void) => {
        launchImageLibrary({
            mediaType: 'photo',
            includeBase64: true
        }, (res) => {
            if (res.didCancel) {
                console.log('user cancelled image picker')
            } else if (res.errorMessage) {
                console.log('Error: ', res.errorMessage)
            } else {
                let filename = res.assets?.[0].fileName
                let base64Data = res.assets?.[0].base64
                if (filename && base64Data) {
                    callback({ filename, base64Data })
                    return
                }
                console.log('file is not found')
                return
            }
        })
    }
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
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <HStack>
                    <FormControl.Label>Budget</FormControl.Label>
                    <FormControl w="20" style={{ marginLeft: 10 }}>
                        <Input variant="outline" placeholder="$" onChangeText={value => setOrderValue({ ...orderValue, budget: parseInt(value) })} />
                    </FormControl>
                </HStack>
                <HStack>
                    <FormControl.Label>Grade</FormControl.Label>
                    <FormControl w="20" style={{ marginLeft: 10 }}>
                        <Input variant="outline" placeholder="" onChangeText={value => setOrderValue({ ...orderValue, grade: value })} />
                    </FormControl>
                </HStack>
            </View>
            <Stack space={4}>
                <FormControl.Label>Project Description </FormControl.Label>
                <TextArea h={24} placeholder="Please specify your project requirement (Optional)" w="100%" maxW="300" autoCompleteType={undefined} onChangeText={value => setOrderValue({ ...orderValue, description: value })} />
            </Stack>
            <HStack style={{ justifyContent: 'space-between', alignItems: 'center', height: 80 }}>
                <FormControl.Label style={{ flex: 2, justifyContent: 'center' }}>Guideline</FormControl.Label>
                {/* <FilePicker /> */}

                <View style={{ flex: 4 }}>
                    {orderValue.guidelines.map((guideline, index) => (
                        <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 25 }}>
                            <Text style={{ textAlign: 'center' }}>
                                {shorterFilename(guideline.filename)}
                            </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    setOrderValue(value => value = {
                                        ...value,
                                        guidelines: value.guidelines.filter((_, i) => i !== index)
                                    })
                                }}
                            >
                                <Text>
                                    x
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
                <View style={{ flex: 2 }}>
                    <Button onPress={() => addGuideline()} leftIcon={<Ionicons name="cloud-upload-outline" color="white" />}>
                        Upload
                    </Button>
                </View>

            </HStack>
            <HStack style={{ justifyContent: 'space-between', alignItems: 'center', height: 80 }}>
                <FormControl.Label style={{ flex: 2, justifyContent: 'center' }}>Lecture Notes</FormControl.Label>
                <View style={{ flex: 4 }}>
                    {orderValue.notes.map((note, index) => (
                        <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 25 }}>
                            <Text style={{ textAlign: 'center' }}>
                                {shorterFilename(note.filename)}
                            </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    setOrderValue(value => value = {
                                        ...value,
                                        notes: value.notes.filter((_, i) => i !== index)
                                    })
                                }}
                            >
                                <Text>
                                    x
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
                <View style={{ flex: 2 }}>
                    <Button onPress={() => addNote()} leftIcon={<Ionicons name="cloud-upload-outline" color="white" />}>
                        Upload
                    </Button>
                </View>


            </HStack>
            <HStack style={{ justifyContent: 'space-between', alignItems: 'center', height: 50 }}>
                <FormControl.Label style={{ flex: 4 }}>Desired Deadline</FormControl.Label>
                {orderValue.tutorDeadline ?
                    <Text style={{ flex: 3, textAlign: 'center' }}>{format(orderValue.tutorDeadline, 'yyyy-MM-dd HH:mm')}</Text> :
                    <Text style={{ flex: 3 }}></Text>}
                <FormControl style={{ flex: 3 }}>
                    <DateTimePicker
                        onChange={(value: Date) => setOrderValue({ ...orderValue, tutorDeadline: value })}
                    />
                </FormControl>
            </HStack>
            <HStack style={{ justifyContent: 'space-between', alignItems: 'center', height: 50 }}>
                <FormControl.Label style={{ flex: 4 }}>Actual Deadline</FormControl.Label>
                {orderValue.studentDeadline ?
                    <Text style={{ flex: 3, textAlign: 'center' }}>{format(orderValue.studentDeadline, 'yyyy-MM-dd HH:mm')}</Text> :
                    <Text style={{ flex: 3 }}></Text>}
                <FormControl style={{ flex: 3 }}>
                    <DateTimePicker
                        onChange={(value: Date) => setOrderValue({ ...orderValue, studentDeadline: value })}
                    />
                </FormControl>
            </HStack>
            <HStack justifyContent="space-evenly">
                <Button>Confirm</Button>
                <Button>Cancel</Button>
            </HStack>
        </VStack>
    )
}