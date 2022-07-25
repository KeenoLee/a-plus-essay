import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useGet } from '../../hooks/use-get'

export default function PendingPage(props: any) {
    useGet('pending orders', '/order/pending', { error: 'loading' })
    console.log('propppppps', props)
    if (props.route) {
        // const result = props.route.params?.result
        // const isTutor = props.route.params?.isTutor
    }
    // useEffect(() =>{
    //     if(props.route) {
    //         console.log(props.route)
    //     }
    // },[props])

    // console.log('inside pending page ararararaararar: ', props.route.params.isTutor)

    return (
        <View>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.assignmentName}>Financial Accounting AsmFinancial Accounting AsmFinancial Accounting AsmFinancial Accounting Asm</Text>
                    <Text style={styles.time}>DD/MM/YYYY 13:00</Text>
                    {/* <TouchableOpacity style={styles.icon}>
                        <Ionicons name="heart-dislike" color='grey' size={18} />
                    </TouchableOpacity> */}
                </View>
            </ScrollView>
        </View>
    )
}

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