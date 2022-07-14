import * as React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import TutorBox from './TutorBox'
import { View, Text,StyleSheet } from 'react-native'

export default function SelectTutor() {

    return (
        <View>
        <TutorBox />
        <TutorBox />
        <TutorBox />

        <View style={{flexDirection: 'row', justifyContent:'space-evenly', marginTop: 50}}>

        <TouchableOpacity style={{backgroundColor: 'rgb(142,208,175)', padding: 10, borderRadius: 10, width: 80}}>
            <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{backgroundColor: 'rgb(214,148,172)', padding: 10, borderRadius: 10, width: 80}}>
            <Text style={styles.buttonText}>Canel</Text>
        </TouchableOpacity>
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonText: {
        fontWeight: 'bold',
        textAlign: 'center',
    }
})