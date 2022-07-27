import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Order } from '../pages/OrderStatus/OrderListPage'
type Props = {
    isSelected: boolean
    order: Order
}
const UnSelectedBoxStyle: StyleProp<ViewStyle> = {
    flexDirection: 'row' as const,
    justifyContent: 'space-between',
    width: 'auto',
    height: 'auto',
    alignItems: 'center' as const,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginHorizontal: 30,
    marginTop: 30,
    marginBottom: 10,
    backgroundColor: 'rgb(234,241,240)',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
}
const SelectedBoxStyle: StyleProp<ViewStyle> = {
    ...UnSelectedBoxStyle,
    borderWidth: 1,
    marginTop: +UnSelectedBoxStyle.marginTop! - 1,
    marginBottom: +UnSelectedBoxStyle.marginBottom! - 1,
    borderColor: 'rgb(89,149,248)',
    shadowColor: 'white'
}

export default function TutorBox({ isSelected, order, tutorId}: any) {
    console.log('order in STUDENT select tutor: ', order)
    const navigation = useNavigation()
    const [boxStyle, setBoxStyle] = useState(UnSelectedBoxStyle)
    useEffect(() => {
        console.log('selected?? ', isSelected)
        isSelected ? setBoxStyle(() => SelectedBoxStyle) : setBoxStyle(() => UnSelectedBoxStyle)
    }, [isSelected])
    useEffect(()=>{
        async function getTutorInfo() {

        }
    }, [])
    return (
        // <View style={isSelected?styles.selectedBox:styles.unSelectedBox}>
        <View style={boxStyle}>
            <View style={{ flex: 7.5 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Beeno</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ flex: 7, fontSize: 12, paddingVertical: 2 }}>Order Completed: </Text>
                    <Text style={{ flex: 3, fontSize: 12, paddingVertical: 2 }}>50</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                    <Text style={{ flex: 7, fontSize: 12, paddingVertical: 2 }}>Rating: </Text>
                    <Text style={{ flex: 3, fontSize: 12, paddingVertical: 2 }}>5 Stars</Text>
                </View>
                <Text style={{ fontSize: 12, paddingVertical: 2 }}>Tutor Introduction: </Text>
                <Text style={{ backgroundColor: 'white', marginLeft: 10, padding: 5, marginTop: 2 }}>I LOVE IONIC!</Text>
            </View>
            <View style={{ alignItems: 'center', flex: 2.5 }}>
                <Text style={{ backgroundColor: 'rgb(192,210,207)', padding: 5, fontWeight: 'bold' }}>$ Price</Text>
            </View>
        </View>
    )
}


