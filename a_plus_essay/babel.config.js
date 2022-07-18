module.exports = function (api) {
  // This always returns undefined: platform is unavailable outside babel-preset-expo internals?
  const platform = api.caller((caller) => caller?.platform)

  // Adding 'react-native-web' plugin without a platform check breaks native builds; but platform
  // check is not possible? So plugins applied here are either "all platforms" or "no platforms"?
  const plugins = platform === 'web' ? [['react-native-web', { commonjs: true }, 'react-native-reanimated/plugin']] : ['react-native-reanimated/plugin']

  api.cache(true)
  return {
    "presets": ['module:metro-react-native-babel-preset'],
    plugins,
  }
}