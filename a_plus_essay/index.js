import 'react-native-gesture-handler'

/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { enableFreeze } from 'react-native-screens';
import { Provider } from 'react-redux';
import { store } from './store';
import React from 'react'

function RNRedux() {
    console.log('Store: ', store)
    
    return (
        <Provider store={store}>
        <App />
    </Provider>
    )
}


enableFreeze(true);
AppRegistry.registerComponent(appName, () => RNRedux);
