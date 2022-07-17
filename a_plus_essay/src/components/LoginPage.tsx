import React, { useState } from "react"
import { Image, StyleSheet, Text, TextInput, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"

export default function LoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    return (
        <View style={styles.form}>
            <TextInput style={styles.input} textContentType='emailAddress' placeholder="Email address" onChangeText={(email) => setUsername(email)} />
            <TextInput style={styles.input} textContentType='password' placeholder="Password" onChangeText={(password) => setPassword(password)} />
            <Text>Forgot Password?</Text>
            <TouchableOpacity style={styles.button}>
                <Text>Sign in</Text>
            </TouchableOpacity>
            <Text>Don't have an account?
                <TouchableOpacity>
                    <Text> Sign Up</Text>
                </TouchableOpacity>
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flexDirection: 'column', flex: 4 }}>
                    <View style={{ borderBottomColor: 'grey' }}></View>
                    <View style={{ borderTopColor: 'grey' }}></View>
                </View>
                <View style={{ flex: 2 }}>
                    <Text>OR</Text>
                </View>
                <View style={{ flexDirection: 'column', flex: 4 }}>
                    <View style={{ borderBottomColor: 'grey' }}></View>
                    <View style={{ borderTopColor: 'grey' }}></View>
                </View>
            </View>
            <View>
                <TouchableOpacity>
                    <View style={{ flex: 2 }}>
                        {/* <Image source={ } /> */}
                    </View>
                    <Text style={{ flex: 6 }}>Sign in with Facebook</Text>
                    <View style={{ flex: 2 }}></View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={{ flex: 2 }}>
                        {/* <Image source={ } /> */}
                    </View>
                    <Text style={{ flex: 6 }}>Sign in with Google</Text>
                    <View style={{ flex: 2 }}></View>
                </TouchableOpacity>
            </View>
            <Text>By using our services you are agreeing to our
                <TouchableOpacity>
                    <Text style={{ fontWeight: 'bold' }}> Terms and Privacy Statement</Text>
                </TouchableOpacity>
            </Text>
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
        backgroundColor: 'white',
        textAlign: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
    },
    tutorIntroduction: {
        padding: 10,
        margin: 10,
        borderRadius: 10,
        width: 250,
        height: 200,
        backgroundColor: 'white',
        textAlign: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
    },
    editRow: {
        padding: 10,
        margin: 10,
        marginRight: 50,
        fontSize: 20,
        flex: 0.1
    },
    checkbox: {
        padding: 10,
        textDecoration: 'none'
    },
    title: {
        fontSize: 30,
        padding: 10
    },

    button: {
        backgroundColor: "#007AFF",
        padding: 10,
        margin: 10,
        borderRadius: 10,
        width: 200,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center'
    },
    disabledButton: {
        backgroundColor: '#222222'
    },
    fileSelector: {
        padding: 5,
        borderWidth: 1,
        borderColor: '#AAAAFF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 300,
        height: 50
    }
})
