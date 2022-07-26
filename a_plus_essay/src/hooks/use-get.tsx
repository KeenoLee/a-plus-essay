import {
  Alert,
  CloseIcon,
  Heading,
  HStack,
  IconButton,
  Spinner,
  VStack,
  Text,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// import {Text} from 'react-native';
import { env } from '../env/env';
import { RootState } from '../redux/store';

export function useGet<T extends { error?: string }>(
  name: string,
  url: string,
  defaultValue: T,
) {
  const [json, setJSON] = useState<T>(defaultValue);
  const token = useSelector((state: RootState) => state.auth.token);
  useEffect(() => {
    fetch(env.BACKEND_ORIGIN + url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
      .then(res => res.text())
      .then(text => {
        try {
          return JSON.parse(text);
        } catch (error) {
          return { error: text };
        }
      })
      .catch(error => ({ error: String(error) }))
      .then(json => {
        // console.log('JSON: ', json);
        setJSON(json);
        // if (json.error) {
        //   Alert.alert('Fail to load ' + name, json.error, [{text: 'Dismiss'}]);
        // }
      });
  }, [url, token]);
  function render(fn: (json: T) => any) {
    if (json.error == 'loading') {
      return (
        <HStack space={2} justifyContent="center">
          <Spinner accessibilityLabel={'Loading ' + name} />
          <Heading color="primary.500" fontSize="md">
            <Text>{'Loading ' + name + ' ...'}</Text>
          </Heading>
        </HStack>
      );
    }
    if (json.error) {
      return (
        <Alert w="100%" status={'error'}>
          <VStack space={2} flexShrink={1} w="100%">
            <HStack flexShrink={1} space={2} justifyContent="space-between">
              <HStack space={2} flexShrink={1}>
                <Alert.Icon mt="1" />
                <Text fontSize="md" color="coolGray.800">
                  Fail to load {name}: {json.error}
                </Text>
              </HStack>
              <IconButton
                variant="unstyled"
                _focus={{
                  borderWidth: 0,
                }}
                icon={<CloseIcon size="3" />}
                _icon={{
                  color: 'coolGray.600',
                }}
              />
            </HStack>
          </VStack>
        </Alert>
      );
    }
    return fn(json);
  }
  return { json, setJSON, render, token };
}
