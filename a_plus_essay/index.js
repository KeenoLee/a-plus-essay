import 'react-native-gesture-handler'

/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { enableFreeze } from 'react-native-screens';
import React from 'react'


enableFreeze(true);
AppRegistry.registerComponent(appName, () => App);
