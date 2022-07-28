import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useAppNavigation } from '../routes'

type OnPress = {
    onPress: () => void
}
export default function OrderMatched({ onPress }: OnPress) {
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
                padding: 20
            }}>Order Matching!</Text>
            <Text style={styles.message}>We are processing your request.</Text>
            <Text style={styles.message}>A confirmation message</Text>
            <Text style={styles.message}>will be sent toyou shortly.</Text>
            <TouchableOpacity style={{
                margin: 30,
                padding: 10,
                backgroundColor: 'rgb(142,208,175)',
                width: 250,
                borderRadius: 15
            }}
                onPress={() => {
                    // onPress()
                    navigation.navigate('Tabs')
                }}
            >
                <Text style={{
                    textAlign: 'center',
                    color: 'white'

                }}>Back to Home</Text>
            </TouchableOpacity>
        </View>
    )
}
// montserrat

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