// import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Chatroom from '../components/Chatroom'
import { Divider } from 'native-base';


const Stack = createStackNavigator();

export default function ChatList() {
  return (
    <View style={styles.container}>
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
      <Divider style={styles.divider}/>
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
      <Divider style={styles.divider}/>
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
      <Divider style={styles.divider}/>
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
      <Divider style={styles.divider}/>
    </View>
  )
}

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
    fontSize: 20,
    fontWeight: '500',
  },

  text: {
    fontSize: 15,
    marginTop: 6,
  },

  lastSender: {
    fontSize: 15,
    marginTop: 6,
    fontWeight: '500',
  },
})