// import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';

import { Text, StyleSheet, ScrollView, Alert, FlatList, ImageBackground } from 'react-native';
import React, { Fragment, useEffect, useState } from 'react';
import Chatroom from '../components/Chatroom';
import { View, Divider } from 'native-base';
import { then } from '@beenotung/tslib';
import { format, formatDistanceToNow, formatDistanceToNowStrict } from 'date-fns';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

import uuid from 'react-native-uuid';

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useGet } from '../hooks/use-get';
import { useToken } from '../hooks/use-token';
import { useAppNavigation } from '../routes';

const Stack = createStackNavigator();

interface ChatRoom {
  order_id: number;
  title: string;
  nickname?: string;
  is_tutor?: boolean;
  last_message?: string;
  last_message_time?: string;
}
interface ChatListProps {
  chatRoom: ChatRoom;
  token: string;
}

const ChatListItem = (props: ChatListProps) => {
  const { chatRoom } = props;
  const navigation = useAppNavigation();

  const onClick = () => {
    navigation.navigate({ name: 'Chatroom', params: { id: chatRoom.order_id, token: props.token, title: chatRoom.title } });
    console.log('Should save user_id, order_id, last_message_id', chatRoom,)
  };
  // return (
  //   <View>
  //     <Text>{JSON.stringify(chatRoom)}</Text>
  //   </View>
  // );
  return (
    // <View style={styles.container}>
    //   <ScrollView>
    <>
      {/* {Array.isArray(json) && json.map((jsonItem: any) => */}
      <TouchableWithoutFeedback onPress={onClick}>
        <View style={styles.innerContainer}>
          <View style={styles.topRow}>
            <Text numberOfLines={1} style={styles.assignmentName}>
              {chatRoom.title}
            </Text>
            <Text style={styles.timeFormat}>
              {(chatRoom.last_message_time == undefined)
                ? ' ' :
                (formatDistanceToNowStrict(new Date(chatRoom.last_message_time), {
                  addSuffix: true,
                }))}
            </Text>
          </View>
          <View style={styles.secondRow}>
            <Text style={styles.lastSender}>
              {(chatRoom.nickname == undefined)
                ? ' ' :
                ('    ' + chatRoom.nickname + ': ')}
            </Text>
            <Text numberOfLines={1} style={styles.text}>
              {(chatRoom.last_message == undefined)
                ? ' ' :
                chatRoom.last_message}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <Divider style={styles.divider} />
    </>
    // )}
    //   </ScrollView>
    // </View>
  );
};

export default function ChatListScreen() {
  const chatList = useGet<{ rooms: ChatRoom[]; error?: string }>(
    'chatrooms',
    '/chat/list',
    { error: 'loading', rooms: [] },
  );

  const state = useSelector((state: RootState) => state.auth);
  console.log('userInfo in ChatList', state?.user);
  console.log('tutorInfo in ChatList', state?.tutor);
  console.log(chatList)
  const navigation = useAppNavigation();

  const token = useToken()
  useEffect(() => {
    if (!token) {
      Alert.alert('Unauthorized', 'Please login to view chatroom!', [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('Login');
          },
        },
      ])
    }
  }, [token])

  if (!token) {
    return <View>

    </View>

  }
  return (
    <ImageBackground
      style={{ flex: 1, width: '100%', height: '100%' }}
      source={require('../assets/chatbg.jpg')}
      imageStyle={{ opacity: 0.35 }}>
      <View style={styles.container}>
        {chatList.render(json => (
          <FlatList
            style={{ width: '100%' }}
            data={json.rooms}
            renderItem={({ item }) => <ChatListItem chatRoom={item} token={token} />}
            keyExtractor={item => String(item.order_id)}
          />
        ))}
      </View>
    </ImageBackground>
  )
}

//Trying to turn the chatroom into Stack
// export function ChatStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="Chat"
//         component={ChatScreen}
//         options={{
//           headerTintColor: 'white',
//           headerStyle: {backgroundColor: 'tomato'},
//         }}
//       />
//     </Stack.Navigator>
//   );
// }

const styles = StyleSheet.create({
  container: {},
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

  // divider: {
  //   height: 3,
  // },

  assignmentName: {
    // backgroundColor: 'green',
    fontSize: 15,
    fontWeight: 'bold',
    flex: 3,
  },

  timeFormat: {
    // backgroundColor: 'green',
    AlignSelf: 'end',
    justifyContent:'center',
    alignItems: 'center',
    fontSize: 13,
    color: 'grey',
    flex: 1,
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
});
