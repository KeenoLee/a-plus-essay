// import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native'
import React, { Fragment, useEffect, useState } from 'react'
import Chatroom from '../components/Chatroom'
import { Divider } from 'native-base';
import { then } from '@beenotung/tslib';
import { format } from 'date-fns'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Stack = createStackNavigator();




export default function ChatList() {

  const [json, setJSON] = useState([])
  const userInfo = useSelector((state: RootState) => state.auth.user)

  useEffect(() => {
    if (!userInfo) return Alert.alert('Unauthorized', 'Please login')
    fetch('http://192.168.168.103:8111/chat/list')
      .then(res => res.json())
      .then(setJSON)
      .catch(error => console.error(error))
  }, ['/chat/list'])

  return (
    <View style={styles.container}>
      <ScrollView>
        {Array.isArray(json) && json.map((jsonItem: any) =>
          <Fragment key={Math.random()}>
            <View style={styles.innerContainer}>
              <View style={styles.topRow}>
                <Text style={styles.assignmentName}>{jsonItem.title}</Text>
                <Text style={styles.timeFormat}>{format(new Date(jsonItem.last_message_time), 'KK:mm aaa')}</Text>
              </View>
              <View style={styles.secondRow}>
                <Text style={styles.lastSender}>{'    ' + jsonItem.nickname + ': '}</Text>
                <Text style={styles.text}>{jsonItem.last_message}</Text>
              </View>
              <Text>{'toDelete - id: ' + jsonItem.chatroom_id}</Text>
            </View>
            <Divider style={styles.divider} />
          </Fragment>
        )}
      </ScrollView>
    </View>
  )
}
// function MyStack(headerName:string, componentName:React.FunctionComponent) {
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