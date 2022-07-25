import { useSelector } from 'react-redux';
import { Alert } from 'react-native';
import { env } from '../env/env';
import { RootState } from '../redux/store';

export function usePost() {
  const token = useSelector((state: RootState) => state.auth.token);

  function post<T extends { error?: string }>(
    name: string,
    url: string,
    body: object,
    cb: (json: T) => void,
  ) {
    fetch(env.BACKEND_ORIGIN + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(body),
    })
      .then(res => res.json())
      .catch(error => ({ error: String(error) }))
      .then(json => {
        if (json.error) {
          Alert.alert('Fail to ' + name, json.error, [{ text: 'Dismiss' }]);
        } else {
          cb(json);
        }
      });
  }
  return post;
}
