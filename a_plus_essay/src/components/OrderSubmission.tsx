import * as React from 'react'
import { useState } from 'react'
import { Box, FormControl, Text, Input, Stack, VStack, TextArea, HStack, Button, Icon, CloseIcon, IconButton, View, ScrollView } from "native-base";
import DateTimePicker from './DateTimePicker';
import { launchImageLibrary } from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FilePicker from './FilePicker';
import { format } from 'date-fns'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Alert, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useNavigation } from '@react-navigation/native';
import { env } from '../env/env';
interface UserFile {
    uri: string
    type: string
    name: string
    // file: File
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
interface OrderFiles {
    guidelines: UserFile[]
    notes: UserFile[]
}
function shorterFilename(filename: string) {
    if (filename.length > 16) {
        return filename.substring(0, 17) + '...'
    }
    return filename
}
async function fetchOrder(order: OrderValue, token: string) {
    const res = await fetch(`${env.BACKEND_URL}/order-submission`, {
        method: 'POST',
        headers: {
            // TODO: seperate upload file/image 
            // "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(order)
    })
    const result = await res.json()
    if (result.error) {
        return result
    }
    return 'success'
}
async function fetchFile(orderFiles: OrderFiles) {
    // console.log('WHATs type??: ', typeof orderFiles.guidelines[0].file)
    console.log('GUIDELINE: ', orderFiles.guidelines)
    console.log('NOTES: ', orderFiles.notes)
    const formData = new FormData()
    console.log('FORMDATA: ', formData)
    for (let g = 0; g < orderFiles.guidelines.length; g++) { 
        console.log(orderFiles.guidelines[g])
        formData.append(`guideline_${g}`, orderFiles.guidelines[g] as any)
    }
    for (let n = 0; n < orderFiles.notes.length; n++) {
        formData.append(`note_${n}`, orderFiles.notes[n] as any)
    }
    console.log('FORMDATA: ', formData)

    const res = await fetch(`${env.BACKEND_URL}/order-file`, {
        method: 'POST',
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body: formData
    })
    const result = await res.json()
    return result
}
export default function OrderSubmission() {
    const navigation = useNavigation()
    const state = useSelector((state: RootState) => state.auth)
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
            // includeBase64: true
        }, (res) => {
            if (res.didCancel) {
                console.log('user cancelled image picker')
            } else if (res.errorMessage) {
                console.log('Error: ', res.errorMessage)
            } else {
                let name = res.assets?.[0].fileName
                let uri = res.assets?.[0].uri
                let type = res.assets?.[0].type
                console.log('uri', res.assets?.[0].uri)
                // console.log(base64Data)
                if (name && uri && type) {
                    // let blob = dataURItoBlob(uri)
                    // console.log('blob: ', typeof blob.type, typeof blob)
                    // let file = new File([blob], 'photo', { type: blob.type, lastModified: Date.now() })  // Binary
                    // console.log('file: ', file.type)
                    callback({ name, uri, type })
                    return
                }
                console.log('file is not found')
                return
            }
        })
    }
    return (
        state.user && !state.tutor && state.token ?
            <SafeAreaView>
                <ScrollView>
                    <VStack mt="4" alignSelf="center" px="4" w={{ base: "100%" }}>
                        <Stack space={4}>
                            <FormControl>
                                <FormControl.Label>Project Title :</FormControl.Label>
                                <Input variant="underlined" autoCapitalize="none" placeholder="" onChangeText={value => setOrderValue({ ...orderValue, title: value })} />
                            </FormControl>
                            <FormControl>
                                <FormControl.Label>Subject :</FormControl.Label>
                                <Input variant="underlined" autoCapitalize="none" placeholder="" onChangeText={value => setOrderValue({ ...orderValue, subject: value })} />
                            </FormControl>
                        </Stack>
                        <HStack space={4} mt="4" alignSelf="center">
                            <HStack>
                                <FormControl.Label>Budget :</FormControl.Label>
                                <FormControl w="20" style={{ marginLeft: 10 }}>
                                    <Input variant="outline" placeholder="$" onChangeText={value => setOrderValue({ ...orderValue, budget: parseInt(value) })} />
                                </FormControl>
                            </HStack>
                            <HStack>
                                <FormControl.Label>Grade :</FormControl.Label>
                                <FormControl w="20" style={{ marginLeft: 10 }}>
                                    <Input variant="outline" placeholder="" onChangeText={value => setOrderValue({ ...orderValue, grade: value })} />
                                </FormControl>
                            </HStack>
                        </HStack>
                        <Stack mt="4" mb="4">
                            <FormControl.Label>Project Description :</FormControl.Label>
                        </Stack>
                        <Stack alignItems="center">
                            <TextArea autoCapitalize="none" h={24} placeholder="Please specify your project requirement (Optional)" w="100%" maxW="300" autoCompleteType={undefined} onChangeText={(value: string) => setOrderValue({ ...orderValue, description: value })} />
                        </Stack>

                        <HStack justifyContent='space-between' alignItems='center' mt="4">
                            <HStack>
                                <FormControl.Label alignItems='center'>Guideline :</FormControl.Label>
                                {/* <FilePicker /> */}
                            </HStack>
                            <HStack>
                                <Button _pressed={{
                                    bgColor: "teal.600"
                                }}
                                    size='sm' bgColor="teal.500"
                                    onPress={() => addGuideline()}
                                    leftIcon={<Ionicons name="cloud-upload-outline" color="white" />}>
                                    Upload
                                </Button>
                            </HStack>
                        </HStack>

                        <Stack>
                            <View>
                                {orderValue.guidelines.map((guideline, index) => (
                                    <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: 180 }}>
                                        <Text style={{ textAlign: 'center' }}>
                                            {shorterFilename(guideline.name)}
                                        </Text>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setOrderValue(value => value = {
                                                    ...value,
                                                    guidelines: value.guidelines.filter((_, i) => i !== index)
                                                })
                                            }}
                                        >
                                            <Ionicons name="close" color='grey' size={18} />
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </View>
                        </Stack>

                        <HStack justifyContent='space-between' alignItems='center' mt="4">
                            <HStack>
                                <FormControl.Label alignItems='center'>Lecture Notes :</FormControl.Label>
                            </HStack>
                            <HStack>
                                <Button _pressed={{
                                    bgColor: "teal.600"
                                }}
                                    size='sm' bgColor="teal.500"
                                    onPress={() => addNote()}
                                    leftIcon={<Ionicons name="cloud-upload-outline" color="white" />}>
                                    Upload
                                </Button>
                            </HStack>
                        </HStack>
                        <Stack>
                            {orderValue.notes.map((note, index) => (
                                <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: 180 }}>
                                    <Text style={{ textAlign: 'center' }}>
                                        {shorterFilename(note.name)}
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setOrderValue(value => value = {
                                                ...value,
                                                notes: value.notes.filter((_, i) => i !== index)
                                            })
                                        }}
                                    >
                                        <Ionicons name="close" color='grey' size={18} />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </Stack>

                        <Stack mt="4">
                            <Stack>
                                <FormControl.Label>Desired Deadline :</FormControl.Label>
                            </Stack>
                        </Stack>

                        <HStack space={4} alignItems='center'>
                            <HStack w="150" style={{ marginLeft: 50 }}>
                                {orderValue.tutorDeadline ?
                                    <Text>{format(orderValue.tutorDeadline, 'yyyy-MM-dd HH:mm')}</Text> :
                                    <Text>{format(Date.now(), 'yyyy-MM-dd HH:mm')}</Text>
                                }
                            </HStack>
                            <HStack>
                                <DateTimePicker
                                    onChange={(value: Date) => setOrderValue({ ...orderValue, tutorDeadline: value })}
                                />
                            </HStack>
                        </HStack>

                        <Stack>
                            <FormControl.Label style={{ flex: 4 }}>Actual Deadline :</FormControl.Label>
                        </Stack>

                        <HStack space={4} alignItems='center'>
                            <HStack w="150" style={{ marginLeft: 50 }}>
                                {orderValue.studentDeadline ?
                                    <Text>{format(orderValue.studentDeadline, 'yyyy-MM-dd HH:mm')}</Text> :
                                    <Text>{format(Date.now(), 'yyyy-MM-dd HH:mm')}</Text>
                                }
                            </HStack>
                            <HStack>
                                <DateTimePicker
                                    onChange={(value: Date) => setOrderValue({ ...orderValue, studentDeadline: value })}
                                />
                            </HStack>
                        </HStack>

                        <HStack justifyContent="space-evenly" mt='10' mb="20">
                            <Button p='3' _pressed={{
                                bgColor: "success.600"
                            }}
                                size='md' bgColor="success.500"
                                onPress={async () => {
                                    const result = await fetchOrder(orderValue, state.token!)
                                    const fileResult = await fetchFile({ guidelines: orderValue.guidelines, notes: orderValue.notes })
                                    console.log('fileResult: ', fileResult)
                                    // console.log('result of creating order', result)
                                    if (result.error || fileResult.error) {
                                        Alert.alert('Error', result.error || fileResult.error)
                                    } else {
                                        Alert.alert('Success', result)
                                    }
                                    
                                }}>Confirm</Button>
                            <Button _pressed={{
                                bgColor: "secondary.500"
                            }}
                                size='md' bgColor="secondary.400">Cancel</Button>
                        </HStack>
                    </VStack>
                </ScrollView>
            </SafeAreaView >
            :
            <View>
                {Alert.alert(
                    'Unauthorized',
                    'Please login to view profile!',
                    [
                        { text: 'Login', onPress: () => { navigation.navigate('Login') } },
                        { text: 'Close', onPress: () => { null } }
                    ]
                )}
            </View>
    )
}