import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useGet } from '../../hooks/use-get'
import { AppParamList } from '../../../routes'
import { format } from 'date-fns'
import DateTime from '../../components/DateTime'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { env } from '../../env/env'



type Order = {
    id: number
    title: string
    tutor_submission_deadline: string
}

function OrderListPage(props: { orderStatus: string }) {
    let status = props.orderStatus
    let title = status + ' orders'
    let url = '/order/' + status
    console.log('URL???: ', url)
    const orderList = useGet<{ error?: string, orders?: Order[] }>(title, url, { error: 'loading' })
    useEffect(()=>{
        async function getPendingOrder() {
            const res = await fetch(`${env.BACKEND_URL}/order/pending`) 
        }
    },[])
    return (
        <View>
            <ScrollView>
                {orderList.render(json => json.orders?.map(order =>
                    <View style={styles.container} key={order.id}>
                        <Text style={styles.assignmentName}>{order.title}</Text>
                        <DateTime style={styles.time} time={order.tutor_submission_deadline} />
                        {/* <TouchableOpacity style={styles.icon}>
                        <Ionicons name="heart-dislike" color='grey' size={18} />
                    </TouchableOpacity> */}
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