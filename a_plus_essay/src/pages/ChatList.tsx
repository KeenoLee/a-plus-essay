// import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { View, Text, StyleSheet, ScrollView, Alert, FlatList } from 'react-native'
import React, { Fragment, useEffect, useState } from 'react'
import Chatroom from '../components/Chatroom'
import { Divider } from 'native-base';
import { then } from '@beenotung/tslib';
import { format } from 'date-fns'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();

interface ChatRoom {
  chatroom_id: number;
  title: string;
  nickname: string;
  is_tutor: boolean;
  last_message: string;
  last_message_time: string;
}
interface ChatListProps {
  chatRoom: ChatRoom
}


const ChatList = (props: ChatListProps) => {
  const { chatRoom } = props;



  return (
    // <View style={styles.container}>
    //   <ScrollView>
    <>
      {/* {Array.isArray(json) && json.map((jsonItem: any) => */}
      <View style={styles.innerContainer}>
        <View style={styles.topRow}>
          <Text style={styles.assignmentName}>{chatRoom.title}</Text>
          <Text style={styles.timeFormat}>{format(new Date(chatRoom.last_message_time), 'KK:mm aaa')}</Text>
        </View>
        <View style={styles.secondRow}>
          <Text style={styles.lastSender}>{'    ' + chatRoom.nickname + ': '}</Text>
          <Text style={styles.text}>{chatRoom.last_message}</Text>
        </View>
        <Text>{'toDelete - id: ' + chatRoom.chatroom_id}</Text>
      </View>
      <Divider style={styles.divider} />
    </>
    // )}
    //   </ScrollView>
    // </View>
  )
}

export default function ChatScreen() {
  const navigation = useNavigation()
  const [json, setJSON] = useState([])
  const userInfo = useSelector((state: RootState) => state.auth.user)

  useEffect(() => {
    console.log(userInfo)
    if (!userInfo) return Alert.alert('Unauthorized', 'Please login', [{ text: 'OK', onPress: () => { navigation.navigate('Login') } }])
    fetch('http://192.168.168.103:8111/chat/list')
      .then(res => res.json())
      .then(setJSON)
      .catch(error => console.error(error))
  }, [])


  return (
    <View style={styles.container}>
      {/* <ScrollView> */}
      <FlatList
        data={json}
        renderItem={({ item }) => <ChatList chatRoom={item} />}
        keyExtractor={(item) => item}
      />
      {/* </ScrollView> */}
    </View>
  )

}
// function ChatStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name={headerName}
//         component={componentName}
//         options={{
//           headerTintColor: 'white',
//           headerStyle: { backgroundColor: 'tomato' },
//         }}
//       />
//     </Stack.Navigator>
//   )
// }


const styles = StyleSheet.create({
  container: {
  },
  innerContainer: {
    padding: 10,
    backgroundColor: '#f0fdfa',
    // backgroundColor: 'red',
  },
  topRow: {
    flexDirection: 'row',
    // backgroundColor:'blue',
    // padding: 20,
    justifyContent: 'space-between',
  },

  secondRow: {
    // backgroundColor:'green',
    flexDirection: 'row',
  },

  divider: {
    height: 3,
  },

  assignmentName: {
    fontSize: 18,
    fontWeight: '500',
  },

  timeFormat: {
    fontSize: 13,
    marginTop: 6,
    color: 'grey'
  },

  text: {
    fontSize: 13,
    marginTop: 6,
  },

  lastSender: {
    fontSize: 13,
    marginTop: 6,
    fontWeight: '500',
  },
})