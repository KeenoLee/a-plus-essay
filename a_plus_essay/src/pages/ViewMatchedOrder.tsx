import * as React from 'react'
import { useState, useEffect } from 'react'
import { Box, FormControl, Text, Input, Stack, VStack, TextArea, HStack, Button, Icon, CloseIcon, IconButton, View, ScrollView } from "native-base";
import { launchImageLibrary } from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { format } from 'date-fns'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Alert, SafeAreaView, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useNavigation } from '@react-navigation/native';
import { env } from '../env/env';
import { orderedExtractInObject } from 'native-base/lib/typescript/theme/tools';
import Guideline from '../components/Guideline';
import Notes from '../components/Notes';

function shorterFilename(filename: string) {
    if (filename.length > 16) {
        return filename.substring(0, 17) + '...'
    }
    return filename
}
type Order = {
    id: number
    title: string
    tutor_submission_deadline: Date
    student_id?: number
    tutor_id?: number | null
    grade?: string
    description?: string
    budget?: number
}
type ImageFile = {
    filename: string
}
interface OfferInfo {
    tutorId: number,
    orderId: number,
    studentId: number,
    charge: number
}
async function makeOffer(offerInfo: OfferInfo, token: string) {
    const res = await fetch(`${env.BACKEND_URL}/make-offer`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(offerInfo)
    })
    const result = await res.json()
    console.log('resULT of MAke Offer? ', result)
    if (!result.error) {
        Alert.alert('Success to offer! Please wait for the student to confirm.')
    } else {
        Alert.alert('Failed to make offer! Please try again.')
    }
    return result
}

export default function ViewMatchedOrder({ route, navigation }: any) {
    // console.log(route)
    const { order } = route.params
    console.log('just entered VIew MAtched Order PAGe: ', order)
    console.log('order.student_id: ', order.student_id)
    const state = useSelector((state: RootState) => state.auth)
    const [orderSubject, setOrderSubject] = useState<string | null>(null)
    const [guidelines, setGuidelines] = useState<Array<ImageFile | null>>([null])
    const [notes, setNotes] = useState<Array<ImageFile | null>>([null])
    const [offer, setOffer] = useState<string>('')
    useEffect(() => {
        async function getOrderSubjectAndImages(orderId: number) {
            console.log('ORDERID!!@$#@%$', orderId)
            const res = await fetch(`${env.BACKEND_URL}/get-order-subject/${orderId}`)
            const result = await res.json()
            console.log('result?? ', result)
            if (!result.error) {
                console.log('I want ORDER result! ', result)
                setOrderSubject(() => result.subject_name)
                console.log('no subject????', result.subject_name)
                setGuidelines(() => result.guidelines)
                setNotes(() => result.notes)
            }
        }
        getOrderSubjectAndImages(order.id)
    }, [])
    return (
        state.token && state.user && state.tutor ?
            <SafeAreaView>
                <ScrollView>
                    <VStack mt="4" alignSelf="center" px="4" w={{ base: "100%" }}>
                        <Stack space={4}>
                            <FormControl>
                                <FormControl.Label>Project Title :</FormControl.Label>
                                <Text>{order.title}</Text>
                            </FormControl>
                            <FormControl>
                                <FormControl.Label>Subject :</FormControl.Label>
                                <Text>{orderSubject}</Text>
                            </FormControl>
                        </Stack>
                        <HStack space={4} mt="4" alignSelf="center">
                            <HStack>
                                <FormControl.Label>Budget :</FormControl.Label>
                                <FormControl w="20" style={{ marginLeft: 10 }}>
                                    <Text>{order.budget}</Text>
                                </FormControl>
                            </HStack>
                            <HStack>
                                <FormControl.Label>Grade :</FormControl.Label>
                                <FormControl w="20" style={{ marginLeft: 10 }}>
                                    <Text>{order.grade}</Text>
                                </FormControl>
                            </HStack>
                        </HStack>
                        <Stack mt="4" mb="4">
                            <FormControl.Label>Project Description :</FormControl.Label>
                        </Stack>
                        <Stack alignItems="center">
                            <Text>{order.description}</Text>
                        </Stack>

                        <HStack justifyContent='space-between' alignItems='center' mt="4">
                            <HStack>
                                <FormControl.Label alignItems='center'>Guideline :</FormControl.Label>
                            </HStack>
                        </HStack>

                        <Stack>
                            {guidelines.map((guideline, i) => (
                                <Guideline key={i} filename={guideline?.filename} />
                            ))}
                        </Stack>

                        <HStack justifyContent='space-between' alignItems='center' mt="4">
                            <HStack>
                                <FormControl.Label alignItems='center'>Lecture Notes :</FormControl.Label>
                            </HStack>
                        </HStack>
                        <Stack>
                            {notes.map((note, i) => (
                                <Notes key={i} filename={note?.filename} />
                            ))}
                        </Stack>

                        <Stack mt="4">
                            <FormControl.Label>Deadline :</FormControl.Label>
                        </Stack>

                        <HStack space={4} alignItems='center'>
                            <Text>{order.tutor_submission_deadline.toLocaleString()}</Text>
                        </HStack>
                        {order.charge ?
                            <HStack style={{ flexDirection: 'column' }}>
                                <FormControl.Label>Your offer: {order.charge}</FormControl.Label>
                                <Text>Waiting for student to confirm your offer...</Text>
                            </HStack>
                            :
                            <HStack>
                                <FormControl.Label>Make an Offer :</FormControl.Label>
                                <TextInput placeholder='Offer' onChangeText={value => setOffer(() => value)} />
                                <TouchableOpacity onPress={async () => {
                                    const result = await makeOffer({
                                        tutorId: state.user!.id,
                                        studentId: order.student_id,
                                        orderId: order.id,
                                        charge: +offer
                                    }, state.token!)
                                    console.log('pressed confirm ', result)
                                }}>
                                    <Text>Confirm</Text>
                                </TouchableOpacity>
                            </HStack>
                        }






                    </VStack>
                </ScrollView>
            </SafeAreaView > : null

    )
}