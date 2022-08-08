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
    } 
    else {
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
                                <Text mt='4'>{order.title}</Text>
                            </FormControl>
                            <FormControl>
                                <FormControl.Label>Subject :</FormControl.Label>
                                <Text mt='2'>{orderSubject}</Text>
                            </FormControl>
                        </Stack>
                        <HStack space={4} mt="4">
                            <HStack>
                                <FormControl.Label>Budget :</FormControl.Label>
                                <FormControl w="20" style={{ marginLeft: 10, marginTop: 4 }}>
                                    <Text>$ {order.budget}</Text>
                                </FormControl>
                            </HStack>
                            <HStack>
                                <FormControl.Label>Grade :</FormControl.Label>
                                <FormControl w="200" style={{ marginLeft: 10, marginTop: 4 }}>
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

                        {/* <Stack mt="4">
                            <FormControl.Label>Deadline :</FormControl.Label>
                        </Stack> */}

                        <HStack mt='4'>
                            <HStack>
                                <FormControl.Label>Deadline :</FormControl.Label>
                            </HStack>
                            <HStack>
                                <Text ml='4' mt='1' >{order.tutor_submission_deadline.toLocaleString()}</Text>
                            </HStack>
                        </HStack>
                        {order.charge ?
                            <Stack>
                                <HStack mt='4'>
                                    <HStack>
                                        <FormControl.Label>Your offer:</FormControl.Label>
                                        <Text mt='1' ml='2'>$ {order.charge}</Text>
                                    </HStack>
                                </HStack>
                                {/* <Text ml='4'>Waiting for student to confirm your offer...</Text> */}
                            </Stack>
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