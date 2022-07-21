import { Checkbox, HStack, Stack } from 'native-base'
import * as React from 'react'
import { useState } from 'react'
// import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import { TextInput } from "react-native-gesture-handler"
import Ionicons from 'react-native-vector-icons/Ionicons'

export type Subject = {
    key: string,
    subject: string,
    score: string,
    isChecked: boolean
}
interface SubjectRowProps {
    index: number,
    // key: number,
    subject: Subject,
    // preSubject: string,
    onSubjectChange: (text: string) => void,
    onScoreChange: (text: string) => void,
    onDelete: (index: number) => void
    onCheckBox: (isChecked: boolean, index: number) => void
}


export default function SubjectRow({ index, subject, onSubjectChange, onScoreChange, onDelete, onCheckBox }: SubjectRowProps) {
    // const preSubjectData: RadioButtonProps[] = [{
    //     id: '1',
    //     value: subject.subject,
    //     selected: isChecked
    //     // disabled: true
    // }]
    // const [preSubject, setPreSubject] = useState<RadioButtonProps[]>(preSubjectData)
    return (
        <View key={index} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{marginLeft: 15, marginRight: 10}}>
                <Checkbox value='orange' aria-label='subject' size='sm'
                    style={{}}
                    isChecked={subject.isChecked}
                    onChange={(isChecked: boolean) =>
                        onCheckBox(isChecked, index)
                    }
                />
            </View>
            <TextInput autoCapitalize="none" style={styles.subject} onChangeText={(text) => onSubjectChange(text)} value={subject.subject} />
            <TextInput autoCapitalize="none" style={styles.subjectScore} value={subject.score} onChangeText={text => onScoreChange(text)} />
            <TouchableOpacity style={styles.editRow} onPress={() => { console.log('at delete button:', index); onDelete(index) }}>
                <Ionicons name="close-circle-outline" color='#14b8a6' size={25} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    subject: {
        padding: 10,
        margin: 10,
        // marginLeft: 40,
        borderRadius: 10,
        // width: 150,
        flex: 6,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
    },
    subjectScore: {
        padding: 10,
        margin: 10,
        borderRadius: 10,
        textAlign: 'center',
        // marginRight: 50,
        flex: 1,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
    },
    editRow: {
        // padding: 10,
        // margin: 10,
        // marginLeft: 20,
        // fontSize: 20,
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        // borderWidth: 1,
        // borderColor: 'black', 
        // borderRadius: 30, 
        // width: 17, 
        // height: 30
    },
    // checkBox: {
    //     flex: 10,
    // }
})