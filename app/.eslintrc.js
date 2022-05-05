module.exports = {
  root: true,
  extends: '@react-native-community',
  settings: {
    'import/resolver': {
      'babel-module': {
        extensions: [
          '.ios.js',
          '.android.js',
          '.js',
          '.json',
          '.jsx',
          '.ts',
          '.tsx',
        ],
        alias: {
          screens: './src/screens',
          providers: './src/providers',
          navigation: './src/navigation',
          components: './src/components',
          hooks: './src/hooks',
          hoc: './src/hoc',
          assets: './src/assets',
          helpers: './src/helpers',
          layouts: './src/layouts',
          config: './src/config',
        },
      },
    },
  },
};
