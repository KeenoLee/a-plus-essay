import * as React from 'react'
import { useState } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
// import DatePicker from 'react-native-date-picker'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'

function formatDate(date: Date) {
    let newDate = date.toLocaleString('zh-hk', {hour12: false})
    let [formatDate, formatTime] = newDate.split(' ')
    let [day, month, year] = formatDate.split('/')
    day = ('0' + day).substring(day.length - 1, day.length + 1)
    month = ('0' + month).substring(month.length - 1, month.length + 1)
    console.log(day, month)
    let time = formatTime.substring(0, 5)
    let result = day + '/' + month + '/' + year + ' ' + time
    return result
}



export default function OrderSubmission() {
    const [desiredDeadline, setDesiredDeadline] = useState(new Date(Date.UTC(2022,7,14,4,0,0)))
    const [actualDeadline, setActualDeadline] = useState(new Date(Date.UTC(2022,7,14,4,0,0)))
    const [openDesiredDatePicker, setOpenDesiredDatePicker] = useState(false)
    const [openDatePicker, setOpenDatePicker] = useState(false)

    // function NewDatePicker(date: Date, setDate: (date: Date)=>void) {
    //     return (
    //         <DatePicker
    //                 modal
    //                 open={openDatePicker}
    //                 date={date}
    //                 onConfirm={(date) => {
    //                     setOpenDatePicker(false)
    //                     setDate(date)
    //                 }}
    //                 onCancel={() => {
    //                     setOpenDatePicker(false)
    //                 }}/>
    //     )
    // }
    return (
        <>
            <View>
                <View>
                    <Text>Project Title</Text>
                    <TextInput></TextInput>
                </View>
                <View>
                    <Text>Subject</Text>
                    <TextInput></TextInput>
                </View>
                <View>
                    <Text>Budget</Text>
                    <TextInput></TextInput>
                </View>
                <View>
                    <Text>Project Description</Text>
                    <TextInput></TextInput>
                </View>
                <View>
                    <Text>Required Notes</Text>
                    <TouchableOpacity>
                        <Text>Choose File</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text>Desired Deadline</Text>
                    <Text>{formatDate(desiredDeadline)}</Text>
                    <TouchableOpacity onPress={() => {setOpenDatePicker(true)}}>
                        <Text>Choose</Text>
                    </TouchableOpacity>

                </View>
                <View>
                    <Text>Actual Deadline</Text>
                    <TouchableOpacity onPress={() => setOpenDatePicker(true)}>
                        <Text>Choose</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* {datePicker && <DatePicker date={date} onDateChange={setDate} />} */}
            {/* <Button title="Choose Date" onPress={() => setOpenDatePicker(true)} /> */}
            {/* {NewDatePicker(desiredDeadline, setDesiredDeadline)} */}
            {/* {NewDatePicker(actualDeadline, setActualDeadline)} */}
        </>
    )
}