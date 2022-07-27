import { useState, useCallback } from 'react'
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

export default function SelectTutor({ route }: any) {
    const { order } = route.params
    console.log('route in select tutor: ', order)
    const [tutors, setTutors] = useState('hi')
    const [isSelected, setIsSelected] = useState(false)
    const state = useSelector((state: RootState) => state.auth)
    const navigation = useNavigation()
    // const TutorInformationStack = createStackNavigator()
    useCallback(async () => {
        const res = await fetch(`${env.BACKEND_URL}/select-tutor`)
        const matchedTutors = await res.json()
        console.log(matchedTutors)
        if (matchedTutors.error) {
            console.log(matchedTutors.error)
        }

    }, [])
    return (
        state.user && !state.tutor ?
            <View style={styles.page}>
                <TouchableOpacity onPress={() => {
                    setIsSelected(!isSelected)
                }}>
                    <TutorBox isSelected={isSelected} order={order} tutorId={order.tutor_id} />
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 50 }}>

                    <TouchableOpacity style={{ backgroundColor: 'rgb(142,208,175)', padding: 10, borderRadius: 10, width: 80 }}>
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