import { useState, useEffect } from 'react'
import * as React from 'react'
// import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import TutorBox from './TutorBox'
import { View, Text, StyleSheet, Alert } from 'react-native'
import TutorInformation from './TutorInformation'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Stack } from 'native-base'
import { env } from '../env/env'
// import { NavigationContainer } from '@react-navigation/native'
// import { createStackNavigator } from '@react-navigation/stack'
interface StudentReview {
    studentName: string,
    revire: string
}
interface MatchedTutor {
    // From db table: tutor
    nickname: string,
    completedOrder: number,
    rating: number,
    tutorIntro: string,
    school: string,

    // From db table: candidate
    price: number,

    // From db table: comment
    comment: StudentReview[],

    // From db table: transcript
    transcript: string, // File

    // From db table: sample
    sample: string, // File

}
const TutorDetailStack = createStackNavigator()
export function TutorDetailStacks() {
    return (
        <TutorDetailStack.Navigator>
            <TutorDetailStack.Screen name="Tutor Detail" component={TutorInformation} />
        </TutorDetailStack.Navigator>
    )
}
const SelectTutorStack = createStackNavigator()
async function confirmSelectTutor(tutorId: number, orderId: number) {
    const res = await fetch(`${env.BACKEND_ORIGIN}/confirm-tutor`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tutorId, orderId })
    })
    const result = await res.json()
    return result
}
type Candidate = {
    id: number,
    tutor_id: number,
    charge: number
}
export default function SelectTutor({ route }: any) {
    const { order } = route.params
    // console.log('route in select tutor: ', order)
    const [tutors, setTutors] = useState('hi')
    const [isSelected, setIsSelected] = useState(false)
    const [candidates, setCandidates] = useState<Array<Candidate | null>>([null])
    const [selectedTutor, setSelectedTutor] = useState<number | null>(null)
    const state = useSelector((state: RootState) => state.auth)
    const navigation = useNavigation()
    // Get candidates of same order
    useEffect(() => {
        async function getCandidates(orderId: number) {
            const res = await fetch(`${env.BACKEND_ORIGIN}/get-candidates/${orderId}`)
            const result = await res.json()
            console.log('result in slect tutor: ', result)
            const newCandidates = result
            setCandidates(() => newCandidates)
            console.log('!!!!!!!!!!CANDIdates??? safd', candidates)
        }
        getCandidates(order.id)

    }, [])

    return (
        state.user && !state.tutor ?
            <View style={styles.page}>

                {candidates.map((candidate, i) => (
                    // console.log('@@@@@cCNASDOIATE', candidate?.tutor_id)
                    candidate?.tutor_id ?
                        <TouchableOpacity key={i} onPress={() => {
                            setIsSelected(!isSelected)
                            setSelectedTutor(() => candidate.tutor_id)
                        }}>
                            <TutorBox isSelected={isSelected} selectedTutor={selectedTutor} tutorId={candidate?.tutor_id} order={order} />
                        </TouchableOpacity> : null
                ))
                }

                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 50 }}>
                    <TouchableOpacity
                        style={{ backgroundColor: 'rgb(142,208,175)', padding: 10, borderRadius: 10, width: 80 }}
                        onPress={async () => {
                            if (!selectedTutor) {
                                Alert.alert('Please select a tutor!')
                                return
                            }
                            const result = await confirmSelectTutor(selectedTutor, order.id)
                            console.log('can choose tutor??: ', result)
                            if (result.success) {
                                Alert.alert('Successfully chose tutor!')
                            } else {
                                Alert.alert('Pleasr try again!')
                            }
                        }}
                    >
                        <Text style={styles.buttonText}>Confirm</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ backgroundColor: 'rgb(214,148,172)', padding: 10, borderRadius: 10, width: 80 }}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View> :
            null
    )
}

const styles = StyleSheet.create({
    buttonText: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    page: {
        display: 'flex',
    }
})