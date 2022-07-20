import * as React from "react";
import { VStack, Center, Text } from 'native-base';
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export default function Home() {
    // const userInfo = useSelector((state: RootState) => state.auth.user)

    return (
        <VStack space={5} alignItems="flex-end">
            <Center bg="primary.400" _text={{
                color: "white",
                fontWeight: "bold"
            }} height={200} width={{
                base: 200,
                lg: 250
            }}>
                This is the Center
            </Center>
            <Center bg="primary.400" _text={{
                color: "white",
                fontWeight: "bold"
            }} height={200} width={{
                base: 200,
                lg: 250
            }}>
                This is the Center
            </Center>
            <Center bg="primary.400" _text={{
                color: "white",
                fontWeight: "bold"
            }} height={200} width={{
                base: 200,
                lg: 250
            }}>
                This is the Center
            </Center>
        </VStack>
    )
}