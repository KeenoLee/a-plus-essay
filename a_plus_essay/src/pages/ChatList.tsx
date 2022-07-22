// import { NavigationContainer } from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  FlatList,
} from 'react-native';
import React, {Fragment, useEffect, useState} from 'react';
import Chatroom from '../components/Chatroom';
import {Divider} from 'native-base';
import {then} from '@beenotung/tslib';
import {format, formatDistanceToNow} from 'date-fns';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';

import uuid from 'react-native-uuid';

import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {useGet} from '../hooks/use-get';
import {useAppNavigation} from '../../routes';

const Stack = createStackNavigator();

interface ChatRoom {
  order_id: number;
  title: string;
  nickname: string;
  is_tutor: boolean;
  last_message: string;
  last_message_time: string;
}
interface ChatListProps {
  chatRoom: ChatRoom;
}

const ChatListItem = (props: ChatListProps) => {
  const {chatRoom} = props;
  const navigation = useAppNavigation();

  const onClick = () => {
    navigation.navigate({name: 'Chatroom', params: {id: chatRoom.order_id}});
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
            {/* <Text style={styles.timeFormat}>{format(new Date(chatRoom.last_message_time), '   KK:mm aaa')}</Text> */}
            <Text style={styles.timeFormat}>
              {formatDistanceToNow(new Date(chatRoom.last_message_time), {
                addSuffix: true,
              })}
            </Text>
          </View>
          <View style={styles.secondRow}>
            <Text style={styles.lastSender}>
              {'    ' + chatRoom.nickname + ': '}
            </Text>
            <Text numberOfLines={1} style={styles.text}>
              {chatRoom.last_message}
            </Text>
          </View>
          {/* <Text>{'toDelete - id: ' + chatRoom.chatroom_id}</Text> */}
        </View>
      </TouchableWithoutFeedback>
      <Divider style={styles.divider} />
    </>
    // )}
    //   </ScrollView>
    // </View>
  );
};

export default function ChatScreen() {
  const chatList = useGet<{rooms: ChatRoom[]; error?: string}>(
    'chatrooms',
    '/chat/list',
    {error: 'loading', rooms: []},
  );

  const userInfo = useSelector((state: RootState) => state.auth.user);

  return (
    <View style={styles.container}>
      {/* <ScrollView> */}
      {chatList.render(json => (
        <FlatList
          style={{width: '100%'}}
          data={json.rooms}
          renderItem={({item}) => <ChatListItem chatRoom={item} />}
          keyExtractor={item => String(item.order_id)}
        />
      ))}
      {/* </ScrollView> */}
    </View>
  );
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
    flex: 0.3,
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
