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
            <TouchableOpacity style={styles.editRow} onPress={props.onDelete}><Text>-</Text></TouchableOpacity>
            
        </View>
    )
}

const styles = StyleSheet.create({
    subject: {
        padding: 10,
        margin: 10,
        marginLeft: 40,
        borderRadius: 10,
        // width: 150,
        flex: 7,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 1,  
    },
    subjectGrade: {
        padding: 10,
        margin: 10,
        borderRadius: 10,
        // width: 50,
        flex: 2,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 1,  
    },
    editRow: {
        // padding: 10,
        // margin: 10,
        marginRight: 20,
        fontSize: 20,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // borderWidth: 1,
        // borderColor: 'black', 
        // borderRadius: 30, 
        // width: 17, 
        // height: 30
    },
})