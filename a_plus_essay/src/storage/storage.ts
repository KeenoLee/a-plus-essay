import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (name: string, value: string) => {
    try {
        await AsyncStorage.setItem(name, value)
        return { success: true }
    } catch (error) {
        console.log(error)
        return { success: false }
    }
}

export const getData = async (name: string) => {
    try {
        const value = await AsyncStorage.getItem(name)
        return value
    } catch (error) {
        console.log(error)
        return
    }
}

export const removeData = async (name: string) => {
    try {
        await AsyncStorage.removeItem(name)
        return { success: true }
    } catch (error) {
        return { success: false }
    }
}