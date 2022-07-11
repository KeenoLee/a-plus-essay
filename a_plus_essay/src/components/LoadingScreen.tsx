import { View, Text, StyleSheet } from "react-native";
import * as React from 'react'

export default function LoadingScreen() {

    return (
        <View style={styles.loading}>
            <Text>Loading...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    loading: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    }
})