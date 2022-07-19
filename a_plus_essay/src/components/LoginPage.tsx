import React, { useEffect, useState } from "react"
import { Alert, Image, StyleSheet, Text, TextInput, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/core";
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../App";
import { Provider, useDispatch, useSelector } from "react-redux";
import { fetchLogin } from "../redux/auth/actions";
import { RootState, store } from "../redux/store";
import { ThunkDispatch } from "redux-thunk";
import { AppDispatch } from "../redux/dispatch";
interface UserInfo {
    email: string,
    password: string
}
type Props = NativeStackScreenProps<RootStackParamList>

// async function fetchLogin(userInfo: UserInfo) {
//     console.log('going to fetch login...')
//     const res = await fetch('/login/password', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(userInfo)
//     })
//     const result = await res.json()
//     console.log(result)
//     return result
// }

export default function LoginPage({ navigation }: Props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch<AppDispatch>()
    const state = useSelector((state: RootState) => state)
    // const auth = useSelector((state: RootState) => state.auth)
    // const user = useSelector((state: RootState) => state.auth.user)
    useEffect(()=>{
        console.log('state from store: ', state)
    },[state])
    // console.log('auth of state from store: ', auth)
    // console.log('user of auth from store: ', user)
    // const navigation = useNavigation()
    return (
        <View style={{ alignItems: 'center', marginTop: 50 }}>
            <TextInput style={styles.input} textContentType='emailAddress' autoCapitalize="none" placeholder="Email address" onChangeText={email => setUsername(email)} />
            <TextInput style={styles.input} textContentType='password' secureTextEntry placeholder="Password" onChangeText={password => setPassword(password)} />

            <View style={{ alignSelf: 'flex-end' }}>
                <TouchableOpacity style={{ flexDirection: 'row', padding: 10 }}>
                    <Text style={{ color: "#007AFF", marginRight: 33 }}>Forgot Password?</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={() => {
                // const result = await fetchLogin({ email: username, password: password })
                // const result = dispatch({ type: '@@auth/LOGIN_SUCCESS', email: username, password: password })
                dispatch(fetchLogin({ email: username, password: password }))
                navigation.navigate('A Plus Essay')
                    // .unwrap()

                // result.error ?
                //     Alert.alert('Error', result.error) :
                //     navigation.navigate('HomeScreen')
                // Alert.alert('Success', result)
                // Navigate to Home Page here
            }} >
                <Text style={{ textAlign: 'center', color: 'white' }}>Sign in</Text>
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', margin: 20 }}>
                <Text>Don't have an account? </Text>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Register')
                }}>
                    <Text style={{ color: "#007AFF" }}>Sign Up</Text>
                </TouchableOpacity>
            </View>


            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flexDirection: 'column', flex: 4, borderWidth: 1, borderColor: 'grey', height: 1, margin: 30 }} />
                <Text style={{ flex: 1, textAlign: 'center', color: 'grey' }}>
                    OR
                </Text>
                <View style={{ flexDirection: 'column', flex: 4, borderWidth: 1, borderColor: 'grey', height: 1, margin: 30 }} />
            </View>

            <TouchableOpacity style={{ justifyContent: 'center', backgroundColor: "#007AFF", borderColor: 'black', borderWidth: 1, maxWidth: '80%', width: 300, height: 35, borderRadius: 15, margin: 10 }}>
                <View style={{}}>
                    {/* <Image source={ } /> */}
                </View>
                <Text style={{ textAlign: 'center', color: 'white' }}>Sign in with Facebook</Text>
                <View style={{}}></View>
            </TouchableOpacity>

            <TouchableOpacity style={{ justifyContent: 'center', borderColor: 'black', borderWidth: 1, maxWidth: '80%', width: 300, height: 35, borderRadius: 15, margin: 10 }}>
                <View style={{}}>
                    {/* <Image source={ } /> */}
                </View>
                <Text style={{ textAlign: 'center' }}>Sign in with Google</Text>
                <View style={{}}></View>
            </TouchableOpacity>

            <View style={{ alignItems: 'center', marginTop: 30 }}>
                <Text style={{ fontSize: 12 }}>By using our services you are agreeing to our</Text>
                <TouchableOpacity>
                    <Text style={{ fontWeight: 'bold', fontSize: 12 }}> Terms and Privacy Statement</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        padding: 10,
        margin: 10,
        borderRadius: 10,
        maxWidth: '80%',
        width: 300,
        backgroundColor: 'white',
        textAlign: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
    },
    button: {
        backgroundColor: "#007AFF",
        padding: 10,
        margin: 10,
        borderRadius: 10,
        maxWidth: '80%',
        width: 300,
    },
})
