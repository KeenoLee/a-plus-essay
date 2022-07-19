import React, { useState } from 'react'
import { Box, FormControl, Text, Input, Stack, VStack, TextArea, HStack, Button, Icon, CloseIcon, IconButton, View } from "native-base";
import DateTimePicker from './DateTimePicker';
import { launchImageLibrary } from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FilePicker from './FilePicker';
import { format } from 'date-fns'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Alert } from 'react-native';
import { dataURItoBlob } from '@beenotung/tslib/image'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { env } from '../env/env';
interface UserFile {
    filename: string,
    base64Data: string
    file: File
}
interface OrderValue {
    title: string
    subject: string
    grade: string
    budget: number | string
    description: string | null
    guidelines: UserFile[]
    notes: UserFile[]
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
    const res = await fetch(`${env.BACKEND_URL}/order-submission`, {
        method: 'POST',
        // headers: {
        //     'Content-Type': 'application/json'
        // },
        body: JSON.stringify(order)
    })
    const result = await res.json()
    if (result.error) {
        return result
    }
    return 'success'
}
export default function OrderSubmission() {
    const navigation = useNavigation()
    const userInfo = useSelector((state: RootState) => state.auth.user)
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
    const openGallery = (callback: (file: UserFile) => void) => {
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
                console.log(base64Data)
                if (filename && base64Data) {
                    let blob = dataURItoBlob(base64Data)
                    let file = new File([blob], 'photo', { type: blob.type, lastModified: Date.now() })  // Binary
                    callback({ filename, base64Data, file })
                    return
                }
                console.log('file is not found')
                return
            }
        })
    }
    return (
        userInfo?.userId && !userInfo?.isAdmin && !userInfo?.isTutor ?
            <VStack space={4} alignSelf="center" px="4" w={{ base: "100%" }}>
                <Stack>
                    <FormControl>
                        <FormControl.Label>Project Title</FormControl.Label>
                        <Input variant="underlined" autoCapitalize="none" placeholder="" onChangeText={value => setOrderValue({ ...orderValue, title: value })} />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>Subject</FormControl.Label>
                        <Input variant="underlined" autoCapitalize="none" placeholder="" onChangeText={value => setOrderValue({ ...orderValue, subject: value })} />
                    </FormControl>
                </Stack>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
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
                    <TextArea autoCapitalize="none" h={24} placeholder="Please specify your project requirement (Optional)" w="100%" maxW="300" autoCompleteType={undefined} onChangeText={value => setOrderValue({ ...orderValue, description: value })} />
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
                    <Button onPress={async () => {
                        const result = await fetchOrder(orderValue)
                        console.log('result of creating order', result)
                        result.error ? Alert.alert('Error', result.error) : Alert.alert('Success', result)
                    }}>Confirm</Button>
                    <Button>Cancel</Button>
                </HStack>
            </VStack> :
            <View>
                {Alert.alert(
                'Unauthorized',
                'Please login to submit order!',
                [
                    { text: 'OK', onPress: () => { navigation.navigate('Login') }},
                ]
                )}
            </View>
            // <Button onPress={()=>{}} />
        // <Text>Authentication is Allowed</Text>
    )
}