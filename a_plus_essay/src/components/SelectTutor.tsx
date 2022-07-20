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

export default function SelectTutor() {
    const [tutors, setTutors] = useState('hi')
    const [isSelected, setIsSelected] = useState(false)
    const userInfo = useSelector((state: RootState) => state.auth.user)
    const navigation = useNavigation()
    // const TutorInformationStack = createStackNavigator()
    useCallback(async()=>{
        const res = await fetch(`${env.BACKEND_URL}/select-tutor`)
        const matchedTutors = await res.json()
        console.log(matchedTutors)
        if (matchedTutors.error) {
            console.log(matchedTutors.error)
        }

    },[])
    return (
        !userInfo?.user_id && !userInfo?.is_admin && !userInfo?.is_tutor ?
            <View style={styles.page}>
                <TouchableOpacity onPress={() => {
                    setIsSelected(!isSelected)
                }}>
                    <TutorBox isSelected={isSelected} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    setIsSelected(!isSelected)
                }}>
                    <TutorBox isSelected={isSelected} />
                </TouchableOpacity><TouchableOpacity onPress={() => {
                    setIsSelected(!isSelected)
                }}>
                    <TutorBox isSelected={isSelected} />
                </TouchableOpacity>
                {/* <SelectTutorStack.Navigator>
                    <SelectTutorStack.Screen name="Tutor Box" component={TutorBox} />
                </SelectTutorStack.Navigator> */}

                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 50 }}>

                    <TouchableOpacity style={{ backgroundColor: 'rgb(142,208,175)', padding: 10, borderRadius: 10, width: 80 }}>
                        <Text style={styles.buttonText}>Confirm</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ backgroundColor: 'rgb(214,148,172)', padding: 10, borderRadius: 10, width: 80 }}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View> :
            <View>
                {/* {Alert.alert(
                'Unauthorized',
                'Please login to submit order!',
                // [
                //     { text: 'OK', onPress: () => { navigation.navigate('Welcome') }},
                // ]
                )} */}
            </View>
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