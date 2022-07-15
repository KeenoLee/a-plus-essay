import * as React from "react";
import { VStack, Center, Text } from 'native-base';

export default function Home() {

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