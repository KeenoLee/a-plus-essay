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
    // Add not-supported-by-web files
    addWebpackAlias({
        // 'react-native-ble': require.resolve('./empty/index.js'),
        // 'react-native-image-picker': require.resolve('./node_modules/source-map-loader/dist/cjs.js'),
        // 'react-native-linear-gradient': require.resolve('./empty/index.js')
        'lottie-react-native': 'react-native-web-lottie'
    }),
    addWebpackPlugin(
        new webpack.DefinePlugin({
            __DEV__: true
        }),
    ),
    babelInclude([
        path.resolve(__dirname, 'src'),
        path.resolve(__dirname, 'node_modules/react-native-radio-buttons-group'),
        path.resolve(__dirname, 'node_modules/react-native-vector-icons'),
        path.resolve(__dirname, 'node_modules/date-fns'),
        path.resolve(__dirname, 'node_modules/react-native-image-picker'),
        path.resolve(__dirname, 'node_modules/react-native-reanimated'),
        // path.resolve(__dirname, 'node_modules/react-native-linear-gradient'),
    ]),
);