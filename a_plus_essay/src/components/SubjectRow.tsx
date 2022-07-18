import { Checkbox } from 'native-base'
import * as React from 'react'
import { useState } from 'react'
// import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import { TextInput } from "react-native-gesture-handler"

export type Subject = {
    key: string,
    subject: string,
    grade: string,
    isChecked: boolean
}
interface SubjectRowProps {
    index: number,
    // key: number,
    subject: Subject,
    // preSubject: string,
    onSubjectChange: (text: string) => void,
    onGradeChange: (text: string) => void,
    onDelete: (index: number) => void
    onCheckBox: (isChecked: boolean, index:number) => void
}


export default function SubjectRow({ index, subject, onSubjectChange, onGradeChange, onDelete, onCheckBox }: SubjectRowProps) {
    // const preSubjectData: RadioButtonProps[] = [{
    //     id: '1',
    //     value: subject.subject,
    //     selected: isChecked
    //     // disabled: true
    // }]
    // const [preSubject, setPreSubject] = useState<RadioButtonProps[]>(preSubjectData)
    return (
        <View key={index} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity style={styles.editRow} onPress={() => { console.log('at delete button:', index); onDelete(index) }}><Text>-</Text></TouchableOpacity>

            <TextInput autoCapitalize="none" style={styles.subject} onChangeText={(text) => onSubjectChange(text)} value={subject.subject} />
            <TextInput autoCapitalize="none" style={styles.subjectGrade} value={subject.grade} onChangeText={text => onGradeChange(text)} />
            <Checkbox value='' aria-label='subject' size='sm' 
                style={{ marginRight: 30 }} 
                isChecked={subject.isChecked} 
                onChange={(isChecked: boolean) => 
                    onCheckBox(isChecked, index)
                } 
            />
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
    subjectGrade: {
        padding: 10,
        margin: 10,
        borderRadius: 10,
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
        marginLeft: 20,
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
    checkBox: {
        flex: 2,
    }
})