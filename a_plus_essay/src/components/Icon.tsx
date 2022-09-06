import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'

export function AppIonIcon(props: {
  name: string
  color?: string
  size?: number
  onPress?: () => void
}) {
  return (
    <Ionicons
      name={props.name}
      color={props.color}
      size={props.size}
      onPress={props.onPress}
    />
  )
}
