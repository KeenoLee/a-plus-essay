// import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { Fragment, useEffect, useState } from 'react'
import Chatroom from '../components/Chatroom'
import { Divider } from 'native-base';
import { then } from '@beenotung/tslib';


const Stack = createStackNavigator();




export default function ChatList() {

  const [json, setJSON] = useState()

  useEffect(() => {
    fetch('http://192.168.168.103:8111/chat/list')
      .then(res => res.json())
      .then(setJSON)
      .catch(error => console.error(error))
  }, [])

  return (
    <View style={styles.container}>
      <ScrollView>
        {[1, 2, 3, 4].map(() =>
          <Fragment key={Math.random()}>
            <View style={styles.innerContainer}>
              <View style={styles.topRow}>
                <Text style={styles.assignmentName}>Financial Account ASM 1</Text>
                <Text style={styles.text}>09:42</Text>
              </View>
              <View style={styles.secondRow}>
                <Text style={styles.lastSender}>Ken:</Text>
                <Text style={styles.text}>Okay Cool. I'll share to you soon</Text>
              </View>
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