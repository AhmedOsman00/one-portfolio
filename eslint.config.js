// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const reactNativePlugin = require('eslint-plugin-react-native');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
  },
  {
    plugins: {
      'react-native': reactNativePlugin,
    },
    rules: {
      // Detect unused styles in StyleSheet.create
      'react-native/no-unused-styles': 'error',

      // Warn about inline styles (prefer StyleSheet.create)
      'react-native/no-inline-styles': 'warn',

      // Enforce consistent color format
      'react-native/no-color-literals': 'warn',

      // Detect invalid styles
      'react-native/no-single-element-style-arrays': 'warn',
    },
  },
]);