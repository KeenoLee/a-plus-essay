import * as React from 'react'
import { useState, useEffect } from 'react'
import { Box, FormControl, Text, Input, Stack, VStack, TextArea, HStack, Button, Icon, CloseIcon, IconButton, View, ScrollView } from "native-base";
import { launchImageLibrary } from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { format } from 'date-fns'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Alert, SafeAreaView, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useNavigation } from '@react-navigation/native';
import { env } from '../env/env';
import { orderedExtractInObject } from 'native-base/lib/typescript/theme/tools';
import Guideline from '../components/Guideline';

function shorterFilename(filename: string) {
    if (filename.length > 16) {
        return filename.substring(0, 17) + '...'
    }
    return filename
}
type Order = {
    id: number,
    student_id: number,
    tutor_id: number,
    title: string,
    grade: string,
    description: string,
    budget: number,
    tutor_submission_deadline: Date,
    student_submission_deadline: Date
}
type ImageFile = {
    filename: string
}
export default function ViewMatchedOrder({ order }: Order) {
    const [orderSubject, setOrderSubject] = useState<string | null>(null)
    const [guidelines, setGuidelines] = useState<Array<ImageFile | null>>([null])
    const [notes, setNotes] = useState<Array<ImageFile | null>>([null])
    const [showImage, setShowImage] = useState(false)
    useEffect(() => {
        async function getOrderSubjectAndImages(orderId: number) {
            const res = await fetch(`${env.BACKEND_URL}/get-order-subject/${orderId}`)
            const result = await res.json()
            if (!result.error) {
                setOrderSubject(() => result.subject_name)
                setGuidelines(() => result.guidelines)
                setNotes(() => result.notes)
            }
        }

        getOrderSubjectAndImages(order.id)
    })
    return (
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
                        <FormControl.Label>Project Description :</FormControl.Label>---------------------------
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
                            <Guideline key={i} filename={note?.filename} />
                        ))}
                    </Stack>

                    <Stack mt="4">
                        <FormControl.Label>Deadline :</FormControl.Label>
                    </Stack>

                    <HStack space={4} alignItems='center'>
                        <Text>{order.tutor_submission_deadline}</Text>
                    </HStack>




                </VStack>
            </ScrollView>
        </SafeAreaView >

    )
}