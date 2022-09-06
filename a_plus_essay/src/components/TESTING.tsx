import { View, Text, StyleSheet, TextInput, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import * as React from 'react'
import { Component } from 'react'
import io from 'socket.io-client'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { format } from 'date-fns'
import { Button, Center, Divider, Heading, Select, Stack, VStack } from 'native-base';
import { launchImageLibrary } from 'react-native-image-picker';
import { Input as InputN } from 'native-base'
import { env } from '../env/env';
import { AppIonIcon } from './Icon';

// import { Header } from '@react-navigation/native-stack'

const keyboardVerticalOffset = Platform.OS === 'ios' ? 100 : 0
// export default function Chatroom() {
//     const socket = io("http://192.168.168.94:8111")
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
    scrollView: any;
    constructor(props: IChatroomProps) {
        super(props);
        this.state = {
            chatMessage: "",
            chatMessages: [],
        }
        this.is_hardcode_tutor = true
        this.scrollView = ''
    }

    componentDidMount() {
        this.socket = io(`${env.BACKEND_ORIGIN}`)
        this.socket.on("chat message", (msg: string) => {
            this.setState({ chatMessages: [...this.state.chatMessages, msg] })
        })
    }

    submitChatMessage() {
        this.socket.emit("chat message", this.state.chatMessage);
        this.socket.emit("chat message", this.state.chatMessage);
        this.socket.emit("chat message", this.state.chatMessage);
        this.socket.emit("chat message", this.state.chatMessage);
        this.socket.emit("chat message", this.state.chatMessage);
        this.socket.emit("chat message", this.state.chatMessage);
        this.socket.emit("chat message", this.state.chatMessage);
        this.socket.emit("chat message", this.state.chatMessage);
        this.socket.emit("chat message", this.state.chatMessage);
        this.socket.emit("chat message", this.state.chatMessage);
        this.socket.emit("chat message", this.state.chatMessage);
        this.socket.emit("chat message", this.state.chatMessage);
        this.setState({ chatMessage: "" })
    }

    // addFile = () => {
    //     this.openGallery(file => {
    //         setState(file)
    //     })
    // }

    // openGallery = (callback: (file: { uri: string, filename: string, type: string, base64Data: string }) => void) => {
    //     launchImageLibrary({
    //         mediaType: 'photo',
    //         includeBase64: true
    //     }, (res) => {
    //         if (res.didCancel) {
    //             console.log('user cancelled image picker')
    //         } else if (res.errorMessage) {
    //             console.log('Error: ', res.errorMessage)
    //         } else {
    //             let uri = res.assets?.[0].uri
    //             let filename = res.assets?.[0].fileName
    //             let type = res.assets?.[0].type
    //             let base64Data = res.assets?.[0].base64
    //             // console.log(base64.decode(base64Format!))
    //             // console.log('base64', base64Format)
    //             if (uri && filename && type && base64Data) {
    //                 callback({ uri, filename, type, base64Data })
    //                 return
    //             }
    //             console.log('file is not found')
    //             return
    //         }
    //     })
    // }


    render() {
        const chatMessages = this.state.chatMessages.map(chatMessage =>
            <View key={/*FIXME:GiveUniqueId*/chatMessage + (Math.random() * 100).toFixed(5)}
                style={this.is_hardcode_tutor
                    ? styles.sendMessageBox
                    : styles.incomingMessageBox}>
                <Text>{chatMessage.trim() + '   '}</Text>
                <Text style={styles.timeDisplay}>{format(new Date(), "KK:mm aaaa")}</Text>
            </View>)
        return (
            <>
                <SafeAreaView edges={['bottom', 'left', 'right']} style={{ flex: 1, backgroundColor: 'white' }}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : undefined}
                        style={styles.outerContainer}
                        keyboardVerticalOffset={keyboardVerticalOffset}
                    >
                        <View style={{ flex: 1, }}>
                            {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
                            <ScrollView
                                style={{ backgroundColor: 'yellow', flex: 1, marginBottom: 40 }}
                                ref={ref => { this.scrollView = ref }}
                                onContentSizeChange={() => this.scrollView.scrollToEnd({ animated: true })}
                                automaticallyAdjustContentInsets={true}
                            >
                                {chatMessages}
                                <View style={{ backgroundColor: 'transparent', width: 50, height: 300, }}></View>
                            </ScrollView>
                            {/* <VStack style={{ marginRight: 10, }} space={6} alignSelf="flex-start" w="30%">
                                <Select
                                    selectedValue={position}
                                    mx={{ base: -0.5, md: "Image" }}
                                    onValueChange={nextValue => setPosition(nextValue)}
                                    accessibilityLabel="Upload Image or file"
                                >
                                    <Select.Item label="Upload" value="Upload" disabled />
                                    <Select.Item label="Image" value="Image" onPress={() => addTranscriptImage()} />
                                    <Select.Item label="File" value="File" onPress={() => addTranscriptFile()} />
                                </Select>
                            </VStack> */}
                            <View style={styles.inputContainer}>
                                <AppIonIcon size={24} name="add-circle-outline" />
                                <TextInput
                                    style={styles.textInput}
                                    autoCorrect={false}
                                    autoCapitalize={'none'}
                                    placeholder={'Type a message'}
                                    value={this.state.chatMessage}
                                    onSubmitEditing={() => this.submitChatMessage()}
                                    onChangeText={chatMessage => {
                                        this.setState({ chatMessage })
                                    }} />
                                <AppIonIcon size={24} name="send" onPress={() => this.submitChatMessage()} />

                            </View>
                        </View>
                    </KeyboardAvoidingView>
                    {/* </TouchableWithoutFeedback> */}
                </SafeAreaView>
            </>
        )
    }
}

const styles = StyleSheet.create({
    outerContainer: {
        backgroundColor: 'white',
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        position: "relative",
        // marginTop: -40

        // top: 0,
        // bottom: 15
    },
    container: {
        backgroundColor: 'red',
        flex: 1,
        width: '100%',
        position: "relative",
        // top: 0,
        // bottom: 15
    },

    incomingMessageBox: {
        backgroundColor: 'rgb(88,88,88)',
        borderRadius: 15,
        maxWidth: '70%',
        paddingHorizontal: 10,
        paddingVertical: 5,
        margin: 3,
        alignSelf: 'flex-start',
        flexDirection: 'row',

    },
    sendMessageBox: {
        backgroundColor: 'rgb(209,237,255)',
        borderRadius: 15,
        maxWidth: '70%',
        paddingHorizontal: 10,
        paddingVertical: 5,
        margin: 3,
        alignSelf: 'flex-end',
        flexDirection: 'row',
    },
    timeDisplay: {
        fontSize: 10,
        alignSelf: 'flex-end',
        // marginBottom: -2
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        // margin: 10,
        backgroundColor: 'white',
        width: '100%',
        alignItems: 'center',
        marginTop: -40
    },
    textInput: {
        // flex: 1,
        // alignItems: 'flex-end',
        height: 40,
        width: '80%',
        borderWidth: 2,
        borderRadius: 50,
        position: 'relative',
        bottom: 0,
    },
    buttonContainer: {

    }

})