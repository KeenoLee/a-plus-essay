import { View, Text, StyleSheet, TextInput, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { Component } from 'react'
import io from 'socket.io-client'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
// import { Header } from '@react-navigation/native-stack'

const keyboardVerticalOffset = Platform.OS === 'ios' ? 100 : 0
// export default function Chatroom() {
//     const socket = io("http://192.168.168.103:8111")
//     return (
//         <View>
//             <Text>Chatroom</Text>
//         </View>
//     ) 
// }

interface IChatroomProps {
    id: string;
    title?: string;
}

interface IChatroomState {
    chatMessage: string;
    chatMessages: string[];
    file?: string;
}

export default class Chatroom extends Component<IChatroomProps, IChatroomState> {
    socket: any;
    is_hardcode_tutor: boolean;
    constructor(props: IChatroomProps) {
        super(props);
        this.state = {
            chatMessage: "",
            chatMessages: []
        }
        this.is_hardcode_tutor = true
    }

    componentDidMount() {
        this.socket = io("http://192.168.168.103:8111")
        this.socket.on("chat message", (msg: string) => {
            this.setState({ chatMessages: [...this.state.chatMessages, msg] })
        })
    }

    submitChatMessage() {
        this.socket.emit("chat message", this.state.chatMessage);
        this.setState({ chatMessage: "" })
    }
    render() {
        const chatMessages = this.state.chatMessages.map(chatMessage =>
            <View key={/*FIXME:GiveUniqueId*/chatMessage}
                style={this.is_hardcode_tutor
                    ? styles.sendMessageBox
                    : styles.incomingMessageBox}>
                <Text>{chatMessage.trim()}</Text>
                {/* <Text>Time</Text> */}
            </View>)
        return (
            <>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                    style={styles.container}
                    keyboardVerticalOffset={keyboardVerticalOffset}>
                    {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
                    <SafeAreaView style={{ flex: 1, backgroundColor: 'red' }}>
                        <View style={styles.container}>
                            {/* <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}> */}
                            {chatMessages}
                            <View style={{ flex: 1 }} >
                                <TextInput
                                    style={styles.inputBox}
                                    autoCorrect={false}
                                    autoCapitalize={'none'}
                                    placeholder={'Type a message'}
                                    value={this.state.chatMessage}
                                    onSubmitEditing={() => this.submitChatMessage()}
                                    onChangeText={chatMessage => {
                                        this.setState({ chatMessage })
                                    }} />
                                {/* </KeyboardAvoidingView> */}
                            </View>
                        </View>
                    </SafeAreaView>
                    {/* </TouchableWithoutFeedback> */}
                </KeyboardAvoidingView>
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        //flex: 1,
        width: '100%',
        position: "absolute",
        top: 0,
        bottom: 15
    },
    inputBox: {
        alignItems: 'flex-end',
        height: 40,
        borderWidth: 2,
        position: 'absolute',
        bottom: 0,
        width: '100%',

    },
    incomingMessageBox: {
        backgroundColor: 'rgb(88,88,88)',
        borderRadius: 15,
        maxWidth: '70%',
        paddingHorizontal: 10,
        paddingVertical: 5,
        margin: 3,
        alignSelf: 'flex-start',

    },
    sendMessageBox: {
        backgroundColor: 'rgb(209,237,255)',
        borderRadius: 15,
        maxWidth: '70%',
        paddingHorizontal: 10,
        paddingVertical: 5,
        margin: 3,
        alignSelf: 'flex-end',
    }
})