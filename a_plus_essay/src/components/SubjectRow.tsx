import * as React from 'react'
import { useEffect } from 'react'
import { TouchableOpacity, View, Text, StyleSheet, Button } from 'react-native'
import { TextInput } from "react-native-gesture-handler"


export default function SubjectRow(props: any) {
    useEffect(()=>{
        console.log('props id: ', props.key)
        console.log('props subject: ', props.subjects)
        
    })
    return (
        <View key={props.key} style={{ flexDirection: 'row' }}>
            <TextInput style={styles.subject} onChangeText={() => {
                props.onSubjectChange
            }} />
            <TextInput style={styles.subjectGrade} onChangeText={()=>props.onGradeChange} />
            <Button title='-' onPress={props.onDelete} />
        </View>
    )
}

const styles = StyleSheet.create({
    subject: {
        padding: 10,
        margin: 10,
        marginLeft: 50,
        borderRadius: 10,
        // width: 150,
        flex: 0.7,
        backgroundColor: 'white',
    },
    subjectGrade: {
        padding: 10,
        margin: 10,
        borderRadius: 10,
        // width: 50,
        flex: 0.2,
        backgroundColor: 'white',
    },
    editRow: {
        padding: 10,
        margin: 10,
        marginRight: 50,
        fontSize: 20,
        flex: 0.1
    },
})