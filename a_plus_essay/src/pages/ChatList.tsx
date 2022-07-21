// import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { View, Text, StyleSheet, ScrollView, Alert, FlatList } from 'react-native'
import React, { Fragment, useEffect, useState } from 'react'
import Chatroom from '../components/Chatroom'
import { Divider } from 'native-base';
import { then } from '@beenotung/tslib';
import { format, formatDistanceToNow } from 'date-fns'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

import uuid from 'react-native-uuid';

import { NavigationContainer, useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();

interface ChatRoom {
  chatroom_id: number;
  title: string;
  nickname: string;
  is_tutor: boolean;
  last_message: string;
  last_message_time: string;
  uuid?: string;
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
          <Text numberOfLines={1} style={styles.assignmentName}>{chatRoom.title}</Text>
          {/* <Text style={styles.timeFormat}>{format(new Date(chatRoom.last_message_time), '   KK:mm aaa')}</Text> */}
          <Text style={styles.timeFormat}>{formatDistanceToNow(new Date(chatRoom.last_message_time), { addSuffix: true })}</Text>
        </View>
        <View style={styles.secondRow}>
          <Text style={styles.lastSender}>{'    ' + chatRoom.nickname + ': '}</Text>
          <Text numberOfLines={1} style={styles.text}>{chatRoom.last_message}</Text>
        </View>
        {/* <Text>{'toDelete - id: ' + chatRoom.chatroom_id}</Text> */}
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
  const [json, setJSON] = useState<ChatRoom[]>([])
  const onClick = () => {
    navigation.navigate('ChatRoom')
  }

  const userInfo = useSelector((state: RootState) => state.auth.user)

  useEffect(() => {
    // console.log(userInfo)
    // if (!userInfo) return Alert.alert('Unauthorized', 'Please login', [{ text: 'OK', onPress: () => { navigation.navigate('Login') } }])
    // fetch('http://192.168.168.103:8111/chat/list')
    //   .then(res => res.json())
    //   .then(setJSON)
    //   .catch(error => console.error(error))

    (async () => {
      let res = await fetch('http://192.168.168.103:8111/chat/list');
      let result = await res.json();

      let finalArr = Array.isArray(result) ? result.map(v => {
        return {
          ...v,
          uuid: uuid.v4(),
        }
      }) : [];

      setJSON(finalArr);
    })()
  }, [])


  return (
    <View style={styles.container}>
      {/* <ScrollView> */}
      <FlatList
        style={{ width: '100%' }}
        data={json}
        renderItem={({ item }) => <ChatList chatRoom={item} />}
        keyExtractor={item => item.uuid + ""}
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
    // backgroundColor: 'blue',
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
    // backgroundColor: 'green',
    fontSize: 18,
    fontWeight: '500',
    flex: 0.7,
  },

  timeFormat: {
    // backgroundColor: 'green',
    AlignSelf: 'end',
    fontSize: 13,
    marginTop: 6,
    color: 'grey',
    flex: 0.3

  },

  text: {
    fontSize: 13,
    marginTop: 6,
    flex: 0.65,
  },

  lastSender: {
    fontSize: 13,
    marginTop: 6,
    fontWeight: '500',
  },
})