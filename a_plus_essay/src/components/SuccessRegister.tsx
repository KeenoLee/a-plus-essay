import { useNavigation } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {AppParamList, useAppNavigation} from '../../routes'

type Props = NativeStackScreenProps<AppParamList>
type OnPress = {
    onPress: () => void
}
export default function SuccessRegister({ onPress }: OnPress) {
    const navigation = useAppNavigation()
    return (
        <View style={{
            height: '70%',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Text style={{
                fontWeight: 'bold',
                fontSize: 30,
                padding: 20,
                textAlign: 'center',
                marginBottom: 15
            }}>Thank you for your registration!</Text>
            <Text style={styles.message}>We are processing your request.</Text>
            <Text style={styles.message}>A confirmation message</Text>
            <Text style={styles.message}>will be sent toyou shortly.</Text>
            <TouchableOpacity style={{
                margin: 30,
                marginTop: 50,
                padding: 10,
                backgroundColor: 'rgb(27,70,245)',
                width: 250,
                borderRadius: 15,
            }} onPress={() => {
                onPress()
                navigation.navigate('A Plus Essay')
            }}>
                <Text style={{
                    textAlign: 'center',
                    color: 'white',
                }}>Let's started</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    message: {
        paddingLeft: 60,
        paddingRight: 60,
        textAlign: 'center',
        fontStyle: 'italic',
        color: 'rgb(132,164,193)',
        fontWeight: 'bold'
    }
})


