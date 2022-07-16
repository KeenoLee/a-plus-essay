import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { Component } from 'react'
import io from 'socket.io-client'


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
    file?: string;
}

export default class Chatroom extends Component<IChatroomProps, IChatroomState> {
    socket: any;
    constructor(props: IChatroomProps) {
        super(props);
        this.state = {
            chatMessage: "hi"
        }
    }

    componentDidMount() {
        this.socket = io("http://192.168.168.103:8111")
    }

    submitChatMessage() {
        this.socket.emit("chat message", this.state.chatMessage);
        this.setState({ chatMessage: "" })
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.inputBox}
                    autoCorrect={false}
                    value={this.state.chatMessage}
                    onSubmitEditing={() => this.submitChatMessage()}
                    onChangeText={chatMessage => {
                        this.setState({ chatMessage })
                    }} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'lightgrey',
        flex: 1,
    },
    inputBox: {
        height: 40,
        borderWidth: 2
    }
})