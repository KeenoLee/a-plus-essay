// import { View, Text } from 'react-native'
// import React, { useState } from 'react'
// import DateTimePicker from '@react-native-community/datetimepicker'
// import { Button } from 'native-base';

// export default function DateTimePicker() {
//     const [date, setDate] = useState(new Date(1598051730000));
//     const [mode, setMode] = useState('date');
//     const [show, setShow] = useState(false);

//     const onChange = (event: any, selectedDate: any) => {
//         const currentDate = selectedDate;
//         setShow(false);
//         setDate(currentDate);
//     };

//     const showMode = (currentMode: React.SetStateAction<string>) => {
//         setShow(true);
//         setMode(currentMode);
//     };

//     const showDatepicker = () => {
//         showMode('date');
//     };

//     const showTimepicker = () => {
//         showMode('time');
//     };

//     return (
//         <View>
//             <View>
//                 <Button onPress={showDatepicker}/>
//             </View>
//             <View>
//                 <Button onPress={showTimepicker}/>
//             </View>
//             <Text>selected: {date.toLocaleString()}</Text>
//             {show && (
//                 <DateTimePicker
//                     testID="dateTimePicker"
//                     value={date}
//                     mode={mode}
//                     is24Hour={true}
//                     onChange={onChange}
//                 />
//             )}
//         </View>
//     )
// }

import React, { useState } from 'react'
import { Button } from 'react-native'
import DatePicker from 'react-native-date-picker'

export default function DateTimePicker() {
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    return (
        <>
            <Button title="Open" onPress={() => setOpen(true)} />
            <DatePicker
                modal
                open={open}
                date={date}
                onConfirm={(date: React.SetStateAction<Date>) => {
                    setOpen(false)
                    setDate(date)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />
        </>
    )
}