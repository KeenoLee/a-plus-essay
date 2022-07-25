
import { useSelector } from 'react-redux';
// import {Text} from 'react-native';
import { RootState } from '../redux/store';

export function useToken() {
    const token = useSelector((state: RootState) => state.auth.token);
    return token
}