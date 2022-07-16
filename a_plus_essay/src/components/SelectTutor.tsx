import { useState } from 'react'
import * as React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import TutorBox from './TutorBox'
import { View, Text, StyleSheet } from 'react-native'
import TutorInformation from './TutorInformation'
// import { NavigationContainer } from '@react-navigation/native'
// import { createStackNavigator } from '@react-navigation/stack'

export default function SelectTutor() {
    // const TutorInformationStack = createStackNavigator()

    return (
        <View style={styles.page}>
            {/* <NavigationContainer>
                <TutorInformationStack.Navigator initialRouteName="Tutor Information">
                    <TutorInformationStack.Screen name="Tutor Information" component={TutorInformation} />
                </TutorInformationStack.Navigator>
            </NavigationContainer> */}
            <TouchableOpacity onPress={() => {
                // styles.page.display
                TutorInformation
            }
            }>
                <TutorBox />
            </TouchableOpacity>
            <TutorBox />
            <TutorBox />

            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 50 }}>

                <TouchableOpacity style={{ backgroundColor: 'rgb(142,208,175)', padding: 10, borderRadius: 10, width: 80 }}>
                    <Text style={styles.buttonText}>Confirm</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ backgroundColor: 'rgb(214,148,172)', padding: 10, borderRadius: 10, width: 80 }}>
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
            </View>
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