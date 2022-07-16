import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import DocumentPicker, { types } from 'react-native-document-picker'
import { Button, Stack } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'

type File = {
    uri: string,
    filename: string,
    filetype: string | null
}

export default function FilePicker() {
    const [fileData, setFileData] = useState<File[]>([])

    const handleFilePicker = async () => {
        try {
            const pickerResult = await DocumentPicker.pick({
                presentationStyle: "fullScreen",
                copyTo: "cachesDirectory",
                allowMultiSelection: true,
                // You can also limit the file type here 
                // type: [types.doc, types.docx]
            })
            let result = {
                uri: pickerResult[0].uri,
                filename: pickerResult[0].name,
                filetype: pickerResult[0].type
            }
            setFileData([...fileData, result])
        }
        catch (err) {
            console.log(err)
        }
    }
    //Debug 
    // useEffect(() => {
    //     console.log('useeffect', fileData)
    // }, [fileData])

    return (
        <Stack>
            <Button onPress={() => handleFilePicker()} leftIcon={<Ionicons name="cloud-upload-outline" color="white" />}>
                Upload
            </Button>
            {fileData.length > 0 
                ? fileData.map((file, index) => {
                    return (
                        <View key={index}>
                            <Text> Filename: {file.filename}</Text>
                        </View>
                    )
                })
            : null}
        </Stack>
    )
}