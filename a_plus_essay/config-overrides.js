const path = require('path');
const webpack = require('webpack');
const { override, addWebpackPlugin, addBabelPresets, addBabelPlugins, addWebpackAlias, babelInclude } = require('customize-cra');

module.exports = override(
    ...addBabelPresets(
        '@babel/preset-react',
    ),
    ...addBabelPlugins(
        // '@babel/plugin-proposal-class-properties', // <~ needed for react-native-calendars
        '@babel/plugin-syntax-jsx',
    ),
    // addWebpackAlias({
    //     'react-native-ble': require.resolve('./empty/index.js'),
    // }),
    addWebpackPlugin(
        new webpack.DefinePlugin({
            __DEV__: true
        }),
    ),
    babelInclude([
        path.resolve(__dirname, 'src'),
        path.resolve(__dirname, 'node_modules/react-native-radio-buttons-group'),
        path.resolve(__dirname, 'node_modules/react-native-vector-icons'),
    ]),
);