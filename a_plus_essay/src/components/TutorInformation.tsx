import { BottomSheetAndroid } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets';
import * as React from 'react'
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function TutorInformation() {

    return (
        <View style={{}}>


            <View style={styles.container}>
                <Text style={{ ...inlinePadding(5, 5, 15, 15), fontWeight: 'bold', fontSize: 20, }}>Beeno</Text>

                <View style={{ ...inlinePadding(5, 5, 15, 15), flexDirection: 'row' }}>
                    <Text style={{ flex: 4 }}>Order Completed: </Text>
                    <Text style={{ flex: 6 }}>50</Text>
                </View>

                <View style={{ ...inlinePadding(5, 5, 15, 15), flexDirection: 'row' }}>
                    <Text style={{ flex: 4 }}>Rating: </Text>
                    <Text style={{ flex: 6 }}>5 Stars</Text>
                </View>

                <Text style={{ ...inlinePadding(5, 5, 15, 15), }}>Recent Reviews: </Text>

                <View style={styles.review}>
                    <Text style={styles.reviewer}>Ken</Text>
                    <Text>I want hot-pot.</Text>
                </View>
                <View style={styles.review}>
                    <Text style={styles.reviewer}>Ken</Text>
                    <Text>I want hot-pot.</Text>
                </View>
                <View style={styles.review}>
                    <Text style={styles.reviewer}>Ken</Text>
                    <Text>I want hot-pot.</Text>
                </View>
                <Text style={{ ...inlinePadding(5, 5, 15, 15), }}>Tutor Introduction: </Text>
                <Text style={styles.introduction}>I am the best!</Text>

                <View style={{ ...inlinePadding(10, 5, 15, 15), flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{}}>Transcript</Text>
                    <Text>transcript.pdf</Text>
                </View>

                <View style={{ ...inlinePadding(8, 20, 15, 15), flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{}}>Assignment Sample</Text>
                    <Text>assignment.pdf</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 50 }}>

                <TouchableOpacity style={{ backgroundColor: 'rgb(142,208,175)', padding: 10, borderRadius: 10, width: 80 }}>
                    <Text style={{fontWeight: 'bold', textAlign: 'center'}}>Confirm</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ backgroundColor: 'rgb(214,148,172)', padding: 10, borderRadius: 10, width: 80 }}>
                    <Text style={{fontWeight: 'bold', textAlign: 'center'}}>Canel</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(234,241,240)',
        // paddingTop: 10,
        // paddingBottom: 10,
        // paddingLeft: 20,
        // paddingRight: 20,
        margin: 30,
    },
    review: {
        backgroundColor: 'white',
        marginLeft: 30,
        marginRight: 60,
        marginTop: 5,
        marginBottom: 5,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 8,
    },
    reviewer: {
        fontWeight: 'bold'
    },
    introduction: {
        backgroundColor: 'white',
        borderRadius: 5,
        marginLeft: 30,
        marginRight: 30,
        padding: 10,
        height: 100
    }
})

function inlinePadding(top: number, bottom: number, left: number, right: number) {
    return {
        paddingTop: top,
        paddingBottom: bottom,
        paddingLeft: left,
        paddingRight: right
    }
}