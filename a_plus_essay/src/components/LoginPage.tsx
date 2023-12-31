import * as React from 'react';
import { useEffect, useState } from 'react';
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/core';
import {
    createNativeStackNavigator,
    NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { fetchLogin } from '../redux/auth/actions';
import { RootState, store } from '../redux/store';
import { ThunkDispatch } from 'redux-thunk';
import { AppDispatch } from '../redux/dispatch';
import { Marker } from 'react-native-svg';
import { useAppNavigation, AppParamList } from '../routes';
import { promisify } from '@beenotung/tslib';
interface UserInfo {
    email: string;
    password: string;
}
type Props = NativeStackScreenProps<AppParamList>;

export default function LoginPage({ }: Props) {
    const navigation = useAppNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const state = useSelector((state: RootState) => state);
    console.log('state!!!!STORE', state);
    // const auth = useSelector((state: RootState) => state.auth)
    // const user = useSelector((state: RootState) => state.auth.user)
    useEffect(() => {
        console.log('state from store: ', state);
        if (state.auth.user) {
            setIsVerified(true);
            navigation.navigate('Tabs');
        }
    }, [state]);
    // console.log('auth of state from store: ', auth)
    // console.log('user of auth from store: ', user)
    // const navigation = useNavigation()
    return (
        <View style={{ alignItems: 'center', marginTop: 50 }}>
            <Text
                style={{
                    fontWeight: 'bold',
                    fontSize: 35,
                    textAlign: 'center',
                    color: '#14532d',
                    marginBottom: 20,
                }}>
                Welcome
            </Text>
            <TextInput
                style={styles.input}
                textContentType="emailAddress"
                autoCapitalize="none"
                placeholder="Email address"
                onChangeText={email => setUsername(email)}
            />
            <TextInput
                style={styles.input}
                textContentType="password"
                secureTextEntry
                placeholder="Password"
                onChangeText={password => setPassword(password)}
            />

            <View style={{ alignSelf: 'flex-end' }}>
                <TouchableOpacity style={{ flexDirection: 'row', padding: 10 }}>
                    <Text style={{ color: '#14b8a6', fontWeight: 'bold', marginRight: 33 }}>
                        Forgot Password?
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{ alignItems: 'center', marginTop: 10 }}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={async () => {
                        const result = await dispatch(fetchLogin({ email: username, password: password }));
                        !result.success ? Alert.alert('Incorrect email or password!') : navigation.navigate('Tabs')
                    }}>
                    <Text
                        style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>
                        Sign in
                    </Text>
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', margin: 20 }}>
                    <Text>Don't have an account? </Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Sign up');
                        }}>
                        <Text style={{ color: '#14b8a6', fontWeight: 'bold' }}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
                {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}> */}
                    {/* <View
                        style={{
                            flexDirection: 'column',
                            flex: 4,
                            borderWidth: 1,
                            borderColor: 'grey',
                            height: 1,
                            margin: 30,
                        }} */}
                    {/* /> */}
                    {/* <Text style={{ flex: 1, textAlign: 'center', color: 'grey' }}>OR</Text>
                    <View
                        style={{
                            flexDirection: 'column',
                            flex: 4,
                            borderWidth: 1,
                            borderColor: 'grey',
                            height: 1,
                            margin: 30,
                        }}
                    /> */}
                {/* </View> */}

                {/* <TouchableOpacity
                    style={{
                        justifyContent: 'center',
                        backgroundColor: '#007AFF',
                        borderColor: 'black',
                        borderWidth: 1,
                        maxWidth: '80%',
                        width: 300,
                        height: 35,
                        borderRadius: 15,
                        margin: 10,
                    }}> */}
                    {/* <View style={{}}><Image source={ } /></View>
                    <Text style={{ textAlign: 'center', color: 'white' }}>
                        Sign in with Facebook
                    </Text>
                    <View style={{}}></View>
                </TouchableOpacity> */}

                {/* <TouchableOpacity
                    style={{
                        justifyContent: 'center',
                        borderColor: 'black',
                        borderWidth: 1,
                        maxWidth: '80%',
                        width: 300,
                        height: 35,
                        borderRadius: 15,
                        margin: 10,
                    }}>
                    <View style={{}}><Image source={ } /></View>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
                        Sign in with Google
                    </Text>
                    <View style={{}}></View>
                </TouchableOpacity> */}

                <View style={{ alignItems: 'center', marginTop: 20 }}>
                    <Text style={{ fontSize: 12 }}>
                        By using our services you are agreeing to our
                    </Text>
                    <TouchableOpacity>
                        <Text style={{ fontWeight: 'bold', fontSize: 12 }}>
                            {' '}
                            Terms and Privacy Statement
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        padding: 10,
        margin: 10,
        borderRadius: 10,
        maxWidth: '80%',
        width: 300,
        backgroundColor: '#F6F6F9',
        textAlign: 'left',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
    },
    button: {
        backgroundColor: '#14b8a6',
        padding: 10,
        margin: 10,
        borderRadius: 10,
        maxWidth: '80%',
        width: 300,
    },
});
