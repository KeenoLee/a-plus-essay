import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useGet } from '../../hooks/use-get'
import { AppParamList, useAppNavigation } from '../../routes'
import { format } from 'date-fns'
import DateTime from '../../components/DateTime'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { env } from '../../env/env'
import { Divider } from 'native-base'
import Rating from '../../components/Rating'
import ViewMatchedOrder from '../ViewMatchedOrder'
import { NavigationContainer } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'



export type Order = {
    id: number
    title: string
    tutor_submission_deadline: Date
    student_id?: number
    tutor_id?: number | null
    grade?: string
    description?: string
    budget?: number
    // matched_time?: Date | null
    // completed_tine?: Date | null
    // paid_by_student_time?: Date | null
    // paid_to_tutor_time?: Date | null
    // student_submission_deadline?: Date
    // created_at: Date
    // updated_at: Date
}


function OrderListPage(props: { orderStatus: string }) {
    const state = useSelector((state: RootState) => state.auth)
    const navigation = useAppNavigation()
    let status = props.orderStatus
    let title = status + ' orders'
    let url = '/order/' + status
    console.log('URL???: ', url)
    const orderList = useGet<{ error?: string, orders?: Order[] }>(title, url, { error: 'loading' })
    console.log('ORDER lIST in :', orderList.json.orders)
   
    return (
        <View>
            <ScrollView>
                {orderList.render(json => json.orders?.map((order: Order, i) =>
                    url == '/order/matching' ?
                        state.tutor ?
                            <TouchableOpacity key={i} onPress={() => {
                                navigation.navigate('View Matched Order', { order: order })
                            }}>
                                <View>
                                    <View style={styles.container} key={order.id}>
                                        <Text style={styles.assignmentName}>{order.title}</Text>
                                        <DateTime style={styles.time} time={order.tutor_submission_deadline} />
                                    </View>
                                    <Divider />
                                </View>
                            </TouchableOpacity> :
                            <TouchableOpacity key={i} onPress={() => {
                                navigation.navigate('Select Tutor', { order: order })
                            }}>
                                <View>
                                    <View style={styles.container} key={order.id}>
                                        <Text style={styles.assignmentName}>{order.title}</Text>
                                        <DateTime style={styles.time} time={order.tutor_submission_deadline} />
                                        <Rating />
                                    </View>
                                    <Divider />
                                </View>
                            </TouchableOpacity>
                        :
                        <View key={i}>
                            <View style={styles.container} key={order.id}>
                                <Text style={styles.assignmentName}>{order.title}</Text>
                                <DateTime style={styles.time} time={order.tutor_submission_deadline} />
                            </View>
                            <Divider />
                        </View>
                ))}
            </ScrollView>
        </View>
    )
}

// export function PendingOrderListPage() { return <OrderListPage orderStatus='pending' /> }
export function MatchingOrderListPage() { return <OrderListPage orderStatus='matching' /> }
export function OngoingOrderListPage() { return <OrderListPage orderStatus='ongoing' /> }
export function CompletedOrderListPage() { return <OrderListPage orderStatus='completed' /> }

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#f0fdfa',
        padding: 10,
    },

    assignmentName: {
        fontSize: 15,
        fontWeight: '500',
        flex: 3,
    },

    time: {
        alignSelf: 'center',
        fontSize: 13,
        flex: 2,
    },

    icon: {
        alignSelf: 'center',
    },
})