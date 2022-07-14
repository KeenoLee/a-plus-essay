import * as React from 'react'
import { View, Text,StyleSheet } from 'react-native'


export default function TutorBox() {

    return (
        
            <View style={styles.tutorBox}>
                <View style={{flex: 7.5}}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20}}>Beeno</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{flex: 7}}>Order Completed: </Text>
                        <Text style={{flex: 3}}>50</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                        <Text style={{flex:7}}>Rating: </Text>
                        <Text style={{flex:3}}>5 Stars</Text>
                    </View>
                    <Text>Tutor Introduction: </Text>
                    <Text style={{backgroundColor: 'white', marginLeft: 10, padding: 5}}>I am the best!</Text>
                </View>
                <View style={{ alignItems: 'center', flex: 2.5 }}>
                    <Text style={{backgroundColor: 'rgb(192,210,207)', padding: 5, fontWeight: 'bold'}}>$ Price</Text>
                </View>
            </View>
    )
}

const styles = StyleSheet.create({
    tutorBox: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        width: 'auto', 
        height: 'auto', 
        alignItems: 'center', 
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20, 
        margin: 30, 
        marginBottom: 10,
        backgroundColor: 'rgb(234,241,240)', 
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
    }
})