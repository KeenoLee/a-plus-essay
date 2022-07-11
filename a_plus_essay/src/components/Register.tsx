import { useEffect, useState } from "react";
import { View, TextInput, StyleSheet, Button } from "react-native";
import * as React from 'react'
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import { create, MMKVLoader } from "react-native-mmkv-storage";

const MMKV = new MMKVLoader().initialize();
export const useStorage = create(MMKV);
const roleData: RadioButtonProps[] = [{
    id: '1',
    label: 'Student',
    value: 'student',
    selected: true
}, {
    id: '2',
    label: 'Tutor',
    value: 'tutor'
}]
const contactData: RadioButtonProps[] = [{
    id: '1',
    label: 'Whatsapp',
    value: 'whatsapp',
    selected: true
}, {
    id: '2',
    label: 'Signal',
    value: 'signal'
}]

export default function Register() {
    const [role, setRole] = useState<RadioButtonProps[]>(roleData)
    const [contact, setContact] = useState<RadioButtonProps[]>(contactData)
    const [nickname, setNickname] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [firmPassword, setFirmPassword] = useState(null)
    const [isTutor, setIsTutor] = useState(false)
    const [isSignal, setIsSignal] = useState(false)


    function onPressRole(roleData: RadioButtonProps[]) {
        setRole(roleData);
    }

    function onPressContact(contactData: RadioButtonProps[]) {
        setContact(contactData)
    }
    useEffect(() => {
        console.log('isTutor ', isTutor)
        console.log('isSignal ', isSignal)

    }, [isTutor, isSignal])
    return (
        <View style={styles.form}>
                <RadioGroup
                    containerStyle={{flexDirection: 'row'}}
                    radioButtons={role}
                    onPress={()=>{
                        onPressRole
                        setIsTutor(!isTutor)
                    }}
                />
            <TextInput style={styles.input} placeholder="Nickname" onChangeText={()=>setNickname(nickname)} />
            <TextInput style={styles.input} placeholder="Email address" onChangeText={()=>setEmail(email)}/>
            <TextInput style={styles.input} placeholder="Password" onChangeText={()=>setPassword(password)}/>
            <TextInput style={styles.input} placeholder="Confirm Password" onChangeText={()=>setFirmPassword(firmPassword)}/>
            {!isTutor && <Button title='Create Account' onPress={() => setIsSignal} />}
            {isTutor &&
                <>
                    
                    <RadioGroup
                    containerStyle={{flexDirection: 'row'}}
                    radioButtons={contact}
                    onPress={()=>{
                        onPressContact
                        setIsSignal(!isSignal)
                    }}
                />
                    
                    <TextInput style={styles.input} placeholder='Mobile Number'></TextInput>
                    <Button title='Next' onPress={() => useStorage('userInfo', {})} />
                </>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        alignItems: 'center',
    },
    input: {
        padding: 10,
        margin: 10,
        borderRadius: 10,
        width: 200,
        backgroundColor: 'white'
    },
    checkbox: {
        padding: 10,
        textDecoration: 'none'
    }
})