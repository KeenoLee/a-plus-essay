import { View, Text, StyleSheet } from 'react-native'
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



export default class Chatroom extends Component {
    componentDidMount() {
        const socket = io("http://192.168.168.103:8111")
    }
    render() {
        return (
            <View>
                <Text>Chatroom</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({

})