import { Button, HStack } from 'native-base'
import React, { useState } from 'react'
import { Text } from 'react-native'
import DatePicker from 'react-native-date-picker'
import Ionicons from 'react-native-vector-icons/Ionicons';
//TODO: use { format } from  'date-fns'
export function formatDate(date: Date) {
    let newDate = date.toLocaleString('zh-hk', { hour12: false })
    // console.log('newDate', newDate)
    let [formatDate, formatTime] = newDate.split(' ')
    // console.log('FormatDate & Time', formatDate, formatTime)
    let [day, month, year] = formatDate.split('/')
    // console.log('OD/OM/OY', day, month, year)
    day = ('0' + day).substring(day.length - 1, day.length + 1)
    month = ('0' + month).substring(month.length - 1, month.length + 1)
    // console.log('D/M/Y', day, month, year)
    let time = formatTime.substring(0, 5)
    // console.log('time',time)
    let result = day + '/' + month + '/' + year + ' ' + time
    return result
}

export default function DateTimePicker() {
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    return (
        <>
            <HStack w="100%">
                <Button size="sm" onPress={() => setOpen(true)} >Select Date</Button>
                <DatePicker
                    modal
                    open={open}
                    date={date}
                    onConfirm={(date: Date) => {
                        setOpen(false)
                        setDate(date)
                    }}
                    onCancel={() => {
                        setOpen(false)
                    }}
                />
                <Text>{formatDate(date)}</Text>
            </HStack>
        </>
    )
}