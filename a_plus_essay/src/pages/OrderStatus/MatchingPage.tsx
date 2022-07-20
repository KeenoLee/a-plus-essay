import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'


export default function MatchingPage() {
    return (
        <View>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.assignmentName}>Financial Accounting AsmFinancial Accounting AsmFinancial Accounting AsmFinancial Accounting Asm</Text>
                    <Text style={styles.time}>DD/MM/YYYY 13:00</Text>
                    <TouchableOpacity style={styles.icon}>
                        <Ionicons name="heart-dislike" color='grey' size={18} />
                    </TouchableOpacity>
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